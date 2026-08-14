import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.wrap}>
      <header className={styles.homeHero}>
        <div className={styles.eyebrow}>Full-Stack Software Engineer</div>
        <h1 className={styles.h1}>Joshua Cubilla</h1>
        <p className={styles.heroLead}>I build secure, practical web products—from real-time collaboration tools to multi-tenant business platforms.</p>
        <p className={styles.roleText}>My work combines thoughtful interfaces with dependable APIs, authentication, databases, and production-ready backend systems.</p>
        <div className={styles.homeActions}>
          <Link className={styles.cta} href="/projects">Explore my projects</Link>
          <Link className={styles.textLink} href="/contact">Get in touch →</Link>
        </div>
      </header>
      <section className={styles.homeGrid} aria-label="Portfolio overview">
        <Link href="/projects"><span>01</span><h2>Selected projects</h2><p>See the problems I solved, the systems I designed, and the tools behind each build.</p></Link>
        <Link href="/experience"><span>02</span><h2>Professional experience</h2><p>Learn how I contribute across planning, development, testing, and delivery.</p></Link>
        <Link href="/skills"><span>03</span><h2>Technical toolkit</h2><p>Explore the languages, frameworks, databases, and infrastructure I work with.</p></Link>
      </section>
    </main>
  );
}
