"use client";

import { useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import type { Project } from "../data/projects";
import styles from "../page.module.css";

const VISIBLE_TAGS = 3;

function optimizeCloudinaryUrl(src: string, width: number) {
  const marker = "/image/upload/";
  if (!src.includes("res.cloudinary.com") || !src.includes(marker)) return src;
  return src.replace(marker, `${marker}f_auto,q_auto,w_${width},c_limit/`);
}

export default function ProjectCard({ project, highlighted = false }: { project: Project; highlighted?: boolean }) {
  const [imageIndex, setImageIndex] = useState(0);
  const viewerRef = useRef<HTMLDialogElement>(null);
  const images = project.images ?? [];
  const image = images[imageIndex];
  const step = (direction: -1 | 1) => setImageIndex((index) => (index + direction + images.length) % images.length);

  const closeOnBackdrop = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) viewerRef.current?.close();
  };

  const stepWithArrowKeys = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (images.length < 2) return;
    if (event.key === "ArrowLeft") step(-1);
    if (event.key === "ArrowRight") step(1);
  };

  return (
    <article id={project.slug} className={`${styles.card} ${highlighted ? styles.cardHighlighted : ""}`}>
      <div className={styles.cardMedia}>
        {image ? (
          <button type="button" className={styles.mediaOpen} onClick={() => viewerRef.current?.showModal()} aria-label={`View ${image.alt} full size`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={optimizeCloudinaryUrl(image.src, 1200)} alt={image.alt} loading="lazy" decoding="async" />
          </button>
        ) : (
          <span className={styles.cardMediaEmpty}>{project.title}</span>
        )}
        {images.length > 1 && (
          <div className={styles.mediaControls}>
            <button type="button" onClick={() => step(-1)} aria-label="Previous screenshot">‹</button>
            <span>{imageIndex + 1} / {images.length}</span>
            <button type="button" onClick={() => step(1)} aria-label="Next screenshot">›</button>
          </div>
        )}
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardHeading}>
          <h3>{project.title}</h3>
          <span className={project.status === "progress" ? styles.badgeProgress : styles.badge}>{project.statusLabel}</span>
        </div>
        <p className={styles.cardSummary}>{project.summary}</p>
        <ul className={styles.tags} aria-label="Built with">
          {project.tags.slice(0, VISIBLE_TAGS).map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
        <div className={styles.cardLinks}>
          {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer">Live demo ↗</a>}
          {project.sourceUrl
            ? <a href={project.sourceUrl} target="_blank" rel="noreferrer">Source ↗</a>
            : project.sourceLabel && <span>{project.sourceLabel}</span>}
        </div>
        {project.demoNote && <p className={styles.cardNote}>{project.demoNote}</p>}
      </div>

      {image && (
        <dialog ref={viewerRef} className={styles.viewer} aria-label={`${project.title} screenshots`}
          onClick={closeOnBackdrop} onKeyDown={stepWithArrowKeys}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={optimizeCloudinaryUrl(image.src, 2400)} alt={image.alt} />
          <div className={styles.viewerBar}>
            <span>{project.title}{images.length > 1 && ` · ${imageIndex + 1} / ${images.length}`}</span>
            <div>
              {images.length > 1 && <>
                <button type="button" onClick={() => step(-1)} aria-label="Previous screenshot">‹</button>
                <button type="button" onClick={() => step(1)} aria-label="Next screenshot">›</button>
              </>}
              <button type="button" onClick={() => viewerRef.current?.close()} aria-label="Close">✕</button>
            </div>
          </div>
        </dialog>
      )}
    </article>
  );
}
