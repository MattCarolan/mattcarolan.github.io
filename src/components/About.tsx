const skills = [
  "Microsoft Azure",
  "Digital Transformation",
  "Amazon Web Services",
  "Artificial Intelligence",
  "Google Cloud Platform",
  "Platform Engineering",
  "Cloud Architecture",
  "FinOps",
];

export default function About() {
  return (
    <section
      id="about"
      className="py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-20"
    >
      <h2 className="section-heading">
        <span className="font-mono text-accent text-base">01.</span>
        About Me
      </h2>

      <div className="grid md:grid-cols-[3fr_2fr] gap-12 lg:gap-16">
        {/* Bio */}
        <div className="space-y-5 text-muted leading-relaxed">
          <p>
            With over{" "}
            <span className="text-accent font-medium">13+ years </span>{" "}
            dedicated to cloud technology, I&apos;ve built a career at the
            intersection of enterprise technology and real-world business
            outcomes. I help organizations worldwide harness the transformative
            power of Cloud and AI to drive competitive advantage and measurable
            results.
          </p>
          <p>
            Recognized as a{" "}
            <span className="text-faint font-medium">Microsoft MVP</span>,{" "}
            <span className="text-faint font-medium">AWS Community Leader</span>{" "}
            and{" "}
            <span className="text-faint font-medium">Google Leader</span>, I
            bring deep multi-cloud expertise and a vendor-agnostic perspective
            to every engagement. I&apos;m passionate about making complex
            technology accessible - whether that&apos;s through advisory work,
            speaking, content creation, or community building.
          </p>
          <p>
            Beyond the technical work, I actively contribute to the global cloud
            community through events like{" "}
            <span className="text-faint">Cloud Summit</span> and{" "}
            <span className="text-faint">AWS Community Day</span>, and have been
            featured on CBC Radio discussing AI&apos;s impact on society. Based
            in Vancouver, Canada.
          </p>

          <div className="pt-2">
            <p className="text-faint mb-4 text-sm font-mono">
              Technologies &amp; Domains:
            </p>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2 font-mono text-sm">
              {skills.map((skill) => (
                <li key={skill} className="flex items-center gap-2 text-muted">
                  <span className="text-accent text-xs">▹</span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats card */}
        <div className="flex flex-col gap-4">
          <div className="book-card">
            <div className="book-eyebrow">Cloud, AI, Culture, History, Future <span aria-hidden="true">✦</span></div>
            <div className="book-layout">
              <a href="https://5000days.net/" target="_blank" rel="noopener noreferrer" className="book-object" aria-label="Explore 5,000 Days">
                <span className="book-spine" aria-hidden="true">5,000 DAYS <small>MATT CAROLAN</small></span>
                <img src="/assets/book-cover-800.webp" srcSet="/assets/book-cover-320.webp 320w, /assets/book-cover-480.webp 480w, /assets/book-cover-800.webp 800w" sizes="(max-width: 767px) 40vw, (max-width: 1023px) 18vw, 15vw" alt="5,000 Days: Cloud, AI, Culture, History & Future, by Matt Carolan - original front cover." width="800" height="1199" loading="lazy" decoding="async" style={{ aspectRatio: "800 / 1199" }} />
              </a>
              <div className="book-details">
                <p className="font-mono text-accent text-xs uppercase tracking-wider mb-2">New Book</p>
                <h3 className="text-bright text-3xl font-bold mb-1">5,000 Days</h3>
                <p className="font-mono text-xs text-faint mb-4">by Matt Carolan</p>
                <p className="text-muted text-sm leading-relaxed">Stories, mistakes, and insights from technological disruption. How to adapt to change.</p>
                <p className="book-bestseller">#1 Best Seller on Amazon</p>
                <a href="https://5000days.net/" target="_blank" rel="noopener noreferrer" className="outline-button book-button">Explore the Book</a>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface rounded-lg p-5 border border-surface2 hover:border-accent/30 transition-colors duration-300 text-center">
              <div className="text-2xl font-bold text-bright mb-1">3</div>
              <div className="text-muted text-xs font-mono leading-tight">
                Major Cloud
                <br />
                Platforms
              </div>
            </div>
            <div className="bg-surface rounded-lg p-5 border border-surface2 hover:border-accent/30 transition-colors duration-300 text-center">
              <div className="text-2xl font-bold text-bright mb-1">10K+</div>
              <div className="text-muted text-xs font-mono leading-tight">
                YouTube
                <br />
                Subscribers
              </div>
            </div>
          </div>
          <div className="bg-surface rounded-lg p-6 border border-surface2 hover:border-accent/30 transition-colors duration-300">
            <div className="text-faint text-xs font-mono mb-3 uppercase tracking-widest">
              Location
            </div>
            <div className="text-bright font-medium flex items-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-accent flex-shrink-0"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Vancouver, Canada
            </div>
            <div className="text-muted text-xs mt-2 font-mono">
              Cloud &amp; AI Technology Leader
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
