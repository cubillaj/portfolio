import type { Metadata } from "next";
import styles from "../page.module.css";

export const metadata: Metadata = { title: "Skills | Joshua Cubilla" };

const proficiency = [
  {
    level: "Primary",
    description: "The tools I use most often to design and deliver full-stack applications.",
    items: ["TypeScript", "JavaScript", "React", "Node.js", "Express.js", "PostgreSQL", "REST APIs"],
  },
  {
    level: "Experienced",
    description: "Technologies I have applied across production-focused and real-time projects.",
    items: ["Next.js", "MongoDB", "Redis", "Socket.IO", "JWT & Session Auth", "Prisma ORM", "Drizzle ORM", "Zod"],
  },
  {
    level: "Working knowledge",
    description: "Tools I can use effectively and continue to deepen through project work.",
    items: ["Python", "Django REST Framework", "Tailwind CSS", "AWS S3", "GitHub Actions", "BullMQ", "Docker"],
  },
];

export default function SkillsPage() {
  return <main className={styles.wrap}>
    <header className={styles.pageHeader}><span>Technical toolkit</span><h1>Skills</h1><p>A backend-leaning full-stack toolkit, organized by how regularly I use each technology rather than presented as one flat list.</p></header>
    <div className={styles.proficiencyList}>{proficiency.map((group, index) => <section key={group.level} className={styles.proficiencyGroup}>
      <div className={styles.proficiencyHeading}><span>0{index + 1}</span><div><h2>{group.level}</h2><p>{group.description}</p></div></div>
      <div className={styles.stackGrid}>{group.items.map((item) => <span key={item} className={styles.tag}>{item}</span>)}</div>
    </section>)}</div>
  </main>;
}
