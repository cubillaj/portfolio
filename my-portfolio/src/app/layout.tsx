import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import SectionNav from "./components/SectionNav";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Joshua Cubilla | Full-Stack Software Engineer",
  description: "Portfolio of Joshua Cubilla, a full-stack software engineer building secure APIs, real-time applications, multi-tenant platforms, and business software.",
  icons: { icon: "/logo.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <SectionNav />
        {children}
        <footer className={styles.globalFooter}>
          <div className={styles.footerInner}>
            <div className={styles.footerTop}>
              <div className={styles.footerIntro}>
                <p><span className={styles.footerDot} aria-hidden="true" />Open to remote and hybrid full-stack roles</p>
                <h2>Let&apos;s build something useful.</h2>
                <span>For opportunities or collaborations, use the contact page.</span>
              </div>
              <nav className={styles.footerLinks} aria-label="Footer links">
                <Link className={styles.footerContactLink} href="/contact">Contact me <span>→</span></Link>
                <a href="https://github.com/cubillaj" target="_blank" rel="noreferrer">GitHub ↗</a>
                <a href="https://www.linkedin.com/in/joshua-cubilla-44829a364/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
                <a href="#top">Back to top ↑</a>
              </nav>
            </div>
            <p className={styles.footerCredit}>© 2026 Joshua Cubilla · Built with Next.js and TypeScript</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
