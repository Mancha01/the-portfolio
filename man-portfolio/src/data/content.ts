/**
 * Single source of truth for the portfolio.
 * Update this file to change any copy, project, role or link on the site.
 */

export const profile = {
  name: "Emmanuel Mancha Pam",
  shortName: "Mancha Pam",
  role: "Senior Frontend Engineer",
  location: "Abuja, Nigeria · Open to remote",
  email: "pamemmanuel0@gmail.com",
  resume: "/Emmanuel-Mancha-Pam-Resume.pdf",
  headline: "I build the interfaces enterprises run on.",
  subhead:
    "Senior frontend engineer with 5+ years of professional experience shipping ERPs, CRMs, realtime dashboards and AI-assisted products in React, Next.js and TypeScript, from first commit to production.",
  availability: "Open to senior & lead frontend roles",
  about: [
    "I'm a frontend engineer who likes the hard, unglamorous parts of software: double-entry accounting screens that have to balance, approval workflows that span seven microservices, maps that turn a land survey into something a sales team can click on.",
    "At Wragby I've led frontend work on enterprise products for pharmaceutical, energy, retail, financial services and Nigerian federal government clients. That includes a CRM suite I started from an empty repo and am still the top contributor to. Outside Wragby, I took a real-estate operations platform from requirements to a live product as its sole frontend engineer.",
    "I care about clear architecture, typed contracts and honest data, and about interfaces that hold up for real people doing real work: a finance team closing the month, a store running a stock count, a regulator reviewing a compliance case. I hold a B.Sc. in Computer Science from the University of Jos and am Microsoft Azure and Google Cloud certified.",
  ],
};

export const socials = [
  { label: "GitHub", href: "https://github.com/Mancha01", icon: "github" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/emmanuel-pam-081b89ab/",
    icon: "linkedin",
  },
  { label: "X / Twitter", href: "https://twitter.com/EmmanuelPam9", icon: "twitter" },
  { label: "YouTube", href: "https://www.youtube.com/@mantech560", icon: "youtube" },
  { label: "Email", href: "mailto:pamemmanuel0@gmail.com", icon: "email" },
] as const;

export const stats = [
  { value: "5+", label: "years of professional experience" },
  { value: "8", label: "enterprise platforms delivered" },
  { value: "1,000+", label: "routes across the platforms I work on" },
  { value: "1,300+", label: "commits authored since 2022" },
];

export type Role = {
  company: string;
  title: string;
  type: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
};

