"use client";

import { useEffect, useRef } from "react";

// Hard bounds keep the entire waist and trousers outside the animation.
const PATCH = { x: 1080, y: 310, width: 310, height: 123 };
const OUTER_EDGES = [
  [[1160, 337], [1190, 337], [1150, 433], [1116, 433], [1116, 410]],
  [[1308, 335], [1336, 335], [1364, 433], [1320, 433]],
] as const;
const COLUMNS = 20;
const ROWS = 16;
const smooth = (a: number, b: number, x: number) => {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

function windAt(seconds: number) {
  const phase = seconds % 18.6;
  const main = smooth(2.4, 3.25, phase) * (1 - smooth(4.05, 5.55, phase));
  const follow = 0.48 * smooth(4.8, 5.1, phase) * (1 - smooth(5.5, 6.2, phase));
  return main + follow;
}

type Point = { x: number; y: number };
type Spring = { x: number; velocity: number };

export default function JacketWind() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const texture = document.createElement("canvas");
    texture.width = PATCH.width;
    texture.height = PATCH.height;
    const textureContext = texture.getContext("2d");
    if (!textureContext) return;
    const image = new window.Image();
    let disposed = false;
    let ready = false;
    let visible = true;
    let frame = 0;
    let previous = 0;
    let elapsed = 0;
    let lastPaint = 0;
    let painted = false;
    const panels: Spring[][] = [0, 1].map(() =>
      Array.from({ length: ROWS + 1 }, () => ({ x: 0, velocity: 0 }))
    );

    // Affine texture mapping keeps the original fabric, seams and highlights.
    function triangle(a: Point, b: Point, c: Point, da: Point, db: Point, dc: Point) {
      if (!context) return;
      const determinant = a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y);
      if (Math.abs(determinant) < 0.001) return;
      context.save();
      context.beginPath();
      // Tiny overlap prevents hairline seams between the texture triangles.
      const mx = (da.x + db.x + dc.x) / 3;
      const my = (da.y + db.y + dc.y) / 3;
      for (const [i, point] of [da, db, dc].entries()) {
        const dx = point.x - mx;
        const dy = point.y - my;
        const length = Math.hypot(dx, dy);
        const x = point.x + dx / length * 0.35;
        const y = point.y + dy / length * 0.35;
        if (i === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.closePath();
      context.clip();
      const coefficient = (u: number, v: number, w: number) => [
        (u * (b.y - c.y) + v * (c.y - a.y) + w * (a.y - b.y)) / determinant,
        (u * (c.x - b.x) + v * (a.x - c.x) + w * (b.x - a.x)) / determinant,
        (u * (b.x * c.y - c.x * b.y) + v * (c.x * a.y - a.x * c.y) + w * (a.x * b.y - b.x * a.y)) / determinant,
      ];
      const xx = coefficient(da.x, db.x, dc.x);
      const yy = coefficient(da.y, db.y, dc.y);
      context.transform(xx[0], yy[0], xx[1], yy[1], xx[2], yy[2]);
      context.drawImage(texture, 0, 0);
      context.restore();
    }

    function deform(point: Point, row: number): Point {
      const x = point.x + PATCH.x;
      const y = point.y + PATCH.y;
      const height = Math.max(0, Math.min(1, (y - 334) / 99));
      // A small horizontal flutter on the outer edges only. Both ends stay
      // pinned, and there is no vertical displacement towards the waistband.
      const bottom = 1 - smooth(414, 433, y);
      const left = 1 - smooth(12, 24, Math.abs(x - (1176 - 39 * height)));
      const right = 1 - smooth(10, 27, Math.abs(x - (1317 + 19 * height)));
      const dx = (panels[0][row].x * left + panels[1][row].x * right) * bottom;
      return { x: point.x + dx, y: point.y };
    }

    function paint() {
      if (!context) return;
      context.clearRect(0, 0, PATCH.width, PATCH.height);
      context.save();
      context.beginPath();
      // Clip in destination coordinates BEFORE any texture transform. Nothing
      // can be painted in the center of the body, or below the jacket edges.
      for (const edge of OUTER_EDGES) {
        edge.forEach(([x, y], index) => {
          if (index === 0) context.moveTo(x - PATCH.x, y - PATCH.y);
          else context.lineTo(x - PATCH.x, y - PATCH.y);
        });
        context.closePath();
      }
      context.clip();
      const vertices = Array.from({ length: ROWS + 1 }, (_, row) =>
        Array.from({ length: COLUMNS + 1 }, (_, column) => {
          const source = { x: column * PATCH.width / COLUMNS, y: row * PATCH.height / ROWS };
          return { source, target: deform(source, row) };
        })
      );
      for (let row = 0; row < ROWS; row++) {
        for (let column = 0; column < COLUMNS; column++) {
          const a = vertices[row][column];
          const b = vertices[row][column + 1];
          const c = vertices[row + 1][column];
          const d = vertices[row + 1][column + 1];
          triangle(a.source, b.source, c.source, a.target, b.target, c.target);
          triangle(b.source, d.source, c.source, b.target, d.target, c.target);
        }
      }
      context.restore();
      painted = true;
    }

    function tick(now: number) {
      frame = 0;
      if (disposed || !ready || !visible || document.hidden || preference.matches) {
        previous = 0;
        return;
      }
      const dt = previous ? Math.min((now - previous) / 1000, 0.033) : 0;
      previous = now;
      elapsed += dt;
      let moving = false;
      for (let panel = 0; panel < panels.length; panel++) {
        for (let row = 0; row <= ROWS; row++) {
          const y = PATCH.y + row * PATCH.height / ROWS;
          const height = Math.max(0, Math.min(1, (y - 334) / 99));
          const free = height ** 1.8;
          // One gentle gust and a smaller trailing flutter, confined to
          // the outer jacket strips by the fixed paint mask.
          const force = windAt(elapsed - height * 0.2 - panel * 0.11);
          const ripple = Math.sin(elapsed * 10.5 - height * 4.8 + panel * 0.8)
            + 0.35 * Math.sin(elapsed * 17 - height * 6);
          const target = (-(panel === 0 ? 12 : 6) + ripple * 1.1 * height) * force * free;
          const spring = panels[panel][row];
          const stiffness = panel === 0 ? 43 : 55;
          const damping = panel === 0 ? 7.5 : 9;
          spring.velocity += ((target - spring.x) * stiffness - spring.velocity * damping) * dt;
          spring.x += spring.velocity * dt;
          if (Math.abs(spring.x) > 0.035 || Math.abs(spring.velocity) > 0.05) moving = true;
        }
      }
      if (now - lastPaint > 1000 / 30) {
        if (moving) paint();
        else if (painted) {
          context?.clearRect(0, 0, PATCH.width, PATCH.height);
          painted = false;
        }
        lastPaint = now;
      }
      frame = requestAnimationFrame(tick);
    }

    function resume() {
      if (!frame && ready && visible && !document.hidden && !preference.matches && !disposed) {
        previous = 0;
        frame = requestAnimationFrame(tick);
      }
    }

    function motionPreference() {
      if (preference.matches) {
        cancelAnimationFrame(frame);
        frame = 0;
        context?.clearRect(0, 0, PATCH.width, PATCH.height);
        painted = false;
      } else resume();
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) {
        cancelAnimationFrame(frame);
        frame = 0;
        previous = 0;
      } else resume();
    });
    observer.observe(canvas);
    preference.addEventListener("change", motionPreference);
    document.addEventListener("visibilitychange", resume);
    image.onload = () => {
      if (disposed) return;
      textureContext.drawImage(image, PATCH.x, PATCH.y, PATCH.width, PATCH.height, 0, 0, PATCH.width, PATCH.height);
      ready = true;
      resume();
    };
    image.src = "/1.jpeg";

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      preference.removeEventListener("change", motionPreference);
      document.removeEventListener("visibilitychange", resume);
      image.onload = null;
    };
  }, []);

  return <canvas ref={canvasRef} width={PATCH.width} height={PATCH.height}
    className="jacket-wind-canvas" aria-hidden="true" />;
}
