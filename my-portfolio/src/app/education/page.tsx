import type { Metadata } from "next";
import styles from "../page.module.css";

export const metadata: Metadata = { title: "Education | Joshua Cubilla" };

export default function EducationPage() {
  return <main className={styles.wrap}>
    <header className={styles.pageHeader}><span>Academic background</span><h1>Education</h1><p>The foundation behind my approach to software engineering, systems design, and secure application development.</p></header>
    <article className={styles.educationCard}>
      <span>2026</span><h2>Bachelor of Science in Information Technology</h2><h3>Pampanga State University · Bacolor Main Campus</h3>
      <p>Studied software engineering, database management, systems analysis and design, web development, and information assurance.</p>
      <div className={styles.stackGrid}>{["Software Engineering", "Database Management", "Systems Analysis", "Web Development", "Information Assurance"].map((item) => <span key={item} className={styles.tag}>{item}</span>)}</div>
    </article>
  </main>;
}