export const experience: Role[] = [
  {
    company: "Wragby Business Solutions",
    title: "Senior Frontend Engineer",
    type: "Full-time",
    period: "Sep 2022 – Present",
    location: "Lagos, Nigeria",
    summary:
      "Frontend lead across a portfolio of enterprise products (ERP, CRM, realtime operations and regulatory platforms) for clients in pharma, energy, retail, banking and the Nigerian federal government.",
    highlights: [
      "Started the Wragby CRM frontend from an empty repo and remain its top contributor across 7 modules and 89 routes.",
      "Top contributor to a 533-route pharmaceutical ERP over 2+ years.",
      "Built procurement from scratch on an ERP spanning 7 Azure microservices, with multi-level approval workflows.",
      "Delivered realtime SignalR telemetry, contract-first OpenAPI clients and Playwright/Vitest test suites.",
    ],
  },
  {
    company: "Kay Steph Group · AcreFlow",
    title: "Lead Frontend Engineer",
    type: "Contract",
    period: "Nov 2025 – Present",
    location: "Remote",
    summary:
      "Owned requirements, delivery and the entire frontend of a real-estate operations platform now running a developer's day-to-day sales, later productised as AcreFlow.",
    highlights: [
      "Sole frontend engineer: 62 of 64 commits and ~26k lines of TypeScript.",
      "Interactive SVG estate maps, 11-role RBAC, installment payments with PDF receipts.",
      "Wrote the user guide pipeline and product pitch used to sell the platform.",
    ],
  },
  {
    company: "Freelance & Independent Projects",
    title: "Frontend Engineer",
    type: "Part-time",
    period: "2019 – 2022",
    location: "Abuja, Nigeria",
    summary:
      "Part-time client gigs and self-directed builds: responsive web and mobile apps with React, Next.js, Redux and React Native.",
    highlights: [
      "Delivered client sites and built my own apps, including dashboards, e-commerce stores and a music app.",
      "Built a React Native QR scanner with a reusable component library.",
    ],
  },
  {
    company: "Compunet",
    title: "Frontend Engineer",
    type: "Full-time",
    period: "Feb 2017 – Feb 2018",
    location: "Jos, Nigeria",
    summary:
      "Revamped the UI of a social media platform and translated design mock-ups into responsive, reusable interfaces in agile sprints.",
    highlights: [],
  },
];

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  tagline: string;
  year: string;
  role: string;
  featured: boolean;
  accent: string;
  stack: string[];
  metrics: { value: string; label: string }[];
  problem: string;
  built: string[];
  architecture: string[];
  outcome: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "acreflow",
    title: "AcreFlow",
    client: "Kay Steph Group · Real-estate developer",
    tagline:
      "An all-in-one operations platform for land and real-estate sales: clients, inventory, installment payments and interactive estate maps.",
    year: "2025 – 2026",
    role: "Lead Frontend Engineer & delivery owner",
    featured: true,
    accent: "from-amber-400 to-orange-500",
    stack: ["Next.js 15", "React 19", "TypeScript", "RTK Query", "Tailwind v4", "Recharts", "jsPDF", ".NET / Azure API"],
    metrics: [
      { value: "62/64", label: "commits authored" },
      { value: "11", label: "RBAC roles" },
      { value: "~69", label: "API endpoints integrated" },
    ],
    problem:
      "A growing land developer was running sales, installment plans and plot allocation across spreadsheets and paper survey drawings. They needed one source of truth their sales, finance and admin teams could all trust.",
    built: [
      "Gathered and wrote the requirements with the client, then designed and built the entire frontend.",
      "Interactive estate layout map: admins upload an SVG survey drawing, plot labels are normalised and hydrated into clickable, colour-coded plots with zoom, pan, search-to-plot and click-through to the property record.",
      "Payments UI for full and installment plans, covering initial deposits, overdue detection, refunds, receipt uploads and branded PDF receipts.",
      "Client CRM, property inventory, dashboards (revenue actual vs expected, client status), bulk email campaigns, audit log, notifications and user management.",
      "Route-level RBAC with 11 roles enforced in both middleware and layout, redirecting users to their first permitted area.",
      "Automated, screenshot-driven user guide and a product pitch deck used to sell the platform to other developers.",
    ],
    architecture: [
      "Next.js App Router with RTK Query: 11 API slices over a .NET API on Azure App Service, with Azure Blob Storage for documents.",
      "Semi-atomic component system with documented modal, table and colour-token conventions.",
      "Dark mode, responsive layouts and Vercel CI deploys.",
    ],
    outcome:
      "Live and running the developer's day-to-day sales operations, and productised as AcreFlow for other real-estate businesses.",
  },
  {
    slug: "wragby-crm",
    title: "Wragby CRM",
    client: "Wragby · Enterprise business suite",
    tagline:
      "A multi-module CRM covering service desk, business development, marketing, activity tracking and an AI assistant, plus a customer self-service portal.",
    year: "2025 – 2026",
    role: "Founding frontend engineer · top contributor",
    featured: true,
    accent: "from-violet-400 to-fuchsia-500",
    stack: ["Next.js 15", "React 19", "TypeScript", "Redux Toolkit", "RTK Query", "Tailwind", "react-hook-form + Zod", "Playwright"],
    metrics: [
      { value: "89", label: "routes" },
      { value: "7", label: "product modules" },
      { value: "~60%", label: "of all commits" },
    ],
    problem:
      "Wragby needed its own CRM product to sell to enterprise clients: one suite for support, sales pipelines, marketing and customer engagement, with a portal customers could use directly.",
    built: [
      "Started the app from an empty repo: authentication, middleware guards, protected layouts, module picker with per-environment feature flags.",
      "Service Desk: ticketing, agent assignment, resolution flows and dashboards for volume, trend and resolution time.",
      "Knowledge base with markdown articles, attachments, feedback, PDF export and AI-generated content.",
      "Customer self-service portal with ticket creation, file upload, OTP password recovery and deep links, which reduced support overhead.",
      "Business Development: pipelines, deal filtering, bulk upload and owner reassignment, budgets with period breakdowns, profitability and six report types.",
      "Activity module with Microsoft 365 email integration, calls, meetings, notes and tasks; Marketing with audiences, campaigns, email composer and reports.",
      "App-wide dark mode, Playwright end-to-end suites and a UAT playbook.",
    ],
    architecture: [
      "Next.js App Router over several Azure backends with runtime, per-host API resolution.",
      "Semantic design-token system with written UI standards and page patterns.",
      "Azure DevOps pipelines to staging and production.",
    ],
    outcome:
      "In production for Wragby and its clients. I'm still the top contributor across every module.",
  },
  {
    slug: "energy-erp",
    title: "Enterprise ERP for Energy",
    client: "Oil & gas company",
    tagline:
      "A full ERP (accounting, procurement, inventory, projects and HR) on a single Next.js frontend over seven microservices.",
    year: "2025 – 2026",
    role: "Senior Frontend Engineer · accounting, procurement & fixed assets",
    featured: true,
    accent: "from-sky-400 to-cyan-500",
    stack: ["Next.js 15", "React 19", "TypeScript", "RTK Query", "TanStack Table", "Radix / shadcn", "Tailwind v4", "@react-pdf"],
    metrics: [
      { value: "387", label: "pages in the app" },
      { value: "7", label: "Azure microservices" },
      { value: "3", label: "modules I owned" },
    ],
    problem:
      "An energy company needed finance, procurement and operations in one system, with strict approval chains and accounting rules enforced at every step.",
    built: [
      "Accounting: hierarchical chart of accounts, dimensions with posting-rule validation, journal entries, and General Ledger and Trial Balance reports with drill-down from TB to GL.",
      "Procurement, built from the ground up: material requisitions, RFQs and purchase orders with nested line tables, threaded comments, reminders and exports.",
      "Integration with a central multi-level approval service: approver roles, workflow modals, audit trails and approval dashboards.",
      "Fixed assets: categories, register, revaluation, disposal and reports.",
      "Memoised table rendering and optimised exports for large ledgers.",
    ],
    architecture: [
      "One frontend over seven services (auth, accounting, approvals, HR, inventory, procurement, projects).",
      "Permission checks per section; Excel and PDF exports throughout.",
    ],
    outcome:
      "Core finance and procurement flows in use by the client's finance and supply-chain teams.",
  },
  {
    slug: "pharma-erp",
    title: "Pharmaceutical ERP",
    client: "Pharmaceutical manufacturer & distributor",
    tagline:
      "Role-based workspaces for directors, sales, finance, HR and audit across a 533-route React ERP.",
    year: "2023 – 2025",
    role: "Frontend Engineer · top contributor",
    featured: true,
    accent: "from-emerald-400 to-teal-500",
    stack: ["React", "Redux", "Ant Design", "Formik / Yup", "Chart.js", "jsPDF", "xlsx"],
    metrics: [
      { value: "533", label: "routes" },
      { value: "700+", label: "of my commits" },
      { value: "#1", label: "contributor" },
    ],
    problem:
      "A pharmaceutical business needed every department, from the Managing Director to field sales, working in one system with the right approvals and reports.",
    built: [
      "Approval workspaces for the Managing Director and directorates (sales orders, expenses, inventory).",
      "Chart of accounts, customer ageing reports and print-ready customer statements.",
      "Sales workflows: orders, batching, territories, regions and targets, invoicing with part payments.",
      "Expense reimbursement and retirement, purchase approvals, HR configuration and bulk uploads.",
      "Platform-wide sorting, breadcrumbs, debounced search with pagination, skeleton loaders and a reusable data-fetching hook.",
    ],
    architecture: [
      "Large React SPA with role-specific route trees and Redux state.",
      "Build fixes for Node 18 / OpenSSL and memory to keep CI green as the codebase grew.",
    ],
    outcome:
      "Improved reporting accuracy and gave leadership consolidated, approval-driven visibility across the business.",
  },
  {
    slug: "gas-regulatory-platform",
    title: "Regulatory Intelligence Platform",
    client: "Nigerian federal government regulator",
    tagline:
      "Market intelligence, compliance and an AI assistant for Nigeria's domestic gas transportation market, built for a federal government regulator.",
    year: "2026",
    role: "Frontend Engineer · top contributor",
    featured: true,
    accent: "from-rose-400 to-red-500",
    stack: ["React 19", "Vite", "TypeScript", "TanStack Query", "Zustand", "Zod", "Orval / OpenAPI", "MSW", "MSAL", "Vitest", "Playwright"],
    metrics: [
      { value: "38", label: "feature pages" },
      { value: "~450", label: "lines of client aggregation removed" },
      { value: "#1", label: "contributor" },
    ],
    problem:
      "A regulator needed a trustworthy view of nominations, imbalances, compliance cases and transport revenue, where wrong numbers have legal consequences.",
    built: [
      "Command-centre dashboard, market insights, transport revenue and transportation visualisations.",
      "Replaced ~450 lines of client-side aggregation with server-computed figures for consistent, auditable numbers.",
      "Compliance analysis, case letters, publications, knowledge base, audit log, notifications and transporter queries.",
      "AI assistant with citations and attachments, rendered honestly when answers are uncertain.",
      "Reusable hooks for branded loading states and stable handlers that fixed focus loss in modals.",
    ],
    architecture: [
      "Contract-first: typed clients generated from OpenAPI with Orval, mocked with MSW.",
      "Capability-based permissions and Microsoft Entra ID sign-in via MSAL.",
      "Vitest + Testing Library and Playwright, with accessibility linting and pre-commit gates.",
    ],
    outcome:
      "Delivered the bulk of the product backlog on a modern, test-backed stack ready for regulator rollout.",
  },
  {
    slug: "retail-stock-portal",
    title: "Realtime Stock-Count Portal",
    client: "One of Nigeria's leading supermarket groups",
    tagline:
      "Live stock-count sessions, price checks and variance tracking across the stores of a leading Nigerian supermarket group.",
    year: "2026",
    role: "Lead Frontend Engineer (near-sole developer)",
    featured: true,
    accent: "from-lime-400 to-green-500",
    stack: ["Next.js 15", "React 19", "Redux Toolkit", "SignalR", "Tailwind v4", "Recharts", "ExcelJS", "jsPDF"],
    metrics: [
      { value: "86%", label: "of commits" },
      { value: "Live", label: "SignalR session telemetry" },
      { value: "19", label: "routes" },
    ],
    problem:
      "Head office had no live view of stock counts happening on store floors, and price discrepancies were caught late.",
    built: [
      "SignalR hub client streaming live session telemetry to the dashboard, with push-status tracking.",
      "Sessions, variance tracking, price remediation and history, and analytics.",
      "Role-based access filtered by location, bulk uploads and PDF/CSV/Excel export on every table.",
      "Error boundaries and safe formatting utilities for resilience on the shop floor.",
    ],
    architecture: [
      "Next.js App Router with middleware RBAC and a realtime hub hook isolated from UI components.",
    ],
    outcome:
      "Gave operations a live, store-by-store view of stock counts and pricing issues.",
  },
  {
    slug: "ai-banking-chatbot",
    title: "AI Customer-Service App",
    client: "Bank (proof of concept)",
    tagline: "A React Native app giving bank customers a conversational AI support channel.",
    year: "2025",
    role: "Mobile Engineer (built from scratch)",
    featured: false,
    accent: "from-indigo-400 to-blue-500",
    stack: ["Expo", "React Native", "TypeScript", "React Navigation", "Reanimated"],
    metrics: [],
    problem: "A bank wanted to test AI-driven customer support on mobile.",
    built: [
      "Set up the project and built every screen (home, chat room and conversation history) with an animated chat UI.",
    ],
    architecture: ["Expo with React Native's New Architecture and EAS builds."],
    outcome: "Delivered a working prototype for the bank's AI support pilot.",
  },
  {
    slug: "licensing-portal-modernisation",
    title: "Licensing Portal Modernisation",
    client: "Nigerian federal government licensing portal",
    tagline: "Bringing auth, RBAC and a design system to a legacy AngularJS application.",
    year: "2026",
    role: "Frontend Engineer",
    featured: false,
    accent: "from-yellow-400 to-amber-500",
    stack: ["AngularJS", "ASP.NET Core MVC", "JavaScript", "CSS"],
    metrics: [],
    problem: "A live government portal needed security and usability upgrades without a rewrite.",
    built: [
      "Auth HTTP interceptor and service with role-based access for customers vs staff.",
      "Per-environment, server-injected API configuration.",
      "A new design system (~1,900 lines of CSS) and an admin dashboard.",
    ],
    architecture: ["Incremental modernisation inside the existing AngularJS SPA."],
    outcome: "A safer, more consistent portal shipped without disrupting live licence holders.",
  },
];

