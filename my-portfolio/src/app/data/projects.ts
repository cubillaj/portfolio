export type ProjectStatus = "shipped" | "progress";

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface Project {
  slug: string;
  status: ProjectStatus;
  statusLabel: string;
  title: string;
  summary: string;
  highlights: string[];
  tags: string[];
  images?: ProjectImage[];
  liveUrl?: string;
  sourceUrl?: string;
  sourceLabel?: string;
  demoNote?: string;
}

const cloudinary = (path: string) => `https://res.cloudinary.com/dnzsrncen/image/upload/${path}`;

export const projects: Project[] = [
  {
    slug: "singil",
    status: "shipped",
    statusLabel: "SaaS",
    title: "Singil",
    summary: "Invoicing app for small businesses to manage clients, send recurring invoices, and collect payments online.",
    highlights: [
      "Automates recurring invoices and background jobs with Redis and BullMQ.",
      "Verifies PayMongo webhooks and reconciles successful payments securely.",
      "Includes PDF exports, audit logs, dashboards, rate limiting, and role-based access.",
    ],
    tags: ["React", "TypeScript", "Express.js", "PostgreSQL", "Redis", "Drizzle ORM", "BullMQ", "PayMongo", "Zod", "Docker"],
    images: [
      { src: cloudinary("v1786708191/Screenshot_2026-08-14_194918_ggmvgk.png"), alt: "Singil landing page" },
      { src: cloudinary("v1786708191/Screenshot_2026-08-14_194944_qtokhs.png"), alt: "Singil landing page features" },
      { src: cloudinary("v1786708137/Screenshot_2026-08-14_194538_pc8qjp.png"), alt: "Singil dashboard" },
      { src: cloudinary("v1786708137/Screenshot_2026-08-14_194616_uvmesy.png"), alt: "Singil products page" },
      { src: cloudinary("v1786708137/Screenshot_2026-08-14_194811_te8n60.png"), alt: "Singil invoices page" },
    ],
    liveUrl: "https://singil-sys.vercel.app/",
    sourceLabel: "Source available on request",
    demoNote: "Scheduled recurring invoices are paused in the live demo.",
  },
  {
    slug: "psu-recruitment",
    status: "shipped",
    statusLabel: "Capstone",
    title: "PSU Recruitment & Applicant Tracking System",
    summary: "Online hiring platform where applicants apply and HR staff across seven university campuses track every application.",
    highlights: [
      "Validates and stores applicant PDFs in AWS S3 with role-based access.",
      "Supports OTP verification, email updates, activity logs, and secure JWT authentication.",
      "Gives administrators analytics, filters, Excel exports, and automatic record archival.",
    ],
    tags: ["React", "Django REST Framework", "AWS S3", "Tailwind CSS", "JWT"],
    images: [
      { src: cloudinary("v1786708588/Screenshot_2026-08-14_195340_ukbwqz.png"), alt: "PSU landing page" },
      { src: cloudinary("v1789001159/Screenshot_2026-09-10_084542_uyqkwu.png"), alt: "PSU landing page" },
      { src: cloudinary("v1786708584/Screenshot_2026-08-14_195427_equdq1.png"), alt: "PSU landing page" },
      { src: cloudinary("v1786708584/Screenshot_2026-08-14_195435_npwafl.png"), alt: "PSU landing page" },
      { src: cloudinary("v1789001271/Screenshot_2026-09-10_084743_pja0nm.png"), alt: "PSU opportunities page" },
      { src: cloudinary("v1786708585/Screenshot_2026-08-14_195617_klnstp.png"), alt: "PSU login page" },
      { src: cloudinary("v1786708585/Screenshot_2026-08-14_195608_ai9en2.png"), alt: "PSU register page" },
    ],
    liveUrl: "https://psu-jl.vercel.app/",
    sourceLabel: "Private repository",
  },
  {
    slug: "hearthside-rooms",
    status: "shipped",
    statusLabel: "Real-time",
    title: "Hearthside Rooms",
    summary: "Private chat rooms for small teams, with live presence and saved message history.",
    highlights: [
      "Streams messages, presence, typing indicators, and read receipts with Socket.IO.",
      "Protects sessions with rotating refresh tokens and HTTP-only cookies.",
      "Includes role-based administration, paginated history, caching, and profile uploads.",
    ],
    tags: ["React", "TypeScript", "Socket.IO", "PostgreSQL", "Redis", "Node.js", "Express.js", "Zod"],
    images: [
      { src: cloudinary("v1786708861/Screenshot_2026-08-14_200029_bovhpy.png"), alt: "Hearthside login page" },
      { src: cloudinary("v1786708860/Screenshot_2026-08-14_200054_f0nfok.png"), alt: "Hearthside chat room" },
    ],
    liveUrl: "https://hearthsideroom.vercel.app/",
    sourceLabel: "Source available on request",
  },
  {
    slug: "bjmp-reporting",
    status: "shipped",
    statusLabel: "Internship",
    title: "BJMP Operations Reporting System - Region III",
    summary: "A centralized reporting platform for collecting and reviewing daily operational reports.",
    highlights: [
      "Handles multiple reporting schedules with transactional validation.",
      "Uses Redis-backed sessions and caching for secure, responsive workflows.",
      "Optimizes PostgreSQL analytics queries and includes CI and real-time infrastructure.",
    ],
    tags: ["React", "TypeScript", "Express.js", "PostgreSQL", "Prisma ORM", "Redis", "GitHub Actions", "Zod"],
    images: [
      { src: cloudinary("v1786707420/Screenshot_2026-08-14_115338_miwafd.png"), alt: "BJMP landing page" },
      { src: cloudinary("v1786707420/Screenshot_2026-08-14_115402_uheke9.png"), alt: "BJMP landing page" },
      { src: cloudinary("v1786707420/Screenshot_2026-08-14_115457_hbi3o1.png"), alt: "BJMP landing page" },
      { src: cloudinary("v1786707420/Screenshot_2026-08-14_115433_u6yhrs.png"), alt: "BJMP landing page" },
    ],
    sourceLabel: "Private organization repository",
  },
  {
    slug: "police-incident-reporting",
    status: "progress",
    statusLabel: "In progress",
    title: "Police Incident Reporting and Documentation",
    summary: "Records workspace for logging incidents, assigning investigators, and drafting case reports.",
    highlights: [
      "Socket.IO delivers assignment alerts and notifications, with frontend state refreshed after reconnection to catch missed updates.",
      "Prisma transactions coordinate investigator reassignment, audit entries, and notifications so related database changes succeed together.",
      "OpenRouter generates spot and progress report drafts from structured case data, with Zod output validation and a required spot report reference for progress reports.",
    ],
    tags: ["React", "TypeScript", "PostgreSQL", "Socket.IO", "OpenRouter", "Vite", "Tailwind CSS", "Zustand", "Node.js", "Express", "Prisma", "Zod"],
    images: [
      { src: cloudinary("v1789001816/Screenshot_2026-09-10_085634_yxwczz.png"), alt: "Landing page" },
      { src: cloudinary("v1789001914/Screenshot_2026-09-10_085645_moadko.png"), alt: "Login page" },
    ],
    sourceLabel: "Private organization repository",
  },
  {
    slug: "asap-lagundi",
    status: "shipped",
    statusLabel: "Community safety",
    title: "A.S.A.P. Lagundi",
    summary: "Community incident reporting with live updates for local responders and administrators.",
    highlights: [
      "Broadcasts new incidents and status changes to the right personnel in real time.",
      "Tracks assignments, responses, unread notifications, and emergency statistics.",
      "Supports evidence uploads, filtered reports, and rate-limited public submissions.",
    ],
    tags: ["React", "Node.js", "MongoDB", "Socket.IO", "Express.js", "Mongoose", "Cloudinary", "JWT"],
    images: [
      { src: cloudinary("v1786709065/Screenshot_2026-08-14_200331_seydar.png"), alt: "Lagundi landing page" },
      { src: cloudinary("v1786709065/Screenshot_2026-08-14_200411_f5vux9.png"), alt: "Lagundi report page" },
    ],
    sourceLabel: "Private team repository",
  },
  {
    slug: "barcen-census",
    status: "shipped",
    statusLabel: "Civic tech",
    title: "BARCEN Census Platform",
    summary: "Offline-first census and resident records system for barangay staff.",
    highlights: [
      "Restructures the backend into maintainable route, service, and repository layers.",
      "Enforces server-side roles, signed authentication, and secure password storage.",
      "Improves resident workflows with validation, search, pagination, and consistent errors.",
    ],
    tags: ["React", "Node.js", "MongoDB", "Express.js", "Material UI"],
    images: [
      { src: cloudinary("v1786708786/Screenshot_2026-08-14_195912_lxk2az.png"), alt: "BARCEN login page" },
    ],
    sourceLabel: "Private team repository",
  },
];
