"use client";

import { FormEvent, useEffect, useState } from "react";
import styles from "../page.module.css";

type FormStatus = "idle" | "sending" | "success" | "error";

export default function ContactForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  useEffect(() => {
    if (status !== "success") return;
    const timer = window.setTimeout(() => {
      setMessage("");
      setStatus("idle");
    }, 5000);
    return () => window.clearTimeout(timer);
  }, [status]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!accessKey) {
      setStatus("error");
      setMessage("The contact form is not configured yet. Please use the GitHub link below.");
      return;
    }

    setStatus("sending");
    setMessage("Sending your message...");
    const formData = new FormData(form);
    formData.append("access_key", accessKey);

    try {
      const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message ?? "Submission failed");
      form.reset();
      setStatus("success");
      setMessage("Thanks - your message has been sent. I'll get back to you soon.");
    } catch {
      setStatus("error");
      setMessage("Your message could not be sent. Please try again in a moment.");
    }
  }

  return (
    <form id={compact ? "footer-contact-form" : "contact-form"}
      className={compact ? styles.footerForm : styles.contactForm} onSubmit={handleSubmit}>
      <input type="hidden" name="subject" value="New portfolio inquiry" />
      <input type="hidden" name="from_name" value="Joshua Cubilla Portfolio" />
      <input className={styles.botcheck} type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" />

      {compact ? <>
        <label>Email<input type="email" name="email" placeholder="you@example.com" aria-label="Your email" autoComplete="email" required /></label>
        <label>Message<textarea name="message" rows={3} placeholder="Write a short message..." aria-label="Your message" required /></label>
      </> : <>
        <div className={styles.formRow}>
          <label>Name<input type="text" name="name" autoComplete="name" required /></label>
          <label>Email<input type="email" name="email" autoComplete="email" required /></label>
        </div>
        <label>Subject<input type="text" name="inquiry" placeholder="Role, project, or collaboration" required /></label>
        <label>Message<textarea name="message" rows={6} placeholder="Tell me a little about what you're working on..." required /></label>
      </>}

      <div className={styles.formSubmit}>
        <button className={styles.cta} type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : compact ? "Send" : "Send message"}
        </button>
        <p className={`${styles.formStatus} ${status === "success" ? styles.formSuccess : ""} ${status === "error" ? styles.formError : ""}`}
          role="status" aria-live="polite">{message}</p>
      </div>
    </form>
  );
}