export const skills = [
  { group: "Core", items: ["TypeScript", "JavaScript", "React 19", "Next.js 15", "Vite", "React Native / Expo", "HTML", "CSS"] },
  { group: "State & data", items: ["Redux Toolkit", "RTK Query", "TanStack Query", "Zustand", "REST", "GraphQL", "OpenAPI / Orval", "SignalR"] },
  { group: "UI & design systems", items: ["Tailwind CSS", "Radix / shadcn", "Ant Design", "Design tokens", "Accessibility", "Recharts", "Framer Motion"] },
  { group: "Quality", items: ["Playwright", "Vitest", "Testing Library", "Jest", "MSW", "Zod", "ESLint / Prettier"] },
  { group: "Cloud & delivery", items: ["Azure DevOps Pipelines", "Azure", "Google Cloud", "Vercel", "Docker", "MSAL / Entra ID"] },
  { group: "AI-assisted engineering", items: ["Claude Code", "GitHub Copilot", "AI features in product", "Documented agent workflows"] },
];

/** Scrolling strip under the hero. Names with a known logo get an icon (see components/Marquee.tsx). */
export const marqueeStack = [
  "React", "Next.js", "TypeScript", "JavaScript", "Redux Toolkit", "TanStack Query", "Tailwind CSS", "Vite",
  "React Native / Expo", "Radix UI", "GraphQL", "OpenAPI", "Zod", "Playwright", "Vitest", "Testing Library",
  "Azure", "Azure DevOps", "Google Cloud", "Vercel", "Docker", "PostgreSQL", "Django", "Gatsby",
  "Claude Code", "GitHub Copilot",
]

export type Certification = { name: string; issuer: string; href?: string }

export const certifications: Certification[] = [
  { name: "Azure Administrator Associate (2026)", issuer: "Microsoft Certified" },
  { name: "Professional Cloud DevOps Engineer", issuer: "Google Cloud" },
  { name: "Associate Cloud Engineer", issuer: "Google Cloud" },
  {
    name: "Software Architecture & Design of Modern Large-Scale Systems",
    issuer: "Udemy",
    href: "https://www.udemy.com/certificate/UC-27ace722-bfa0-4c1f-a92a-532bc5f151cb/",
  },
  {
    name: "React & Django Full Stack",
    issuer: "Udemy",
    href: "https://www.udemy.com/certificate/UC-9f7a15c5-efb6-4ef7-a344-db893760212e/",
  },
  { name: "Computer Professionals Certification", issuer: "CPN Nigeria" },
];

export const education = {
  school: "University of Jos",
  degree: "B.Sc. Computer Science",
  year: "2019",
  nysc: "NYSC: national service completed, 2020",
};
