"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import type { Project } from "../data/projects";
import styles from "../page.module.css";
import ProjectCard from "./ProjectCard";

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const requested = useSearchParams().get("project");

  useEffect(() => {
    if (requested) document.getElementById(requested)?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [requested]);

  return (
    <div className={styles.grid}>
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} highlighted={project.slug === requested} />
      ))}
    </div>
  );
}
