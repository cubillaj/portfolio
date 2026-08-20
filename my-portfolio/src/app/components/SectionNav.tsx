"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "../page.module.css";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/skills", label: "Skills" },
  { href: "/education", label: "Education" },
  { href: "/contact", label: "Contact" },
];

export default function SectionNav() {
  const pathname = usePathname();
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
    <nav className={styles.siteNav} aria-label="Main navigation">
      <div className={styles.navInner}>
        <Link className={styles.navBrand} href="/" aria-label="Joshua Cubilla, home">
          <span>JC</span><strong>Joshua Cubilla</strong>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            onClick={() => setDarkMode((current) => !current)}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-[var(--line)] bg-[var(--paper-deep)] px-2.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--ink)] transition-colors hover:border-[var(--stamp-blue-soft)] hover:text-[var(--stamp-blue)]"
          >
            <span aria-hidden="true">{darkMode ? "☀" : "☾"}</span>
            <span>{darkMode ? "Light" : "Dark"}</span>
          </button>

          <button type="button" className={`${styles.menuButton} ${open ? styles.menuButtonOpen : ""}`}
            aria-expanded={open} aria-controls="portfolio-menu" onClick={() => setOpen((current) => !current)}>
            <span className={styles.menuButtonLabel}>{open ? "Close" : "Index"}</span>
            <span className={styles.menuIcon} aria-hidden="true"><i /><i /></span>
          </button>
        </div>

        <div id="portfolio-menu" className={`${styles.navLinks} ${open ? styles.navLinksOpen : ""}`}>
          {links.map(({ href, label }, index) => (
            <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}
              className={pathname === href ? styles.navLinkActive : ""} onClick={() => setOpen(false)}>
              <span aria-hidden="true">0{index + 1}</span>{label}
              {pathname === href && <em>Current</em>}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
