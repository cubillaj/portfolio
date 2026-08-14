export type ProjectStatus = "shipped" | "progress";

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface Project {
  ref: string;
  slug: string;
  status: ProjectStatus;
  statusLabel: string;
  title: string;
  subtitle: string;
  summary: string;
  audience: string;
  outcome: string;
  highlights: string[];
  tags: string[];
  images?: ProjectImage[];
  liveUrl?: string;
  sourceUrl?: string;
  sourceLabel?: string;
  demoNote?: string;
}

export const projects: Project[] = [
  {
    ref: "REF-01", slug: "singil", status: "shipped", statusLabel: "SaaS", title: "Singil",
    subtitle: "Invoicing that keeps organizations, clients, and payments in sync.",
    summary: "A multi-tenant billing workspace where teams can manage clients, create invoices, collect payments, and monitor business performance without mixing data between organizations.",
    audience: "Small businesses and finance teams managing recurring client billing.",
    outcome: "Turns a manual billing process into one secure workflow, from invoice creation to payment reconciliation.",
    highlights: ["Automates recurring invoices and background jobs with Redis and BullMQ.", "Verifies PayMongo webhooks and reconciles successful payments securely.", "Includes PDF exports, audit logs, dashboards, rate limiting, and role-based access."],
    tags: ["React", "TypeScript", "Express.js", "PostgreSQL", "Drizzle ORM", "Redis", "BullMQ", "PayMongo"],
    images: [
      { src: "https://res.cloudinary.com/dnzsrncen/image/upload/v1786708191/Screenshot_2026-08-14_194918_ggmvgk.png", 
        alt: "Singil Landing Page", 
        // caption: "Landing page overview" 
      },
      { src: "https://res.cloudinary.com/dnzsrncen/image/upload/v1786708191/Screenshot_2026-08-14_194944_qtokhs.png", 
        alt: "Singil Landing Page", 
        // caption: "Landing page overview" 
      },
      { src: "https://res.cloudinary.com/dnzsrncen/image/upload/v1786708137/Screenshot_2026-08-14_194538_pc8qjp.png", 
        alt: "Singil dashboard", 
        // caption: "Landing page overview" 
      },
      { src: "https://res.cloudinary.com/dnzsrncen/image/upload/v1786708137/Screenshot_2026-08-14_194616_uvmesy.png", 
        alt: "Singil products page", 
        // caption: "Landing page overview" 
      },
      { src: "https://res.cloudinary.com/dnzsrncen/image/upload/v1786708137/Screenshot_2026-08-14_194811_te8n60.png", 
        alt: "Singil invoices page", 
        // caption: "Landing page overviSingil
      },
    ],
    liveUrl: "https://singil-sys.vercel.app/",
    sourceLabel: "Source available on request",
    demoNote: "Production note: BullMQ background jobs, including scheduled recurring invoice processing, are currently inactive in the live demo. They require a separate always-running worker or scheduled service that is not included in the current deployment.",
  },
  {
    ref: "REF-02", slug: "psu-recruitment", status: "shipped", statusLabel: "Capstone", title: "PSU Recruitment & Applicant Tracking System",
    subtitle: "One recruitment workflow for applicants and seven university campuses.",
    summary: "A centralized hiring platform that lets applicants submit requirements online while campus administrators review documents, track progress, and manage recruitment records from a single dashboard.",
    audience: "University applicants, HR administrators, and recruitment staff across seven campuses.",
    outcome: "Replaces scattered applications and manual follow-ups with a visible, trackable hiring process.",
    highlights: ["Validates and stores applicant PDFs in AWS S3 with role-based access.", "Supports OTP verification, email updates, activity logs, and secure JWT authentication.", "Gives administrators analytics, filters, Excel exports, and automatic record archival."],
    tags: ["React", "Django REST Framework", "AWS S3", "Tailwind CSS", "JWT"],
    images: [
      { src: "https://res.cloudinary.com/dnzsrncen/image/upload/v1786708588/Screenshot_2026-08-14_195340_ukbwqz.png", 
        alt: "PSU landing page", 
        // caption: "Landing page overview" 
      },
      { src: "https://res.cloudinary.com/dnzsrncen/image/upload/v1786708584/Screenshot_2026-08-14_195406_xoktya.png", 
        alt: "PSU landing page", 
        // caption: "Landing page overview" 
      },
      { src: "https://res.cloudinary.com/dnzsrncen/image/upload/v1786708584/Screenshot_2026-08-14_195427_equdq1.png", 
        alt: "PSU landing page", 
        // caption: "Landing page overview" 
      },
      { src: "https://res.cloudinary.com/dnzsrncen/image/upload/v1786708584/Screenshot_2026-08-14_195435_npwafl.png", 
        alt: "PSU landing page", 
        // caption: "Landing page overview" 
      },
      { src: "https://res.cloudinary.com/dnzsrncen/image/upload/v1786708585/Screenshot_2026-08-14_195555_fb0kwg.png", 
        alt: "PSU opporunities page", 
        // caption: "Landing page overviSingil
      },
      { src: "https://res.cloudinary.com/dnzsrncen/image/upload/v1786708585/Screenshot_2026-08-14_195617_klnstp.png", 
        alt: "PSU login page", 
        // caption: "Landing page overviSingil
      },
      { src: "https://res.cloudinary.com/dnzsrncen/image/upload/v1786708585/Screenshot_2026-08-14_195608_ai9en2.png", 
        alt: "PSU register page", 
        // caption: "Landing page overviSingil
      },
    ],
    liveUrl: "https://psu-jl.vercel.app/",
    sourceLabel: "Private repository",
    demoNote: "The application is browsable, but document uploads are temporarily unavailable while its AWS S3 storage is inactive.",
  },
  {
    ref: "REF-03", slug: "hearthside-rooms", status: "shipped", statusLabel: "Real-Time", title: "Hearthside Rooms",
    subtitle: "Private team rooms where conversations stay live and organized.",
    summary: "A real-time collaboration app for teams that need focused group conversations, live member presence, and reliable message history in a secure shared space.",
    audience: "Small teams and communities collaborating in private rooms.",
    outcome: "Makes remote conversations feel immediate while preserving the controls and history teams need.",
    highlights: ["Streams messages, presence, typing indicators, and read receipts with Socket.IO.", "Protects sessions with rotating refresh tokens and HTTP-only cookies.", "Includes role-based administration, paginated history, caching, and profile uploads."],
    tags: ["React", "TypeScript", "Node.js", "Express.js", "Socket.IO", "PostgreSQL", "Redis"],
    images: [
      { src: "https://res.cloudinary.com/dnzsrncen/image/upload/v1786708861/Screenshot_2026-08-14_200029_bovhpy.png", 
        alt: "Hearthside login page", 
        // caption: "Landing page overview" 
      },
      { src: "https://res.cloudinary.com/dnzsrncen/image/upload/v1786708860/Screenshot_2026-08-14_200054_f0nfok.png", 
        alt: "Hearthside", 
        // caption: "Landing page overview" 
      },
    ],
    liveUrl: "https://hearthsideroom.vercel.app/",
    sourceLabel: "Source available on request",
  },
  {
    ref: "REF-04", slug: "bjmp-reporting", status: "shipped", statusLabel: "Internship", title: "BJMP Operations Reporting System - Region III",
    subtitle: "Daily operational reports, consolidated for faster oversight.",
    summary: "A centralized reporting platform that helps administrative teams collect scheduled reports, validate submissions, and view operational data across multiple levels of the organization.",
    audience: "Operations personnel and administrators responsible for daily compliance reporting.",
    outcome: "Reduces fragmented reporting and gives decision-makers a more consistent view of operational activity.",
    highlights: ["Handles multiple reporting schedules with transactional validation.", "Uses Redis-backed sessions and caching for secure, responsive workflows.", "Optimizes PostgreSQL analytics queries and includes CI and real-time infrastructure."],
    tags: ["React", "TypeScript", "Express.js", "PostgreSQL", "Prisma ORM", "Redis", "GitHub Actions"],
    images: [
      { src: "https://res.cloudinary.com/dnzsrncen/image/upload/v1786707420/Screenshot_2026-08-14_115338_miwafd.png", 
        alt: "BJMP landing page", 
        // caption: "Landing page overview" 
      },
      { src: "https://res.cloudinary.com/dnzsrncen/image/upload/v1786707420/Screenshot_2026-08-14_115402_uheke9.png", 
        alt: "BJMP landing page", 
        // caption: "Landing page overview" 
      },
      { src: "https://res.cloudinary.com/dnzsrncen/image/upload/v1786707420/Screenshot_2026-08-14_115457_hbi3o1.png", 
        alt: "BJMP landing page", 
        // caption: "Landing page overview" 
      },
      { src: "https://res.cloudinary.com/dnzsrncen/image/upload/v1786707420/Screenshot_2026-08-14_115433_u6yhrs.png", 
        alt: "BJMP landing page", 
        // caption: "Landing page overview" 
      },
    ],
    sourceLabel: "Private organization repository",
  },
  {
    ref: "REF-05", slug: "asap-lagundi", status: "shipped", statusLabel: "Community Safety", title: "A.S.A.P. Lagundi",
    subtitle: "A faster path from community incident report to local response.",
    summary: "A public safety platform where residents can report incidents and administrators can assign responders, track progress, and receive live updates as situations change.",
    audience: "Residents, local administrators, and shift-based emergency responders.",
    outcome: "Creates a clear, real-time response trail instead of relying on disconnected calls and messages.",
    highlights: ["Broadcasts new incidents and status changes to the right personnel in real time.", "Tracks assignments, responses, unread notifications, and emergency statistics.", "Supports evidence uploads, filtered reports, and rate-limited public submissions."],
    tags: ["React", "Node.js", "Express.js", "MongoDB", "Mongoose", "Socket.IO", "Cloudinary", "JWT"],
    images: [
      { src: "https://res.cloudinary.com/dnzsrncen/image/upload/v1786709065/Screenshot_2026-08-14_200331_seydar.png", 
        alt: "Lagundi landing page", 
        // caption: "Landing page overview" 
      },
      { src: "https://res.cloudinary.com/dnzsrncen/image/upload/v1786709065/Screenshot_2026-08-14_200411_f5vux9.png", 
        alt: "Lagundi report page", 
        // caption: "Landing page overview" 
      },
    ],
    // liveUrl: "https://asaplagundi.com",
    sourceLabel: "Private team repository",
  },
  {
    ref: "REF-06", slug: "barcen-census", status: "shipped", statusLabel: "Civic Tech", title: "BARCEN Census Platform",
    subtitle: "Resident records that continue working when connectivity does not.",
    summary: "An offline-first census and resident management system designed for barangay staff who need dependable data collection, search, and administration in the field.",
    audience: "Barangay administrators and census personnel working with resident records.",
    outcome: "Makes local census work more reliable and maintainable, including in low-connectivity environments.",
    highlights: ["Restructures the backend into maintainable route, service, and repository layers.", "Enforces server-side roles, signed authentication, and secure password storage.", "Improves resident workflows with validation, search, pagination, and consistent errors."],
    tags: ["React", "Node.js", "Express.js", "MongoDB", "Material UI"],
    images: [
      { src: "https://res.cloudinary.com/dnzsrncen/image/upload/v1786708786/Screenshot_2026-08-14_195912_lxk2az.png", 
        alt: "Barcen login page", 
        // caption: "Landing page overview" 
      },
    ],
    // liveUrl: "https://barcen.online",
    sourceLabel: "Private team repository",
  },
];
