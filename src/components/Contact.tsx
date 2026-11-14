import SocialLinks, { ContactButton } from "./SocialLinks";
export default function Contact() {
  return <section id="contact" className="py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-20">
    <h2 className="section-heading"><span className="font-mono text-accent text-base">05.</span>What&apos;s Next?</h2>
    <div className="max-w-xl mx-auto text-center py-8">
      <h3 className="text-4xl sm:text-5xl font-bold text-bright mb-6">Say Hello.</h3>
      <p className="text-muted text-base leading-relaxed mb-10">Whether you&apos;re exploring a cloud or AI initiative, looking for a speaker, or just want to connect - I&apos;m always open to a conversation. My inbox is open.</p>
      <ContactButton className="outline-button mb-10">Say Hello</ContactButton>
      <SocialLinks />
    </div>
  </section>;
}
