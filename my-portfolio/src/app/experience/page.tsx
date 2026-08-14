import type { Metadata } from "next";
import { experience } from "../data/profile";
import styles from "../page.module.css";

export const metadata: Metadata = { title: "Experience | Joshua Cubilla" };

export default function ExperiencePage() {
  return <main className={styles.wrap}>
    <header className={styles.pageHeader}><span>How I work</span><h1>Experience</h1><p>Hands-on experience turning requirements into maintainable software and contributing throughout the development lifecycle.</p></header>
    <div className={styles.experienceList}>{experience.map((item) => <article key={item.role} className={styles.experienceItem}>
      <div className={styles.experienceHeading}><div><h3>{item.role}</h3><p>{item.company}</p></div><span>{item.context}</span></div>
      <ul className={styles.projPoints}>{item.points.map((point) => <li key={point}>{point}</li>)}</ul>
    </article>)}</div>
  </main>;
}
