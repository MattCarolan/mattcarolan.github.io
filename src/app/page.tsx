import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Recognition from "@/components/Recognition";
import Community from "@/components/Community";
import Contact from "@/components/Contact";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Nav />
      <main id="main-content">
        <Hero />
        <div className="content-sections">
          <About />
          <Experience />
          <Recognition />
          <Community />
          <Contact />
        </div>
      </main>
      <Footer />
      <ContactForm />
    </>
  );
}
