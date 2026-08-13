import charmcrafter from "/charmcrafter.webp";
import universitynotes from "/universitynotes.webp";
import formethica from "/formethica.webp";
import femway from "/femway.webp";
import studynotesviewer from "/studynoteviewer.webp";
import dlka from "/dlka.webp";

export interface Project {
  id: string;
  title: string;
  problem: string;
  techStack: string[];
  features: string[];
  role: string;
  githubUrl: string;
  liveUrl?: string;
  reportUrl?: string;
  image: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Distributed Linux Kernel Attestation System",
    problem: "Building a distributed system to verify Linux kernel integrity in real-time using loadable kernel modules, Netlink communication, and quorum-based consensus to detect unauthorized kernel modifications.",
    techStack: ["Python", "C", "Linux Kernel Modules", "Netlink Protocol", "Flask", "SHA256 Cryptography", "OpenSSL"],
    features: [
      "Real-time kernel integrity monitoring via LKM",
      "Netlink-based kernel-userspace communication",
      "Quorum-based consensus engine for distributed attestation",
      "Cryptographic signing and verification of reports",
      "HTTP API for attestation report collection",
      "Trusted baseline management with operator prompts",
      "Structured audit logging and security alerts",
      "Secure Boot support with MOK key enrollment"
    ],
    role: "Control Node & Attestation Server developer. Designed kernel-space monitoring architecture, implemented Netlink protocol communication, built consensus engine, and created HTTP-based control plane with cryptographic verification.",
    githubUrl: "https://github.com/DevAdvancer/DLKA-System",
    liveUrl: null, // This is a kernel security system, not a web app
    reportUrl: "/MINOR_PROJECT.pdf",
    image: dlka,
  },
  {
    id: "2",
    title: "CharmCrafter",
    problem: "A modern web application built with React and TypeScript, featuring a responsive UI with shadcn-ui components and Supabase backend integration.",
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn-ui", "Supabase", "Vercel"],
    features: [
      "Modern React architecture with TypeScript",
      "Responsive UI with shadcn-ui components",
      "Supabase backend integration",
      "Tailwind CSS styling with custom configuration",
    ],
    role: "Sole developer.  Built with Lovable platform, implemented TypeScript-based React application with modern tooling and design system.",
    githubUrl: "https://github.com/DevAdvancer/CharmCrafter",
    liveUrl: "https://chramcrafter.vercel.app/",
    image: charmcrafter,
  },
  {
    id: "3",
    title: "University Notes Platform",
    problem: "Building a comprehensive platform for managing and sharing university course notes with modern web technologies and database integration.",
    techStack: ["TypeScript", "Supabase", "PostgreSQL", "VITE", "Tailwind CSS", "Vercel"],
    features: [
      "User authentication & authorization",
      "Note organization and management",
      "Database-driven content storage",
      "Responsive modern interface",
    ],
    role: "Sole developer. Designed database schema, built full-stack application with TypeScript, and deployed to production.",
    githubUrl: "https://github.com/DevAdvancer/University-Notes-New-Version",
    liveUrl: "https://universitynotes.abhirupkumar.in/",
    image: universitynotes,
  },
  {
    id: "4",
    title: "Formethica - AI-Powered Form Builder",
    problem: "Building an intelligent form creation platform with AI-powered field suggestions, chatbot assistance, and advanced submission management with analytics and export capabilities.",
    techStack: ["Next.js 15", "TypeScript", "Supabase", "PostgreSQL", "Google Gemini AI", "Tailwind CSS", "Vercel"],
    features: [
      "AI-powered form creation with smart field suggestions",
      "Interactive AI chatbot for form building assistance",
      "User authentication with anonymous & authenticated modes",
      "Advanced submission management with Excel/CSV export",
      "Link shortening with click analytics",
      "Real-time form updates and response tracking",
    ],
    role: "Sole developer.  Designed database schema with RLS policies, integrated Google Gemini AI for intelligent suggestions, built responsive glassmorphism UI, and implemented full-stack features.",
    githubUrl: "https://github.com/DevAdvancer/Formethica",
    liveUrl: "https://ai.formethica.abhirupkumar.in/",
    image: formethica,
  },
  {
    id: "5",
    title:  "Femway - Women's Safety Car Booking Platform",
    problem: "Building a secure, role-based car booking platform specifically designed for women's safety and comfort, with admin verification, driver management, and passenger protection features.",
    techStack: ["Next.js 15", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS", "Vercel"],
    features: [
      "Role-based access control (Passenger, Driver, Admin)",
      "Secure authentication with 24-hour session management",
      "Admin verification system with secure codes",
      "Driver verification and document management",
      "Real-time ride booking and tracking",
      "Row Level Security (RLS) on all database tables",
    ],
    role: "Sole developer. Designed secure database schema with RLS policies, implemented role-based authentication with admin code verification, built three distinct dashboards, and created responsive UI focused on safety.",
    githubUrl: "https://github.com/DevAdvancer/Femway",
    liveUrl: "https://femway.vercel.app",
    image: femway,
  },
  {
    id: "6",
    title:  "Study Notes Viewer",
    problem: "Building a modern web application for managing and organizing study notes with embedded content support, progress tracking, and rich markdown rendering capabilities.",
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion", "ReactMarkdown"],
    features: [
      "Dynamic note display with grid layout",
      "Progress filtering (completed, in-progress, not-started)",
      "Embedded YouTube videos and Google Drive documents",
      "Markdown support with code syntax highlighting",
      "Responsive design with smooth animations",
      "Intuitive note viewing and navigation",
    ],
    role: "Sole developer. Designed component architecture, implemented markdown rendering with rehype plugins, integrated embedded content support, and created animated responsive UI.",
    githubUrl: "https://github.com/DevAdvancer/Study-notes-Viewer",
    liveUrl:  "https://study-notes-viewer.vercel.app",
    image: studynotesviewer,
  },
  {
    id: "7",
    title: "Nexterm",
    problem:  "Building an AI-powered terminal emulator that brings intelligent assistance to command-line workflows with natural language processing, error explanations, and context-aware suggestions.",
    techStack: ["Rust", "Ratatui", "Tokio", "Portable-pty", "Ollama", "Google Gemini API"],
    features: [
      "Full terminal emulation with PTY support",
      "AI-powered natural language command translation",
      "Dual AI provider support (Ollama & Google Gemini)",
      "Smart command history with fuzzy search",
      "Syntax highlighting & danger detection",
      "Privacy-focused data sanitization",
    ],
    role: "Sole developer.  Designed terminal architecture, implemented AI integration with multiple providers, built TUI with ratatui, and created security features for data sanitization.",
    githubUrl: "https://github.com/DevAdvancer/Nexterm",
    liveUrl: null, // CLI tool, no live URL
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&h=500&fit=crop", // Terminal/coding themed image
  },
  {
    id: "8",
    title: "Pulse CRM (Sales Dashboard)",
    problem: "Developing a high-performance CRM tailored for sales teams with complex data structures, follow-ups, and metric tracking to improve conversion rates.",
    techStack: ["Next.js", "React Query", "Appwrite", "Tailwind CSS", "TypeScript", "Zustand"],
    features: [
      "Real-time lead and sales pipeline management",
      "Advanced metric calculation and tracking",
      "Robust filtering and reporting tools",
      "Custom follow-up collection and notifications",
    ],
    role: "Full Stack Engineer at Vizva Consultancy Services. Built the frontend architecture and integrated heavily with the Appwrite backend.",
    githubUrl: "",
    liveUrl: "Proprietary",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
  },
  {
    id: "9",
    title: "Compliance Management System",
    problem: "Building a comprehensive tracker to monitor and manage organizational compliance policies and tasks, ensuring regulatory requirements are met seamlessly.",
    techStack: ["Next.js", "Supabase", "Tailwind CSS", "Recharts", "Radix UI", "Zod"],
    features: [
      "Role-based access and organizational mapping",
      "Real-time compliance status dashboards",
      "Automated PDF report generation",
      "Interactive data visualizations with Recharts",
    ],
    role: "Full Stack Engineer at Vizva Consultancy Services. Designed the schema and implemented dynamic UI components with robust data validation.",
    githubUrl: "",
    liveUrl: "Proprietary",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
  },
  {
    id: "10",
    title: "Sahaal Ride App",
    problem: "Developing a highly scalable ride-booking system comprising dedicated applications for Users, Providers, and Kiosks, catering to diverse ride scenarios.",
    techStack: ["React Native / Mobile UI", "Android (Kotlin)", "iOS (Swift)", "Backend APIs"],
    features: [
      "Multi-platform support for passengers and drivers",
      "Kiosk mode integration for localized bookings",
      "Real-time location tracking and driver matching",
      "Seamless payment processing and invoice generation",
    ],
    role: "Mobile/Full Stack Engineer at Vizva Consultancy Services. Worked on integrating the mobile applications with robust backend APIs and ensuring smooth UI/UX.",
    githubUrl: "",
    liveUrl: "Proprietary",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop",
  }
];
