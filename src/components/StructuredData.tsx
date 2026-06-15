import { Helmet } from "react-helmet-async";

const SITE_URL = "https://www.abhirupkumar.in";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Abhirup Kumar",
  givenName: "Abhirup",
  familyName: "Kumar",
  url: SITE_URL,
  image: `${SITE_URL}/og-image.jpeg`,
  description:
    "Software Engineer, Full Stack Developer, and Computer Science student at Adamas University, Kolkata. Specializes in React, TypeScript, and Node.js.",
  jobTitle: "Software Engineer & Full Stack Developer",
  worksFor: {
    "@type": "Organization",
    name: "Freelance / Open to Opportunities",
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Adamas University",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kolkata",
      addressRegion: "West Bengal",
      addressCountry: "IN",
    },
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kolkata",
    addressRegion: "West Bengal",
    addressCountry: "IN",
  },
  email: "theabhirupkumar@gmail.com",
  sameAs: [
    "https://github.com/devadvancer",
    "https://linkedin.com/in/abhirupkumar",
    "https://x.com/abhirup",
    "https://www.abhirupkumar.in",
  ],
  knowsAbout: [
    "Software Engineering",
    "Full Stack Development",
    "React",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Web Development",
    "Frontend Development",
    "Backend Development",
    "System Design",
    "Web Performance",
    "Search Engine Optimization",
    "Accessibility",
    "WCAG",
    "Cybersecurity",
    "Python",
    "SQL",
    "Design Systems",
  ],
  knowsLanguage: [
    { "@type": "Language", name: "English" },
    { "@type": "Language", name: "Hindi" },
    { "@type": "Language", name: "Bengali" },
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Abhirup Kumar Portfolio",
  description:
    "Portfolio, projects, blog, and contact information for Abhirup Kumar — Software Engineer and Full Stack Developer.",
  inLanguage: "en-US",
  author: { "@id": `${SITE_URL}/#person` },
  publisher: { "@id": `${SITE_URL}/#person` },
};

const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/#profilepage`,
  url: SITE_URL,
  name: "Abhirup Kumar — Software Engineer & Full Stack Developer",
  description:
    "Profile, projects, skills, experience, education, blog, and contact for Abhirup Kumar.",
  about: { "@id": `${SITE_URL}/#person` },
  isPartOf: { "@id": `${SITE_URL}/#website` },
  inLanguage: "en-US",
};

const breadcrumbsSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Who is Abhirup Kumar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Abhirup Kumar is a Software Engineer and Full Stack Developer from Kolkata, India. He is pursuing a B.Tech in Computer Science at Adamas University and builds web applications with React, TypeScript, and Node.js.",
      },
    },
    {
      "@type": "Question",
      name: "What does Abhirup Kumar do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Abhirup Kumar designs and builds production-grade web applications end-to-end — front-end architecture, design systems, performance optimization, accessibility, and full-stack product development using React, TypeScript, and Node.js.",
      },
    },
    {
      "@type": "Question",
      name: "Where is Abhirup Kumar based?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Abhirup Kumar is based in Kolkata, West Bengal, India, and is originally from Tarakeswar, Hooghly, West Bengal.",
      },
    },
    {
      "@type": "Question",
      name: "What technologies does Abhirup Kumar specialize in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Abhirup Kumar specializes in React 19, TypeScript, Node.js, Vite, Tailwind CSS, shadcn/ui, Radix UI, Next.js, and modern web performance, accessibility (WCAG), and SEO techniques.",
      },
    },
    {
      "@type": "Question",
      name: "How can I contact Abhirup Kumar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can contact Abhirup Kumar via email at theabhirupkumar@gmail.com, through the contact form on his portfolio at https://www.abhirupkumar.in/contact, or via LinkedIn and GitHub (linked in his portfolio).",
      },
    },
  ],
};

const StructuredData = () => (
  <Helmet>
    <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
    <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
    <script type="application/ld+json">{JSON.stringify(profilePageSchema)}</script>
    <script type="application/ld+json">{JSON.stringify(breadcrumbsSchema)}</script>
    <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
  </Helmet>
);

export default StructuredData;
