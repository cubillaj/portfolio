"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../page.module.css";

const links = [
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Skills" },
  { href: "/#education", label: "Education" },
  { href: "/#contact", label: "Contact" },
];

export default function SectionNav() {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);

    const savedTheme = window.localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = savedTheme ? savedTheme === "dark" : systemPrefersDark;

    document.documentElement.classList.toggle("dark", shouldUseDark);
    setDarkMode(shouldUseDark);

    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    window.localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <nav className={styles.nav} aria-label="Main navigation">
      <div className={styles.navInner}>
        <Link className={styles.navBrand} href="/#top">Joshua Cubilla</Link>

        <div id="portfolio-menu" className={`${styles.navLinks} ${open ? styles.navLinksOpen : ""}`}>
          {links.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>
          ))}
        </div>

        <div className={styles.navTools}>
          <button type="button" className={styles.iconButton} onClick={() => setDarkMode((current) => !current)}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}>
            <span aria-hidden="true">{darkMode ? "☀" : "☾"}</span>
          </button>
          <button type="button" className={`${styles.iconButton} ${styles.menuButton}`}
            aria-expanded={open} aria-controls="portfolio-menu" aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((current) => !current)}>
            <span aria-hidden="true">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
