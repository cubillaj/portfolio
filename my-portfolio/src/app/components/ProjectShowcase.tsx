"use client";

import { useState } from "react";
import type { Project } from "../data/projects";
import styles from "../page.module.css";
import ProjectDossier from "./ProjectDossier";

function chunk<T>(items: T[], size: number): T[][] {
  const pages: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    pages.push(items.slice(i, i + size));
  }
  return pages;
}

export default function ProjectShowcase({ projects }: { projects: Project[] }) {
  const pages = chunk(projects, 3);
  const [page, setPage] = useState(0);
  const isFirst = page === 0;
  const isLast = page === pages.length - 1;

  return (
    <div>
      {pages[page].map((project) => (
        <ProjectDossier key={project.ref} project={project} />
      ))}
      {pages.length > 1 && (
        <nav className={styles.pager} aria-label="Project pages">
          <button type="button" className={styles.pagerBtn}
            onClick={() => setPage((current) => current - 1)} disabled={isFirst}
            aria-label="Previous projects">←</button>
          <span className={styles.pagerLabel}>Page {page + 1} of {pages.length}</span>
          <button type="button" className={styles.pagerBtn}
            onClick={() => setPage((current) => current + 1)} disabled={isLast}
            aria-label="Next projects">→</button>
        </nav>
      )}
    </div>
  );
}
