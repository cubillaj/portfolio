import { Suspense } from "react";
import ContactForm from "./components/ContactForm";
import ProjectGrid from "./components/ProjectGrid";
import { education } from "./data/education";
import { experience, skillGroups } from "./data/profile";
import { projects } from "./data/projects";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.wrap}>
      <header id="top" className={styles.hero}>
        <p className={styles.eyebrow}>Full-Stack Developer</p>
        <h1>Hi, I&apos;m Joshua Cubilla.</h1>
        <p className={styles.lead}>I build web apps for real businesses and organizations, from invoicing tools to real-time reporting systems.</p>
        <div className={styles.actions}>
          <a className={styles.button} href="#projects">View projects</a>
          <a className={styles.buttonGhost} href="#contact">Contact me</a>
        </div>
      </header>

      <section id="projects" className={styles.section} aria-labelledby="projects-heading">
        <h2 id="projects-heading" className={styles.sectionTitle}>Projects</h2>
        <Suspense fallback={<p className={styles.muted}>Loading projects…</p>}>
          <ProjectGrid projects={projects} />
        </Suspense>
      </section>

      <section id="experience" className={styles.section} aria-labelledby="experience-heading">
        <h2 id="experience-heading" className={styles.sectionTitle}>Experience</h2>
        <div className={styles.list}>{experience.map((item) => <article key={item.role} className={styles.row}>
          <p className={styles.rowLabel}>{item.context}</p>
          <div>
            <h3 className={styles.rowTitle}>{item.role}</h3>
            <p className={styles.muted}>{item.company}</p>
            <ul className={styles.bullets}>{item.points.map((point) => <li key={point}>{point}</li>)}</ul>
          </div>
        </article>)}</div>
      </section>

      <section id="skills" className={styles.section} aria-labelledby="skills-heading">
        <h2 id="skills-heading" className={styles.sectionTitle}>Skills</h2>
        <div className={styles.list}>{skillGroups.map((group) => <div key={group.label} className={styles.row}>
          <h3 className={styles.rowLabel}>{group.label}</h3>
          <ul className={styles.tags}>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>)}</div>
      </section>

      <section id="education" className={styles.section} aria-labelledby="education-heading">
        <h2 id="education-heading" className={styles.sectionTitle}>Education</h2>
        <div className={styles.list}>
          <article className={styles.row}>
            <p className={styles.rowLabel}>{education.year}</p>
            <div>
              <h3 className={styles.rowTitle}>{education.degree}</h3>
              <p className={styles.muted}>{education.institution} · {education.campus}</p>
              <ul className={styles.tags}>{education.subjects.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </article>
        </div>
      </section>

      <section id="contact" className={`${styles.section} ${styles.contactSection}`} aria-labelledby="contact-heading">
        <h2 id="contact-heading" className={styles.sectionTitle}>Contact</h2>
        <p className={styles.contactIntro}>Open to remote and hybrid full-stack roles. I usually reply within 1–2 days.</p>
        <ContactForm />
        <p className={styles.contactLinks}>
          Or find me on <a href="https://github.com/cubillaj" target="_blank" rel="noreferrer">GitHub ↗</a> and <a href="https://www.linkedin.com/in/joshua-cubilla-44829a364/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
        </p>
      </section>
    </main>
  );
}
