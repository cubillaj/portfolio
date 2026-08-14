import type { Metadata } from "next";
import { Suspense } from "react";
import ProjectShowcase from "../components/ProjectShowcase";
import { projects } from "../data/projects";
import styles from "../page.module.css";

export const metadata: Metadata = { title: "Projects | Joshua Cubilla", description: "Full-stack projects built by Joshua Cubilla." };

export default function ProjectsPage() {
  return <main className={styles.wrap}>
    <header className={styles.pageHeader}><span>Selected work</span><h1>Projects</h1><p>Products built around real operational needs. Open each case file to understand the purpose, engineering decisions, and finished interface.</p></header>
    <Suspense fallback={<p className={styles.loadingNote}>Loading project case file…</p>}>
      <ProjectShowcase projects={projects} />
    </Suspense>
  </main>;
}
