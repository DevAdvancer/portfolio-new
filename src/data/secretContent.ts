// Only add personal stories that are intended to be publicly discoverable.
// This playful client-side space includes its content in the website bundle.
// File names become commands: cat notes.txt
import { achievements } from "@/data/achievements";
import { projects } from "@/data/projects";

export const secretFiles: Record<string, string> = {
  "readme.txt": "You followed a small signal all the way here.\nWelcome to the space between the lines.\n\nType ls to look around, help for commands, or ask <question> to talk to Abhirup’s AI.\nPublic portfolio context is ready. Personal notes are waiting for Abhirup to add them.",
  "about.txt": "Abhirup Kumar\nSoftware Developer at Vizva Consultancy Services (January 2026–present).\nPreviously Lead Software Developer at HERMEiAS, an internship from May–December 2025.\nB.Tech in Computer Science & Engineering, Adamas University (2022–2026).\nFrom Tarakeswar, near Kolkata, India.\n\nWorks on full-stack web applications, internal tools, systems, and AI experiments.\nTools include TypeScript, React, Next.js, Node.js, Python, Supabase, Linux, and Rust.\n\nContact: theabhirupkumar@gmail.com\nGitHub: https://github.com/DevAdvancer",
  "projects.txt": projects.map(project => `${project.title}\n${project.problem}\nTech: ${project.techStack.join(", ")}\nRole: ${project.role}\nCode: ${project.githubUrl}${project.liveUrl ? `\nLive: ${project.liveUrl}` : ""}`).join("\n\n"),
  "achievements.txt": achievements.map(item => `${item.title}\n${item.issuer} · ${item.date}\n${item.description || ""}${item.link ? `\nCredential: ${item.link}` : ""}`).join("\n\n"),
  "notes.txt": "An empty page, for now.\nAbhirup’s personal notes will live here when he is ready to share them.",
  "interests.txt": "Coder. Gamer. Coffee person.\n\nCoffee is a big part of Abhirup’s personality, and gaming belongs here just as much as coding.\n\nHis specific games, favorite coffee, setup, and personal stories haven’t been added yet. Ask him before filling those details in.",
  "guestbook.txt": "You found the hidden room. That already makes you a little curious.\n\nWant to say hello?\ntheabhirupkumar@gmail.com\n\nNo messages or personal details are collected in this terminal.",
};
