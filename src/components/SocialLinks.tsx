"use client";
import type { ReactNode } from "react";
export const whatsappUrl = "https://chat.whatsapp.com/BcIYWA5WMCsJOpD93JSASi";
export function ContactButton({ children, className = "", label }: { children: ReactNode; className?: string; label?: string }) {
  return <button type="button" className={className} aria-label={label} aria-haspopup="dialog" onClick={() => document.dispatchEvent(new Event("open-contact-form"))}>{children}</button>;
}
export function WhatsAppIcon() {
  return <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M20.5 11.7a8.6 8.6 0 0 1-12.8 7.5L3 20.5l1.3-4.6a8.6 8.6 0 1 1 16.2-4.2Z"/><path d="M8.1 7.4c-.8.7-.7 2.5 1.2 4.7 2.2 2.5 4.5 3.2 5.5 2.5l1.1-1.3-2.4-1.3-.9.8c-1.3-.6-2.3-1.6-2.8-2.8l.7-.8-1.2-2.4Z"/></svg>;
}
export default function SocialLinks({ vertical = false }: { vertical?: boolean }) {
  const links = [
    { name: "LinkedIn", href: "https://www.linkedin.com/in/matthewcarolan/", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V8h4v2a5 5 0 0 1 2-2Z"/><path d="M2 9h4v12H2Z"/><circle cx="4" cy="4" r="2"/></svg> },
    { name: "WhatsApp", href: whatsappUrl, icon: <WhatsAppIcon /> },
    { name: "YouTube", href: "https://www.youtube.com/@PublicCloudNinja", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3Z" fill="currentColor" stroke="none"/></svg> },
  ];
  return <div className={vertical ? "social-links social-links-vertical" : "social-links"}>
    {links.map(link => <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.name}>{link.icon}</a>)}
    <ContactButton label="Email Matt" className="social-email"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m3 6 9 7 9-7"/></svg></ContactButton>
  </div>;
}
