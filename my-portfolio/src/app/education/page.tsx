import type { Metadata } from "next";
import styles from "../page.module.css";
import { education } from "../data/education";

export const metadata: Metadata = { title: "Education | Joshua Cubilla" };

export default function EducationPage() {
  return (
    <main className={styles.wrap}>
      <header className={styles.pageHeader}>
        <span>Academic background</span>
        <h1>Education</h1>
        <p>
          The foundation behind my approach to software engineering, systems
          design, and secure application development.
        </p>
      </header>
      <article className={styles.educationCard}>
        <span>{education.year}</span>
        <h2>{education.degree}</h2>
        <h3>
          {education.institution} · {education.campus}
        </h3>
        <p>{education.summary}</p>
        <div className={styles.stackGrid}>
          {education.subjects.map((item) => (
            <span key={item} className={styles.tag}>
              {item}
            </span>
          ))}
        </div>
      </article>
    </main>
  );
}
