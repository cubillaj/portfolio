import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import SectionNav from "./components/SectionNav";
import PortfolioChat from "./components/PortfolioChat";
import styles from "./page.module.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  title: "Joshua Cubilla | Full-Stack Developer",
  description: "Portfolio of Joshua Cubilla, a full-stack developer building secure APIs, real-time applications, multi-tenant platforms, and business software.",
  icons: { icon: "/logo.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geist.variable} suppressHydrationWarning data-scroll-behavior="smooth">
      <body>
        <SectionNav />
        {children}
        <PortfolioChat />
        <footer className={styles.footer}>
          <div className={styles.footerInner}>
            <p>© 2026 Joshua Cubilla</p>
            <nav aria-label="Footer links">
              <a href="https://github.com/cubillaj" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://www.linkedin.com/in/joshua-cubilla-44829a364/" target="_blank" rel="noreferrer">LinkedIn</a>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
