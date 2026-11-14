"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
export default function ContactForm() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  useEffect(() => {
    const open = () => { if (!dialog.current?.open) dialog.current?.showModal(); };
    document.addEventListener("open-contact-form", open);
    return () => document.removeEventListener("open-contact-form", open);
  }, []);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    if (String(data.get("_honey") || "")) return;
    setStatus("sending");
    try {
      const response = await fetch("https://formsubmit.co/ajax/matt@mattcarolan.net", {
        method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (!response.ok || !(result.success === true || result.success === "true")) throw new Error("Send failed");
      setStatus("sent"); form.reset();
    } catch { setStatus("error"); }
  }
  return <dialog ref={dialog} className="contact-dialog" aria-labelledby="contact-dialog-title" onClick={event => {
    if (event.target === event.currentTarget) { const r = event.currentTarget.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.current?.close(); }
  }}>
    <button type="button" className="dialog-close" aria-label="Close contact form" onClick={() => dialog.current?.close()}>×</button>
    <p className="font-mono text-accent text-xs tracking-widest mb-3">LET&apos;S CONNECT</p>
    <h2 id="contact-dialog-title" className="text-bright text-3xl font-bold mb-3">Say Hello.</h2>
    <p className="text-muted text-sm mb-6">Send a message directly to Matt.</p>
    {status === "sent" ? <div role="status" className="send-success"><h3 className="text-accent text-xl mb-3">Thanks for getting in touch.</h3><p>Your message has been submitted. I look forward to connecting.</p><button type="button" className="outline-button mt-6" onClick={() => setStatus("idle")}>Send another message</button></div> :
    <form action="https://formsubmit.co/matt@mattcarolan.net" method="POST" onSubmit={submit}>
      <input type="hidden" name="_subject" value="MattCarolan.com | New message" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <div className="form-honey" aria-hidden="true"><label>Leave this field empty<input name="_honey" tabIndex={-1} autoComplete="off" /></label></div>
      <label htmlFor="contact-name">Your name</label>
      <input id="contact-name" name="name" autoComplete="name" maxLength={120} required />
      <label htmlFor="contact-email">Your email</label>
      <input id="contact-email" name="email" type="email" autoComplete="email" maxLength={254} required />
      <label htmlFor="contact-message">Your message</label>
      <textarea id="contact-message" name="message" rows={5} minLength={10} maxLength={5000} required />
      <p className="text-muted text-xs my-4">Your details are sent to Matt by email through FormSubmit.</p>
      <button type="submit" className="outline-button w-full" disabled={status === "sending"}>{status === "sending" ? "Sending..." : status === "error" ? "Try sending again" : "Send message"}</button>
      <p role="status" aria-live="polite" className="form-status">{status === "error" ? "Your message could not be sent. Please try again. Your message is still here." : status === "sending" ? "Sending your message..." : ""}</p>
    </form>}
  </dialog>;
}
