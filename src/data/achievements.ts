export interface Achievement {
  title: string;
  issuer: string;
  date: string;
  type: "certification" | "award" | "competition";
  link?: string;
  description?: string;
}

export const achievements: Achievement[] = [
  {
    title: "Cyber Security 101 Certificate",
    issuer: "TryHackMe",
    date: "2025",
    type: "certification",
    link: "https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-NFGEN9MESM.pdf",
    description: "Learned everything I need to embark on a career path in offensive or defensive cyber security.",
  },
  {
    title: "Pre Security Certificate",
    issuer: "TryHackMe",
    date: "2025",
    type: "certification",
    link: "https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-NFGEN9MESM.pdf",
    description: "Before hacking something, I first need to understand the basics. So, I learned it.",
  },
  {
    title: "The Complete Full-Stack Web Development Bootcamp",
    issuer: "Udemy",
    date: "2024",
    type: "certification",
    link: "https://www.udemy.com/certificate/UC-48468b5e-4bfe-47d5-955e-c3863d2e7a04/",
    description: "Became a Full-Stack Web Developer with HTML, CSS, Javascript, Node, React, PostgreSQL, Web3 and DApps",
  },
  {
    title: "Software Engineer Certificate",
    issuer: "HackerRank",
    date: "2024",
    type: "certification",
    link: "https://www.hackerrank.com/certificates/5cc231bd46d5",
    description: "It covers topics like Problem solving, SQL, and REST API.",
  },
  {
    title: "Problem Solving (Basic) Certificate",
    issuer: "HackerRank",
    date: "2023",
    type: "certification",
    link: "https://www.hackerrank.com/certificates/16723ae1ecb5",
    description: "It covers basic topics of Data Structures (such as Arrays, Strings) and Algorithms (such as Sorting and Searching).",
  },
  {
    title: "Top Leet Coder in University",
    issuer: "Adamas University",
    date: "2025",
    type: "award",
    description: "Recognized for maintaining top academic performance in LeetCode.",
  },
  {
    title: "LeetCode 800+ Problems Solved",
    issuer: "LeetCode",
    date: "2025",
    type: "competition",
    link: "https://leetcode.com/devadvabcer",
    description: "Consistent problem-solving practice covering arrays, trees, graphs, and dynamic programming.",
  },
  {
    title: "HackfinityBattle",
    issuer: "TryHackMe",
    date: "2025",
    type: "competition",
    link: "https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-7Q0TSYYG6T.pdf",
    description: "Global capture-the-flag competition across multiple rooms; ranked 849.",
  },
];
