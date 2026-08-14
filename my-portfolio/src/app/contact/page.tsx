import type { Metadata } from "next";
import ContactForm from "../components/ContactForm";
import styles from "../page.module.css";

export const metadata: Metadata = { title: "Contact | Joshua Cubilla" };

export default function ContactPage() {
  return <main className={styles.wrap}>
    <header className={styles.pageHeader}><span>Start a conversation</span><h1>Let&apos;s build something useful.</h1><p>I&apos;m open to full-stack software engineering opportunities and project collaborations. Tell me about the role, product, or problem you are working on.</p></header>
    <ContactForm />
    <section className={styles.contactPage} aria-label="Other contact details">
      <div><span>Response</span><strong>Usually within 1–2 days</strong><p>Your message will be delivered securely.</p></div>
      <div><span>GitHub</span><a href="https://github.com/cubillaj" target="_blank" rel="noreferrer">github.com/cubillaj ↗</a><p>Browse my code and development activity.</p></div>
      <div><span>Availability</span><strong>Remote and hybrid roles</strong><p>Open to full-stack software engineering opportunities and project collaborations.</p></div>
    </section>
  </main>;
}
