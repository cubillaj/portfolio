"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Project } from "../data/projects";
import styles from "../page.module.css";
import ProjectDossier from "./ProjectDossier";

export default function ProjectShowcase({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const requestedProject = searchParams.get("project");
  const matchedIndex = projects.findIndex((item) => item.slug === requestedProject);
  const current = matchedIndex >= 0 ? matchedIndex : 0;
  const project = projects[current];

  const selectProject = (index: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("project", projects[index].slug);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    window.requestAnimationFrame(() => document.getElementById("project-showcase")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const move = (direction: -1 | 1) => selectProject((current + direction + projects.length) % projects.length);

  if (!project) return null;

  return (
    <div id="project-showcase" className={styles.projectShowcase}>
      <nav className={styles.projectPager} aria-label="Choose a project">
        <button type="button" onClick={() => move(-1)} aria-label="Previous project">←</button>
        <div>
          <span>Project {String(current + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
          <strong>{project.title}</strong>
        </div>
        <button type="button" onClick={() => move(1)} aria-label="Next project">→</button>
      </nav>

      <ProjectDossier key={project.ref} project={project} featured={current === 0} />

      <div className={styles.projectIndex} aria-label="Project index">
        {projects.map((item, index) => (
          <button key={item.ref} type="button" aria-label={`Show ${item.title}`}
            aria-current={index === current ? "true" : undefined}
            onClick={() => selectProject(index)}>{String(index + 1).padStart(2, "0")}</button>
        ))}
      </div>
    </div>
  );
}
