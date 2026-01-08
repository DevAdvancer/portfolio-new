// Knowledge base for the portfolio chatbot
export interface ChatResponse {
  answer: string;
  followUp?: string[];
}

export interface KnowledgeEntry {
  keywords: string[];
  patterns: RegExp[];
  response: ChatResponse;
}

export const chatbotKnowledge: KnowledgeEntry[] = [
  // Greetings
  {
    keywords: ["hello", "hi", "hey", "greetings", "good morning", "good afternoon", "good evening"],
    patterns: [/^(hi|hello|hey|greetings|good\s+(morning|afternoon|evening))/i],
    response: {
      answer: "Hello! I'm Abhirup Kumar, a passionate developer and final-year CS student. How can I help you today?",
      followUp: [
        "What projects have you worked on?",
        "Tell me about your skills",
        "What's your experience?",
        "How can I contact you?"
      ]
    }
  },

  // About Me
  {
    keywords: ["about you", "who", "yourself", "introduce yourself"],
    patterns: [/^who\s+are\s+you/i, /tell\s+me\s+about\s+(you|yourself)/i, /^introduce\s+(yourself)?$/i, /^about\s+you/i],
    response: {
      answer: "I'm a final-year Computer Science student at Adamas University. I'm passionate about building elegant solutions to complex problems. My interests include Web Development, System Design, and Cybersecurity. I focus on writing clean, maintainable code and solving challenges with a problem-solving mindset. Currently, I'm working as a Lead Software Developer at HERMEiAS and looking for full-time opportunities to grow professionally.",
      followUp: [
        "What are your technical skills?",
        "Show me your projects",
        "What's your educational background?"
      ]
    }
  },

  // Skills
  {
    keywords: ["skills", "technologies", "tech stack", "programming languages", "what can you do", "expertise"],
    patterns: [/your\s+skills/i, /what.*skills/i, /tech\s+stack/i, /your\s+technologies/i, /programming\s+languages/i, /tell.*about.*skills/i, /technical.*skills/i],
    response: {
      answer: "I have advanced skills in Python, JavaScript, React, Node.js, and MySQL. I also work with TypeScript, Java, C, Next.js, and Tailwind CSS. For databases, I use Supabase, MongoDB, and PostgreSQL. I'm comfortable with Git, Linux, VS Code, and Cursor. My expertise includes Full Stack Development, Data Structures and Algorithms, REST APIs, Flutter Development, and Cybersecurity basics.",
      followUp: [
        "What projects have you built?",
        "Tell me about your experience",
        "What frameworks do you use?"
      ]
    }
  },

  // Projects
  {
    keywords: ["projects", "portfolio", "work", "built", "created", "developed"],
    patterns: [/your\s+projects/i, /what.*projects/i, /what\s+(have\s+you\s+)?(built|created|made)/i, /show\s+me\s+your\s+(work|projects)/i, /tell.*about.*projects/i],
    response: {
      answer: "I've built several exciting projects. DLKA System is a distributed Linux kernel monitoring system using C and Python. Formethica is an AI-powered form builder with Google Gemini. Femway is a women's safety car booking platform. Nexterm is an AI terminal emulator built in Rust. I also created a University Notes Platform and CharmCrafter using React and Supabase. Each project shows my full-stack skills and problem-solving ability.",
      followUp: [
        "Tell me about DLKA System",
        "What's Formethica?",
        "Tell me about Nexterm"
      ]
    }
  },

  // DLKA Project
  {
    keywords: ["dlka", "kernel", "attestation", "distributed", "linux kernel"],
    patterns: [/dlka/i, /kernel\s+attestation/i, /distributed\s+linux/i, /tell.*about.*dlka/i, /what.*dlka/i],
    response: {
      answer: "DLKA is one of my most complex projects. It verifies Linux kernel integrity in real-time using loadable kernel modules and Netlink communication. The system has real-time kernel monitoring, quorum-based consensus, cryptographic signing with SHA256, and HTTP API for reports. It also supports Secure Boot with MOK key enrollment. I developed the control node and attestation server using Python, C, Linux Kernel Modules, and Flask.",
      followUp: [
        "What other projects have you done?",
        "Tell me about your skills",
        "What's your GitHub?"
      ]
    }
  },

  // Formethica Project
  {
    keywords: ["formethica", "form builder", "ai form"],
    patterns: [/formethica/i, /form\s+builder/i, /ai.*form/i, /tell.*about.*formethica/i, /what.*formethica/i],
    response: {
      answer: "Formethica is an intelligent form builder I created using Next.js 15 and TypeScript. It has AI-powered form creation with smart field suggestions using Google Gemini. The platform includes an interactive AI chatbot, user authentication with anonymous and authenticated modes, and advanced submission management with Excel and CSV export. It also has link shortening with click analytics and real-time form updates. I designed the complete database with RLS policies and built a glassmorphism UI. Check it out at ai.formethica.abhirupkumar.in",
      followUp: [
        "What other projects have you built?",
        "Tell me about Femway",
        "What technologies do you use?"
      ]
    }
  },

  // Femway Project
  {
    keywords: ["femway", "safety", "car booking", "women"],
    patterns: [/femway/i, /women.*safety/i, /car\s+booking/i, /tell.*about.*femway/i, /what.*femway/i],
    response: {
      answer: "Femway is a secure car booking platform designed for women's safety. It has role-based access for Passengers, Drivers, and Admins. The platform includes secure authentication with 24-hour session management, admin verification with secure codes, and driver verification with document management. Users can book and track rides in real-time. I built it with Next.js 15, TypeScript, and Supabase with strong security using Row Level Security on all tables. It has three separate dashboards and is live at femway.vercel.app",
      followUp: [
        "Tell me about Nexterm",
        "What's your experience?",
        "Show me more projects"
      ]
    }
  },

  // Nexterm Project
  {
    keywords: ["nexterm", "terminal", "rust", "ai terminal"],
    patterns: [/nexterm/i, /ai.*terminal/i, /rust.*terminal/i, /tell.*about.*nexterm/i, /what.*nexterm/i],
    response: {
      answer: "Nexterm is an AI-powered terminal emulator I built entirely in Rust. It brings intelligent assistance to command-line work. The terminal has full emulation with PTY support, AI-powered natural language command translation, and dual AI provider support with Ollama and Google Gemini. It includes smart command history with fuzzy search, syntax highlighting, danger detection, and privacy-focused data sanitization. I designed the complete terminal architecture, integrated AI with multiple providers, and built the interface using ratatui. It's one of my favorite projects.",
      followUp: [
        "What programming languages do you know?",
        "Tell me about other projects",
        "What's your GitHub?"
      ]
    }
  },

  // Experience
  {
    keywords: ["experience", "work", "job", "internship", "current role"],
    patterns: [/your\s+experience/i, /work\s+experience/i, /where\s+do\s+you\s+work/i, /current\s+(job|role|position)/i, /tell.*about.*experience/i, /what.*experience/i],
    response: {
      answer: "I'm currently working as a Lead Software Developer at HERMEiAS (May 2025 - December 2025). In this role, I'm responsible for developing scalable internal tools and web platforms that integrate with the company's flagship products. I work with React, TypeScript, Vite, Tailwind CSS, shadcn-ui, Supabase, and deploy on Vercel. This internship allows me to build tools that enable efficient monitoring, management, and continuous improvement across teams.",
      followUp: [
        "What projects are you working on?",
        "Tell me about your education",
        "What are your skills?"
      ]
    }
  },

  // Education
  {
    keywords: ["education", "degree", "university", "college", "study", "student"],
    patterns: [/your\s+education/i, /where\s+did\s+you\s+study/i, /your\s+university/i, /what.*degree/i, /tell.*about.*education/i, /educational\s+background/i],
    response: {
      answer: "I'm pursuing my Bachelor of Technology in Computer Science & Engineering at Adamas University (2022-2026) with a CGPA of 8.72/10. My coursework includes Data Structures, Algorithms, DBMS, Operating Systems, and Computer Networks. I'm an active member of the Coding Club & Technical Society. Before this, I completed my 12th from Kendriya Vidyalaya Tarakeswar with PCM and Computer Science.",
      followUp: [
        "What are your technical skills?",
        "Tell me about your projects",
        "What's your current role?"
      ]
    }
  },

  // Contact
  {
    keywords: ["contact", "email", "reach", "connect", "get in touch", "hire"],
    patterns: [/how\s+(can|do)\s+i\s+(contact|reach|connect)/i, /get\s+in\s+touch/i, /email/i, /hire/i],
    response: {
      answer: "I'd love to connect with you! You can find my email on the contact page of this portfolio. You can also reach me on GitHub at github.com/DevAdvancer or check my LinkedIn from the contact section. I'm always open to discussing new opportunities, collaborations, or chatting about technology.",
      followUp: [
        "Tell me about your projects",
        "What are your skills?",
        "What's your experience?"
      ]
    }
  },

  // GitHub
  {
    keywords: ["github", "repository", "code", "source"],
    patterns: [/github/i, /repositories/i, /source\s+code/i],
    response: {
      answer: "All my projects are open-source and available on GitHub! You can find my work at github.com/DevAdvancer. I have projects ranging from system-level programming (DLKA, Nexterm in Rust) to full-stack web applications (Formethica, Femway, University Notes Platform). Feel free to explore, star, or contribute to any of them!",
      followUp: [
        "Tell me about your projects",
        "What technologies do you use?",
        "How can I contact you?"
      ]
    }
  },

  // Resume
  {
    keywords: ["resume", "cv", "download", "pdf"],
    patterns: [/resume/i, /\bcv\b/i, /download.*resume/i],
    response: {
      answer: "You can download my resume directly from the navigation bar - just click the 'Resume' button! It contains detailed information about my education, experience, projects, and technical skills. The PDF is always updated with my latest accomplishments.",
      followUp: [
        "What projects have you worked on?",
        "Tell me about your experience",
        "What are your skills?"
      ]
    }
  },

  // Technologies/Frameworks
  {
    keywords: ["react", "next.js", "typescript", "python", "rust", "frameworks"],
    patterns: [/react/i, /next\.?js/i, /typescript/i, /python/i, /rust/i, /frameworks/i],
    response: {
      answer: "I work with a modern tech stack. For frontend, I use React, Next.js 15, TypeScript, and Tailwind CSS with shadcn-ui components. On backend, I work with Node.js, Python, and Flask. For databases, I use Supabase, PostgreSQL, MySQL, and MongoDB. I've also built projects in Rust like Nexterm and worked with Linux Kernel Modules in C. I believe in choosing the right tool for each project.",
      followUp: [
        "Show me projects using these technologies",
        "What's your favorite project?",
        "Tell me about your skills"
      ]
    }
  },

  // Availability/Hiring
  {
    keywords: ["available", "hiring", "job", "opportunity", "position", "looking for"],
    patterns: [/are\s+you\s+available/i, /looking\s+for/i, /hiring/i, /open\s+to/i],
    response: {
      answer: "Yes, I'm actively looking for opportunities. I'm in my final year and currently working as a Lead Software Developer at HERMEiAS until December 2025. I'm open to full-time positions from January 2026 or interesting part-time work. I'm especially interested in roles with full-stack development, system design, or cybersecurity. Let's connect through my contact page.",
      followUp: [
        "What are your skills?",
        "Tell me about your experience",
        "How can I contact you?"
      ]
    }
  },

  // Strengths
  {
    keywords: ["strengths", "good at", "best at", "qualities"],
    patterns: [/strengths/i, /(what\s+are\s+you\s+)?good\s+at/i, /best\s+at/i, /qualities/i],
    response: {
      answer: "My key strengths are analytical thinking, self-motivated learning, team collaboration, and attention to detail. I love breaking down complex problems into manageable pieces and constantly explore new technologies. I work well with others and value different perspectives. I believe in writing clean, well-structured code. My focus areas include Full-Stack Development, Problem Solving with Data Structures and Algorithms, System Design, and Security Fundamentals.",
      followUp: [
        "What projects showcase these strengths?",
        "Tell me about your skills",
        "What's your educational background?"
      ]
    }
  },

  // Blog
  {
    keywords: ["blog", "articles", "writing", "posts"],
    patterns: [/your\s+blog/i, /blog\s+posts/i, /articles/i, /writing/i, /tell.*about.*blog/i, /what.*blog/i],
    response: {
      answer: "I write about design, development, and creative processes on my blog. Some posts include The Art of Minimalism in Design which explores how less becomes more in user experience. Building with Intention discusses how thoughtful development creates better products. Finding Creativity in Constraints explains why limitations can be your greatest asset. Check out the Blog section to read more.",
      followUp: [
        "What projects have you built?",
        "Tell me about your experience",
        "What technologies do you use?"
      ]
    }
  },

  // Background and Motivation
  {
    keywords: ["background", "journey", "story", "how did you", "got into", "started"],
    patterns: [/background/i, /what\s+brought\s+you/i, /how.*get.*into/i, /journey/i, /story/i],
    response: {
      answer: "My journey into software development started with curiosity. I've always been fascinated by how technology solves real problems. During my studies at Adamas University, I dove deep into coding and realized I love building things that make an impact. Each project taught me something new, from system-level programming to full-stack web development. What keeps me going is the endless learning and the ability to create solutions that help people.",
      followUp: [
        "What projects have you built?",
        "Tell me about your education",
        "What are your career goals?"
      ]
    }
  },

  // Portfolio Motivation
  {
    keywords: ["portfolio", "website", "why build", "inspired", "blog"],
    patterns: [/why.*portfolio/i, /inspired.*build/i, /why.*blog/i, /motivation.*website/i],
    response: {
      answer: "I built my portfolio to showcase my work and share my learning journey. It's more than just a resume, it's a living document of my growth as a developer. The blog helps me document insights, design principles, and development practices I learn along the way. Plus, building it gave me hands-on experience with modern web technologies like React, TypeScript, and Tailwind CSS. It's been a great learning project in itself.",
      followUp: [
        "What technologies did you use?",
        "Tell me about your blog",
        "What projects are featured?"
      ]
    }
  },

  // Academic Complement
  {
    keywords: ["academics", "studies", "university", "complement", "theory"],
    patterns: [/academic.*complement/i, /studies.*help/i, /university.*projects/i, /theory.*practice/i],
    response: {
      answer: "My academic coursework in Data Structures, Algorithms, Operating Systems, and Computer Networks gives me solid theoretical foundations. What I learn in class, I apply in my projects. For example, understanding OS concepts helped me build the DLKA kernel monitoring system. Database theory from DBMS class directly applies to my full-stack projects. The combination of theory and practice makes me a stronger developer because I understand not just how to build something, but why it works.",
      followUp: [
        "Tell me about DLKA System",
        "What's your educational background?",
        "What projects demonstrate this?"
      ]
    }
  },

  // Work-Life Balance
  {
    keywords: ["balance", "manage", "juggle", "time management", "handle"],
    patterns: [/balance.*work/i, /manage.*time/i, /juggle/i, /handle.*multiple/i],
    response: {
      answer: "Balancing academics, projects, and work requires good time management. I prioritize tasks based on deadlines and impact. I use project planning tools and break large goals into smaller milestones. My internship at HERMEiAS teaches me professional workflows, while personal projects let me explore technologies at my own pace. Studies provide structure and fundamentals. I believe in working smart, not just hard. Regular breaks and staying organized help me stay productive without burning out.",
      followUp: [
        "What's your current role?",
        "How do you learn new technologies?",
        "What are your productivity tips?"
      ]
    }
  },

  // Programming Languages Choice
  {
    keywords: ["primary languages", "why python", "why javascript", "language choice"],
    patterns: [/primary.*languages/i, /why.*python/i, /why.*javascript/i, /which.*languages/i],
    response: {
      answer: "I primarily use Python and JavaScript because they're versatile and powerful. Python is great for backend development, scripting, and working with system-level code like in my DLKA project. JavaScript with React and Node.js lets me build complete full-stack applications. I also use TypeScript for better type safety in large projects. Rust is my choice for systems programming like Nexterm because of its performance and safety guarantees. I choose languages based on the problem I'm solving.",
      followUp: [
        "Tell me about Nexterm",
        "What frameworks do you use?",
        "Tell me about DLKA System"
      ]
    }
  },

  // Technology Decisions
  {
    keywords: ["decide", "choose framework", "technology choice", "why react", "why next"],
    patterns: [/how.*decide/i, /choose.*framework/i, /react.*vs/i, /technology.*decision/i],
    response: {
      answer: "I choose technologies based on project requirements. For complex interactive UIs, I use React for its component model and ecosystem. Next.js adds server-side rendering and better SEO for content-heavy sites like portfolios. For backend, Node.js works well with JavaScript frontends, while Python with Flask is great for APIs and data processing. I consider factors like performance needs, team familiarity, community support, and long-term maintainability. I'm not tied to one stack but believe in using the right tool for the job.",
      followUp: [
        "What projects use these technologies?",
        "Tell me about Formethica",
        "What's your tech stack?"
      ]
    }
  },

  // Database Experience
  {
    keywords: ["database", "mongodb", "mysql", "postgresql", "supabase", "firebase"],
    patterns: [/database.*experience/i, /mongodb.*mysql/i, /sql.*nosql/i, /supabase/i],
    response: {
      answer: "I have experience with both SQL and NoSQL databases. MySQL and PostgreSQL are my go-to for relational data with complex queries and transactions. I use Supabase in most of my recent projects because it provides PostgreSQL with built-in auth and real-time features. MongoDB works well for flexible schemas in prototypes. I understand database design, indexing, normalization, and query optimization. I also implement Row Level Security policies in Supabase for projects like Femway to ensure data security at the database level.",
      followUp: [
        "Tell me about Femway",
        "What security practices do you follow?",
        "Tell me about your projects"
      ]
    }
  },

  // Development Tools
  {
    keywords: ["tools", "ide", "vscode", "cursor", "workflow", "development environment"],
    patterns: [/development.*tools/i, /ide.*prefer/i, /vscode.*cursor/i, /workflow/i],
    response: {
      answer: "I primarily use VS Code and Cursor for development. Cursor's AI features help me write better code faster and understand complex codebases. VS Code extensions like ESLint, Prettier, and GitLens improve code quality and collaboration. I'm comfortable with Linux command line tools and use Git for version control. For debugging, I use browser DevTools and built-in debuggers. I also work with tools like Docker for containerization, though I'm still building expertise there. Good tools make me more productive and help me focus on solving problems.",
      followUp: [
        "How do you use Git?",
        "What's your coding workflow?",
        "Tell me about your skills"
      ]
    }
  },

  // Role-Based Auth
  {
    keywords: ["authentication", "role-based", "session", "auth system", "rbac"],
    patterns: [/role.*based.*auth/i, /authentication.*design/i, /session.*management/i, /rbac/i],
    response: {
      answer: "In projects like Femway, I implemented role-based access control with three distinct roles: Passenger, Driver, and Admin. Each role has specific permissions defined at the database level using Row Level Security policies. Sessions are managed securely with 24-hour token expiration. Admin verification uses secure codes to prevent unauthorized access. I hash passwords, validate tokens, and sanitize all inputs. The key is implementing security at multiple layers, from the database to the API to the frontend.",
      followUp: [
        "Tell me about Femway",
        "What security practices do you follow?",
        "How do you handle user data?"
      ]
    }
  },

  // Backend Security
  {
    keywords: ["security", "secure coding", "vulnerabilities", "backend security", "api security"],
    patterns: [/security.*practices/i, /secure.*backend/i, /vulnerabilities/i, /api.*security/i],
    response: {
      answer: "I follow secure coding practices in all my projects. I validate and sanitize all user inputs to prevent SQL injection and XSS attacks. I use parameterized queries and prepared statements for database operations. Authentication tokens are stored securely and sessions expire automatically. I implement HTTPS, CORS policies, and rate limiting on APIs. I also use Row Level Security in databases to enforce permissions at the data layer. My cybersecurity background from TryHackMe helps me think like an attacker and build better defenses.",
      followUp: [
        "Tell me about your cybersecurity experience",
        "What's your TryHackMe profile?",
        "Tell me about Femway"
      ]
    }
  },

  // Real-time Updates
  {
    keywords: ["real-time", "websockets", "live updates", "state management"],
    patterns: [/real.*time.*updates/i, /websockets/i, /live.*data/i, /state.*changes/i],
    response: {
      answer: "For real-time features, I use Supabase's built-in real-time subscriptions which work over WebSockets. This allows instant updates when database records change. In Formethica, form responses update live without page refreshes. I also use React state management with hooks and context to keep the UI synchronized with data changes. For more complex state, I've worked with libraries that handle optimistic updates and caching. The goal is creating smooth user experiences where data feels instant.",
      followUp: [
        "Tell me about Formethica",
        "What databases do you use?",
        "How do you handle state?"
      ]
    }
  },

  // Responsive Design
  {
    keywords: ["responsive", "mobile", "design", "ui", "tailwind"],
    patterns: [/responsive.*design/i, /mobile.*friendly/i, /ui.*implementation/i, /tailwind/i],
    response: {
      answer: "I implement responsive design using Tailwind CSS with its mobile-first approach. I use responsive breakpoints like sm, md, lg to adapt layouts for different screen sizes. All my projects work seamlessly on mobile, tablet, and desktop. I test on multiple devices and use browser DevTools for different viewports. Flexbox and Grid help create flexible layouts. I also pay attention to touch targets, readable font sizes, and performance on mobile networks. Good design isn't just about looks, it's about working well everywhere.",
      followUp: [
        "What projects showcase your design?",
        "What technologies do you use?",
        "Tell me about your portfolio"
      ]
    }
  },

  // Animations Experience
  {
    keywords: ["animations", "framer motion", "transitions", "ui effects"],
    patterns: [/animations/i, /framer.*motion/i, /transitions/i, /ui.*effects/i],
    response: {
      answer: "I use Framer Motion and CSS animations to create smooth, engaging user experiences. The main challenge is balancing visual appeal with performance. I learned to use transform and opacity for smooth 60fps animations instead of layout-triggering properties. I also implement scroll-based animations and page transitions. The key is keeping animations subtle and purposeful, they should enhance usability, not distract. My portfolio uses various animation techniques for a modern, polished feel.",
      followUp: [
        "Show me your portfolio",
        "What frontend technologies do you use?",
        "Tell me about your UI design approach"
      ]
    }
  },

  // Cybersecurity Application
  {
    keywords: ["cybersecurity", "soc", "security fundamentals", "tryhackme"],
    patterns: [/cybersecurity.*projects/i, /soc.*fundamentals/i, /security.*applied/i, /tryhackme/i],
    response: {
      answer: "My cybersecurity knowledge influences how I build applications. I think about threat models, attack vectors, and defense strategies from the start. The DLKA project applies security concepts by monitoring kernel integrity and detecting tampering. I use cryptographic signing, secure authentication, and data sanitization across projects. My TryHackMe experience taught me about common vulnerabilities like OWASP Top 10, which I actively prevent in my code. Security isn't an afterthought, it's built into my development process from day one.",
      followUp: [
        "Tell me about DLKA System",
        "What security practices do you follow?",
        "What's your TryHackMe rank?"
      ]
    }
  },

  // LeetCode Practice
  {
    keywords: ["leetcode", "competitive", "algorithms", "problem solving", "dsa"],
    patterns: [/leetcode/i, /competitive.*programming/i, /800.*problems/i, /algorithm.*practice/i],
    response: {
      answer: "I've solved over 800 LeetCode problems to sharpen my algorithmic thinking. I focus on understanding patterns rather than memorizing solutions. I practice different categories like arrays, trees, graphs, dynamic programming, and system design. When learning a new concept, I solve multiple related problems to internalize the pattern. This practice helps me write efficient code in real projects. I can quickly identify the right data structure or algorithm for a given problem. It's not just about interviews, it's about becoming a better problem solver.",
      followUp: [
        "How do you apply DSA to projects?",
        "What's your problem-solving approach?",
        "Tell me about your skills"
      ]
    }
  },

  // Applying Algorithms
  {
    keywords: ["apply algorithms", "real-world", "practical use", "dsa projects"],
    patterns: [/apply.*algorithms/i, /real.*world.*dsa/i, /practical.*use/i, /algorithms.*projects/i],
    response: {
      answer: "Algorithmic thinking from competitive programming directly helps in real projects. Graph algorithms help optimize network flows and relationships in systems. Dynamic programming concepts apply to caching and optimization problems. Understanding time complexity helps me write performant code even with large datasets. Hash tables and trees guide my database indexing decisions. The problem-solving approach of breaking down complex problems into smaller subproblems applies everywhere. Competitive programming trained me to think about edge cases and optimization from the start.",
      followUp: [
        "Tell me about your projects",
        "What's your LeetCode profile?",
        "How do you optimize code?"
      ]
    }
  },

  // Learning Approach
  {
    keywords: ["learn", "learning approach", "new technology", "self-taught"],
    patterns: [/how.*learn/i, /learning.*approach/i, /new.*algorithms/i, /teach.*yourself/i],
    response: {
      answer: "I'm a self-motivated learner. When learning something new, I start with documentation and tutorials to understand core concepts. Then I build small projects to apply what I learned. I believe in learning by doing. I read blog posts, watch technical videos, and participate in developer communities. For algorithms, I solve problems incrementally, from easy to hard. I also read other people's code to see different approaches. The key is consistent practice and not being afraid to struggle through challenges. Every bug is a learning opportunity.",
      followUp: [
        "What technologies have you learned recently?",
        "Tell me about your projects",
        "What resources do you recommend?"
      ]
    }
  },

  // Career Goals
  {
    keywords: ["career goals", "future plans", "long-term", "short-term", "aspirations"],
    patterns: [/career.*goals/i, /future.*plans/i, /long.*term/i, /aspirations/i],
    response: {
      answer: "Short-term, I want to join a company where I can work on challenging problems and learn from experienced engineers. I'm interested in full-stack development, system design, and cybersecurity roles. Long-term, I want to become a technical expert who can architect complex systems and mentor others. I'm particularly drawn to building scalable applications and working on security-critical systems. I want to contribute to open source and give back to the developer community. Continuous learning and making meaningful impact drive my career aspirations.",
      followUp: [
        "What kind of roles interest you?",
        "Are you available for opportunities?",
        "What problems interest you?"
      ]
    }
  },

  // Growing Expertise
  {
    keywords: ["continue learning", "growth", "after graduation", "skill development"],
    patterns: [/continue.*learning/i, /after.*graduation/i, /keep.*growing/i, /skill.*development/i],
    response: {
      answer: "I plan to keep growing through hands-on projects, contributing to open source, and staying current with industry trends. I'll continue solving algorithmic problems to maintain my skills. I want to dive deeper into distributed systems, cloud technologies, and advanced security concepts. I learn best by building, so I'll keep creating projects that challenge me. I also plan to share my knowledge through blog posts and maybe technical talks. Technology evolves fast, and I love that there's always something new to learn.",
      followUp: [
        "What technologies interest you?",
        "Tell me about your blog",
        "What are your current projects?"
      ]
    }
  },

  // Problem Interests
  {
    keywords: ["problems", "industries", "interested in", "work on", "domains"],
    patterns: [/kind.*problems/i, /industries.*interested/i, /domains/i, /work.*on/i],
    response: {
      answer: "I'm drawn to problems that have real-world impact. Security-critical systems fascinate me, like my DLKA kernel monitoring project. I'm interested in building scalable platforms that serve many users. Problems in education technology, safety platforms like Femway, and developer tools like Nexterm excite me. I also enjoy working on internal tools that improve team productivity. I prefer challenging technical problems that require deep thinking rather than routine CRUD applications. Any domain where technology makes a meaningful difference interests me.",
      followUp: [
        "Tell me about your projects",
        "What's DLKA System?",
        "What's Femway?"
      ]
    }
  },

  // Collaborative Development
  {
    keywords: ["collaboration", "teamwork", "git workflow", "version control"],
    patterns: [/collaborative/i, /teamwork/i, /git.*workflow/i, /version.*control/i],
    response: {
      answer: "I use Git for version control with clear commit messages and branching strategies. I create feature branches for new work and use pull requests for code review. I write descriptive commit messages that explain the why, not just the what. I'm comfortable resolving merge conflicts and using Git commands. In team settings, I communicate regularly, share progress updates, and ask for help when stuck. I value code reviews as learning opportunities. Good collaboration means clear communication, respecting others' time, and being open to feedback.",
      followUp: [
        "Tell me about your experience",
        "What tools do you use?",
        "How do you handle feedback?"
      ]
    }
  },

  // Documentation
  {
    keywords: ["documentation", "communicate", "document", "readme"],
    patterns: [/documentation/i, /document.*projects/i, /communicate.*design/i, /readme/i],
    response: {
      answer: "I document projects through clear README files explaining setup, features, and architecture. I write inline comments for complex logic and maintain API documentation. For team projects, I use diagrams to communicate system design. I believe good code should be self-documenting with clear naming and structure, but comments help explain the why behind decisions. Documentation isn't just for others, it helps me understand my own code months later. I also create the chatbot knowledge base you're talking to right now as living documentation.",
      followUp: [
        "Show me your GitHub",
        "Tell me about your projects",
        "How do you organize code?"
      ]
    }
  },

  // Handling Deadlines
  {
    keywords: ["deadlines", "pressure", "tight timeline", "requirements change"],
    patterns: [/deadlines/i, /tight.*timeline/i, /pressure/i, /requirements.*change/i],
    response: {
      answer: "I handle deadlines by breaking projects into manageable tasks and prioritizing critical features first. I use the MVP approach, building core functionality before nice-to-haves. When requirements change, I assess the impact and communicate clearly about trade-offs. I stay calm under pressure by focusing on what I can control. I'm not afraid to ask for help or clarification when needed. Good time estimates come from experience, and I'm learning to buffer for unexpected challenges. Flexibility and clear communication are key when things don't go as planned.",
      followUp: [
        "Tell me about your work experience",
        "How do you manage time?",
        "What's your development process?"
      ]
    }
  },

  // Default fallback
  {
    keywords: ["help", "options", "can you", "what can"],
    patterns: [/help/i, /what\s+can\s+you/i, /options/i],
    response: {
      answer: "I can help you learn more about me and my work. You can ask about my background and education, technical skills and expertise, projects I've built, work experience, how to contact me, my blog posts, and my resume or GitHub. Feel free to ask me anything!",
      followUp: [
        "Tell me about yourself",
        "What projects have you built?",
        "What are your skills?",
        "How can I contact you?"
      ]
    }
  }
];

export const defaultResponse: ChatResponse = {
  answer: "I'm not sure I understand that question. Could you rephrase it or ask me about my skills, projects, experience, education, or how to contact me?",
  followUp: [
    "Tell me about yourself",
    "What projects have you built?",
    "What are your skills?",
    "How can I contact you?"
  ]
};

// Function to find the best matching response
export function findBestMatch(userMessage: string): ChatResponse {
  const normalizedMessage = userMessage.toLowerCase().trim();

  // First, try pattern matching
  for (const entry of chatbotKnowledge) {
    for (const pattern of entry.patterns) {
      if (pattern.test(normalizedMessage)) {
        return entry.response;
      }
    }
  }

  // Then, try keyword matching
  const scores = chatbotKnowledge.map(entry => {
    const matchCount = entry.keywords.filter(keyword =>
      normalizedMessage.includes(keyword.toLowerCase())
    ).length;
    return { entry, score: matchCount };
  });

  // Sort by score and return the best match
  scores.sort((a, b) => b.score - a.score);

  if (scores[0] && scores[0].score > 0) {
    return scores[0].entry.response;
  }

  return defaultResponse;
}
