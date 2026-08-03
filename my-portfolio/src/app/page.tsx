import ProjectShowcase from "./components/ProjectShowcase";
import { projects } from "./data/projects";
import styles from "./page.module.css";

const stack = [
  "JavaScript", "TypeScript", "Python", "React", "Tailwind CSS",
  "Node.js", "Express.js", "Django REST Framework", "PostgreSQL",
  "MongoDB", "Redis", "Prisma ORM", "Drizzle ORM", "REST APIs",
  "Socket.IO", "JWT & Session Auth", "AWS S3", "GitHub Actions", "BullMQ",
];

const experience = [
  {
    role: "Software Developer Intern",
    company: "IT Solutions",
    context: "BJMP Operations Reporting System",
    points: [
      "Collaborated in a four-person team to deliver a centralized operations reporting platform for multiple administrative levels.",
      "Built reporting workflows, Redis-backed session authentication and caching, and optimized PostgreSQL and Prisma operations.",
      "Contributed to API design, Socket.IO infrastructure, GitHub Actions CI, debugging, testing, code reviews, and Agile delivery.",
    ],
  },
  {
    role: "Project-Based Software Developer",
    company: "Full-Stack Development",
    context: "Custom web applications",
    points: [
      "Developed responsive React interfaces and secure REST APIs with Node.js and Express.js.",
      "Designed PostgreSQL and MongoDB solutions with authentication, authorization, CRUD workflows, and third-party integrations.",
      "Worked collaboratively with Git and GitHub to deliver maintainable full-stack applications.",
    ],
  },
];

export default function Home() {
  return (
    <main className={styles.wrap}>
      <header>
        <div className={styles.eyebrow}>Full-Stack Software Engineer</div>
        <h1 className={styles.h1}>Joshua Cubilla</h1>
        <p className={styles.roleText}>
          I design and build scalable full-stack applications with React,
          TypeScript, Node.js, Express.js, Django REST Framework, PostgreSQL,
          and MongoDB. My work centers on secure APIs, real-time systems,
          multi-tenant architecture, authentication, and practical business platforms.
        </p>
        <div className={styles.currentRow}>
          <span className={styles.liveDot} />
          <span>
            Based in <strong>Purok 2 San Roque Guagua,Pampanga, Philippines</strong> — open
            to full-stack software engineering opportunities.
          </span>
        </div>
      </header>

      <hr className={styles.tear} />

      <section aria-labelledby="projects-heading">
        <h2 id="projects-heading" className={styles.sectionLabel}>
          Case Files — Selected Work
        </h2>
        <ProjectShowcase projects={projects} />
      </section>

      <section className={styles.sectionWrap} aria-labelledby="experience-heading">
        <h2 id="experience-heading" className={styles.sectionLabel}>Experience</h2>
        <div className={styles.experienceList}>
          {experience.map((item) => (
            <article key={item.role} className={styles.experienceItem}>
              <div className={styles.experienceHeading}>
                <div>
                  <h3>{item.role}</h3>
                  <p>{item.company}</p>
                </div>
                <span>{item.context}</span>
              </div>
              <ul className={styles.projPoints}>
                {item.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.sectionWrap} aria-labelledby="skills-heading">
        <h2 id="skills-heading" className={styles.sectionLabel}>Technical Toolkit</h2>
        <div className={styles.stackGrid}>
          {stack.map((item) => <span key={item} className={styles.tag}>{item}</span>)}
        </div>
      </section>

      <section className={styles.education} aria-labelledby="education-heading">
        <h2 id="education-heading" className={styles.sectionLabel}>Education</h2>
        <h3>Bachelor of Science in Information Technology</h3>
        <p>Pampanga State University — Bacolor Main Campus · 2026</p>
        <p>
          Coursework in software engineering, database management, systems
          analysis and design, web development, and information assurance.
        </p>
      </section>

      <footer className={styles.footer}>
        <p>Purok 2 San Roque Guagua, Pampanga, Philippines</p>
        <span>Full-stack engineering · Backend systems · Product development</span>
      </footer>
    </main>
  );
}
