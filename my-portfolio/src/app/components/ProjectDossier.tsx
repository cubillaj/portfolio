import type { Project } from "../data/projects";
import styles from "../page.module.css";

export default function ProjectDossier({ project }: { project: Project }) {
  return (
    <article className={styles.dossier}>
      <div className={styles.refCol}>
        <div className={styles.ref}>{project.ref}</div>
        <div className={`${styles.stamp} ${
          project.status === "shipped" ? styles.stampShipped : styles.stampProgress
        }`}>
          {project.statusLabel}
        </div>
      </div>
      <div>
        <h3 className={styles.projTitle}>{project.title}</h3>
        <p className={styles.projSub}>{project.subtitle}</p>
        <ul className={styles.projPoints}>
          {project.points.map((point) => <li key={point}>{point}</li>)}
        </ul>
        <div className={styles.tags}>
          {project.tags.map((tag) => <span key={tag} className={styles.tag}>{tag}</span>)}
        </div>
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noreferrer" className={styles.liveLink}>
            View it live →
          </a>
        )}
      </div>
    </article>
  );
}
