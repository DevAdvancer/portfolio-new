import { Github, ExternalLink } from "lucide-react";

export interface Project {
  id: string;
  title: string;
  problem: string;
  techStack: string[];
  features: string[];
  role: string;
  githubUrl: string;
  liveUrl?: string;
  image: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    problem: "Building a full-featured online store with cart functionality, payment integration, and admin dashboard.",
    techStack: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
    features: [
      "User authentication & authorization",
      "Product search with filters",
      "Shopping cart & checkout",
      "Admin inventory management",
    ],
    role: "Sole developer. Designed database schema, built REST API, and implemented responsive frontend.",
    githubUrl: "https://github.com/yourusername/ecommerce",
    liveUrl: "https://demo-ecommerce.com",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop",
  },
  {
    id: "2",
    title: "Task Management App",
    problem: "Creating a collaborative task manager with real-time updates and team features.",
    techStack: ["React", "TypeScript", "Supabase", "Tailwind CSS"],
    features: [
      "Real-time collaboration",
      "Drag-and-drop task boards",
      "Team workspaces",
      "Due date notifications",
    ],
    role: "Full-stack development. Implemented real-time subscriptions and optimistic UI updates.",
    githubUrl: "https://github.com/yourusername/taskmanager",
    liveUrl: "https://demo-tasks.com",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=500&fit=crop",
  },
  {
    id: "3",
    title: "Weather Dashboard",
    problem: "Developing an intuitive weather app with forecasts, maps, and location-based data.",
    techStack: ["React", "OpenWeather API", "Chart.js", "Geolocation API"],
    features: [
      "7-day weather forecast",
      "Interactive weather maps",
      "Location auto-detection",
      "Historical data charts",
    ],
    role: "Frontend development. Integrated multiple APIs and built data visualizations.",
    githubUrl: "https://github.com/yourusername/weather",
    image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&h=500&fit=crop",
  },
  {
    id: "4",
    title: "Portfolio Generator",
    problem: "Building a tool that generates professional portfolios from a simple configuration file.",
    techStack: ["Python", "Jinja2", "Flask", "YAML"],
    features: [
      "Template-based generation",
      "Multiple theme support",
      "Markdown content support",
      "Auto-deployment to GitHub Pages",
    ],
    role: "Designed templating system and CLI interface. Wrote documentation.",
    githubUrl: "https://github.com/yourusername/portfolio-gen",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop",
  },
];
