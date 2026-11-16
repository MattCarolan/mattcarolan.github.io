import Image from "next/image";
import SocialLinks, { ContactButton } from "./SocialLinks";
export default function Hero() {
  return <section id="hero" className="hero-section">
    <div className="hero-artwork">
      <Image src="/assets/matt-hero.webp" alt="Matt Carolan standing with folded arms, headphones, a dark jacket and sneakers against Vancouver's waterfront at night." width={1600} height={900} preload sizes="100vw" className="hero-original" />
      <svg viewBox="0 0 1600 900" className="hero-motion" aria-hidden="true">
        <defs>
          <clipPath id="matt-right-foot"><path d="M1144 748 1206 754 1210 839 1042 841 1042 801 1080 778 1117 775Z" /></clipPath>
        </defs>
        <g clipPath="url(#matt-right-foot)"><image href="/assets/matt-hero.webp" width="1600" height="900" className="right-foot-tap" /></g>
      </svg>
    </div>
    <div className="hero-shade" aria-hidden="true" />
    <div className="hero-copy">
      <p className="font-mono text-accent text-sm md:text-base mb-5 tracking-widest">Hi, my name is</p>
      <h1>Matt Carolan.</h1>
      <h2>Cloud &amp; AI<br className="hero-title-break" /> Technology Leader.</h2>
      <p className="hero-description">Inspiring others and enabling businesses globally to gain a competitive advantage with Cloud and AI. Based in <span className="text-accent">Vancouver, Canada</span>.</p>
      <div className="hero-buttons"><a href="#experience" className="outline-button">View My Work</a><ContactButton className="outline-button secondary-button">Get In Touch</ContactButton></div>
    </div>
    <aside className="social-rail" aria-label="Social links"><SocialLinks vertical /></aside>
    <div className="email-rail"><ContactButton className="email-rail-button">matt@mattcarolan.net</ContactButton></div>
  </section>;
}
