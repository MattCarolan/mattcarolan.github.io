import sharp from 'sharp';
import { stat } from 'node:fs/promises';

// Keep source artwork intact. Run from the repository root with npm run optimize:images.
const outputs = [
  ['public/1.jpeg', 'public/assets/matt-hero.webp', { quality: 95, effort: 6 }],
  ...[320, 480, 800].map(width => ['public/assets/book-cover.jpg', `public/assets/book-cover-${width}.webp`, { quality: 95, effort: 6 }, width]),
  ['public/assets/brookfield.png', 'public/assets/brookfield.webp', { lossless: true, effort: 6 }],
  ['public/logos/bcbs.png', 'public/logos/bcbs.webp', { lossless: true, effort: 6 }],
];
for (const [source, target, options, width] of outputs) {
  let image = sharp(source);
  if (width) image = image.resize({ width, withoutEnlargement: true });
  await image.webp(options).toFile(target);
  const before = (await stat(source)).size;
  const after = (await stat(target)).size;
  console.log(`${target}: ${before} → ${after} bytes (${Math.round(100 * (1 - after / before))}% smaller)`);
}
