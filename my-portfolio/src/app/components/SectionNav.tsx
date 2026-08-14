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

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <nav className={styles.siteNav} aria-label="Main navigation">
      <div className={styles.navInner}>
        <Link className={styles.navBrand} href="/" aria-label="Joshua Cubilla, home">
          <span>JC</span><strong>Joshua Cubilla</strong>
        </Link>
        <button type="button" className={`${styles.menuButton} ${open ? styles.menuButtonOpen : ""}`}
          aria-expanded={open} aria-controls="portfolio-menu" onClick={() => setOpen((current) => !current)}>
          <span className={styles.menuButtonLabel}>{open ? "Close" : "Index"}</span>
          <span className={styles.menuIcon} aria-hidden="true"><i /><i /></span>
        </button>
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
