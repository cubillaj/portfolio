"use client";

import { useState } from "react";
import type { Project } from "../data/projects";
import styles from "../page.module.css";

function optimizeCloudinaryUrl(src: string) {
  const marker = "/image/upload/";
  if (!src.includes("res.cloudinary.com") || !src.includes(marker) || src.includes("f_auto,q_auto,w_1400,c_limit")) return src;
  return src.replace(marker, `${marker}f_auto,q_auto,w_1400,c_limit/`);
}

export default function ProjectDossier({ project, featured = false }: { project: Project; featured?: boolean }) {
  const [imageIndex, setImageIndex] = useState(0);
  const images = project.images ?? [];
  const currentImage = images[imageIndex];

  return (
    <article className={`${styles.dossier} ${featured ? styles.dossierFeatured : ""}`}>
      {featured && <div className={styles.featuredRibbon}>Featured project</div>}
      <header className={styles.dossierHeader}>
        <div>
          <div className={styles.projectMeta}>
            <span className={styles.ref}>{project.ref}</span>
            <span className={`${styles.stamp} ${project.status === "shipped" ? styles.stampShipped : styles.stampProgress}`}>{project.statusLabel}</span>
          </div>
          <h2 className={styles.projTitle}>{project.title}</h2>
          <p className={styles.projSub}>{project.subtitle}</p>
        </div>
      </header>

      <section className={styles.dossierSection} aria-labelledby={`${project.ref}-overview`}>
        <p id={`${project.ref}-overview`} className={styles.dossierSectionLabel}>01 · Overview</p>
        <p className={styles.projectSummary}>{project.summary}</p>
        <div className={styles.contextGrid}><div><span>Built for</span><p>{project.audience}</p></div><div><span>Why it matters</span><p>{project.outcome}</p></div></div>
      </section>

      <section className={styles.dossierSection} aria-labelledby={`${project.ref}-stack`}>
        <p id={`${project.ref}-stack`} className={styles.dossierSectionLabel}>02 · Stack & engineering</p>
        <div className={styles.tags}>{project.tags.map((tag) => <span key={tag} className={styles.tag}>{tag}</span>)}</div>
        <ul className={styles.projPoints}>{project.highlights.map((point) => <li key={point}>{point}</li>)}</ul>
      </section>

      <section className={styles.dossierSection} aria-labelledby={`${project.ref}-preview`}>
        <p id={`${project.ref}-preview`} className={styles.dossierSectionLabel}>03 · Project preview</p>
        <div className={styles.gallery}>
          <div className={styles.previewPanel}>
            {currentImage ? <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={optimizeCloudinaryUrl(currentImage.src)} alt={currentImage.alt} loading="lazy" decoding="async" />
              {currentImage.caption && <p className={styles.imageCaption}>{currentImage.caption}</p>}
            </> : <div className={styles.previewPlaceholder}><span>Project preview</span><strong>{project.title}</strong><p>Add one or more Cloudinary image URLs in projects.ts.</p></div>}
          </div>
          {images.length > 1 && <div className={styles.galleryControls}>
            <button type="button" onClick={() => setImageIndex((index) => (index - 1 + images.length) % images.length)} aria-label="Previous screenshot">←</button>
            <span>{imageIndex + 1} / {images.length}</span>
            <div className={styles.galleryDots}>{images.map((image, index) => <button key={image.src} type="button" aria-label={`View screenshot ${index + 1}`} aria-current={index === imageIndex ? "true" : undefined} onClick={() => setImageIndex(index)} />)}</div>
            <button type="button" onClick={() => setImageIndex((index) => (index + 1) % images.length)} aria-label="Next screenshot">→</button>
          </div>}
        </div>
      </section>

      <footer className={styles.cardFooter}>
        <div className={styles.projectLinks}>
          {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className={styles.liveLink}>Live project ↗</a>}
          {project.sourceUrl ? <a href={project.sourceUrl} target="_blank" rel="noreferrer" className={styles.liveLink}>Source code ↗</a> : project.sourceLabel && <span>{project.sourceLabel}</span>}
        </div>
        {project.demoNote && <p className={styles.demoNote}>{project.demoNote}</p>}
      </footer>
    </article>
  );
}
