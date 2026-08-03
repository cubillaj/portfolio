import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Joshua Cubilla | Full-Stack Software Engineer",
  description:
    "Portfolio of Joshua Cubilla, a full-stack software engineer building secure APIs, real-time applications, multi-tenant platforms, and business software.",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
