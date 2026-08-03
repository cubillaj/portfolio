export type ProjectStatus = "shipped" | "progress";

export interface Project {
  ref: string;
  status: ProjectStatus;
  statusLabel: string;
  title: string;
  subtitle: string;
  points: string[];
  tags: string[];
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    ref: "REF-01", status: "shipped", statusLabel: "SaaS", title: "Singil",
    subtitle: "Multi-tenant invoicing and billing platform",
    points: [
      "Designed organization-scoped authorization and role-based access control for a multi-tenant SaaS architecture.",
      "Automated recurring invoices with Redis and BullMQ, and integrated PayMongo payments with secure webhook verification and reconciliation.",
      "Built invoice generation, PDF exports, audit logging, financial dashboards, client management, rate limiting, and protected routes.",
    ],
    tags: ["React", "TypeScript", "Express.js", "PostgreSQL", "Drizzle ORM", "Redis", "BullMQ", "PayMongo"],
    liveUrl: "https://singil-sys.vercel.app/",
  },
  {
    ref: "REF-02", status: "shipped", statusLabel: "Capstone",
    title: "PSU Recruitment & Applicant Tracking System",
    subtitle: "Multi-campus recruitment and document management platform",
    points: [
      "Developed applicant and administrator portals supporting recruitment workflows across seven campuses.",
      "Built AWS S3 document management with PDF validation, activity logging, JWT authentication, OTP verification, email notifications, and role-based access.",
      "Delivered analytics dashboards, applicant filtering, Excel export, and automatic record archival with an Agile team.",
    ],
    tags: ["React", "Django REST Framework", "AWS S3", "Tailwind CSS", "JWT"],
  },
  {
    ref: "REF-03", status: "shipped", statusLabel: "Real-Time", title: "Hearthside Rooms",
    subtitle: "Secure real-time team collaboration platform",
    points: [
      "Implemented group messaging, presence, typing indicators, read receipts, and paginated message history with Socket.IO.",
      "Secured authentication with JWT, rotating refresh tokens, and HTTP-only cookies, with Redis caching and request validation.",
      "Built role-based administration, PostgreSQL models with Drizzle ORM, and Cloudinary-backed profile management.",
    ],
    tags: ["React", "TypeScript", "Node.js", "Express.js", "Socket.IO", "PostgreSQL", "Redis"],
    liveUrl: "https://hearthsideroom.vercel.app/",
  },
  {
    ref: "REF-04", status: "shipped", statusLabel: "Internship", title: "BJMP Operations Reporting System",
    subtitle: "Centralized operational reporting and analytics platform",
    points: [
      "Developed backend workflows for multiple daily reporting schedules, transactional validation, and reporting compliance.",
      "Engineered Redis-backed authentication, session management, and caching while optimizing PostgreSQL and Prisma queries for analytics.",
      "Implemented GitHub Actions CI and backend Socket.IO infrastructure as part of a four-person development team.",
    ],
    tags: ["React", "TypeScript", "Express.js", "PostgreSQL", "Prisma ORM", "Redis", "GitHub Actions"],
  },
];
