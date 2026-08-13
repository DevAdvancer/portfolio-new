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
  // ==========================================
  // GREETINGS & BASICS
  // ==========================================
  {
    keywords: ["hello", "hi", "hey", "greetings", "good morning", "good afternoon", "good evening", "sup", "yo", "howdy"],
    patterns: [/^(hi|hello|hey|greetings|good\s+(morning|afternoon|evening)|sup|yo|howdy|what'?s?\s*up)/i],
    response: {
      answer: "Hey there! I'm Abhirup's virtual assistant. I can tell you about his skills, projects, experience, personal life, hobbies — basically anything you'd want to know. Fire away!",
      followUp: [
        "Tell me about yourself",
        "What are your hobbies?",
        "What projects have you built?"
      ]
    }
  },
  {
    keywords: ["bye", "goodbye", "see you", "later", "take care", "cya"],
    patterns: [/^(bye|goodbye|see\s*you|later|take\s+care|cya|gotta\s+go)/i],
    response: {
      answer: "It was great talking to you! Feel free to come back anytime. You can also reach Abhirup directly through the contact page. Take care!",
      followUp: [
        "How can I contact you?",
        "What's your email?"
      ]
    }
  },
  {
    keywords: ["how are you", "how's it going", "how you doing"],
    patterns: [/how\s+(are\s+you|is\s+it\s+going|you\s+doing|have\s+you\s+been)/i, /how'?s\s*(it\s+going|everything|life)/i],
    response: {
      answer: "I'm doing great, thanks for asking! I'm always here and ready to chat. Abhirup keeps me well-fed with knowledge. What would you like to know about him?",
      followUp: [
        "Tell me about Abhirup",
        "What's he working on?",
        "What are his hobbies?"
      ]
    }
  },
  {
    keywords: ["thank", "thanks", "appreciate"],
    patterns: [/^(thanks?|thank\s+you|appreciate|thx)/i],
    response: {
      answer: "You're welcome! Glad I could help. If you have any more questions about Abhirup, don't hesitate to ask. You can also reach him directly through the contact page!",
      followUp: [
        "How can I contact you?",
        "Tell me something interesting"
      ]
    }
  },

  // ==========================================
  // ABOUT ME & PERSONAL IDENTITY
  // ==========================================
  {
    keywords: ["about you", "who", "yourself", "introduce yourself", "tell me about you"],
    patterns: [/^who\s+are\s+you/i, /tell\s+me\s+about\s+(you|yourself|abhirup)/i, /^introduce\s+(yourself)?$/i, /^about\s+you/i, /who\s+is\s+abhirup/i],
    response: {
      answer: "I'm Abhirup Kumar — a Software Developer, full-stack engineer, and cybersecurity enthusiast from Kolkata, India. I'm currently working full-time at Vizva Consultancy Services while having recently graduated with a B.Tech in Computer Science from Adamas University (CGPA: 8.68). I love building things that solve real problems, from kernel-level security systems to AI-powered web apps. Outside of code, I'm a curious person who enjoys exploring new tech, gaming, and having deep conversations over chai.",
      followUp: [
        "What are your hobbies?",
        "What kind of person are you?",
        "What are your skills?"
      ]
    }
  },
  {
    keywords: ["kind of person", "personality", "describe yourself", "what type", "character", "temperament"],
    patterns: [/what\s+(kind|type)\s+of\s+person/i, /describe\s+(your|abhirup'?s?)\s*(personality|character|self)/i, /your\s+personality/i, /what\s+are\s+you\s+like/i, /who.*really/i],
    response: {
      answer: "I'd describe myself as curious, driven, and low-key nerdy in the best way. I'm someone who gets genuinely excited about solving problems — whether it's a tricky algorithm or figuring out the best way to organize a project. I'm introverted but warm once you get to know me. I value honesty, loyalty, and deep conversations over small talk. I'm patient, detail-oriented, and I believe in doing things right rather than doing them fast. Friends say I'm the reliable one who'll always show up when it matters.",
      followUp: [
        "What motivates you?",
        "What are your values?",
        "How do you handle stress?"
      ]
    }
  },
  {
    keywords: ["age", "old", "born", "birthday", "dob", "date of birth"],
    patterns: [/how\s+old/i, /your\s+age/i, /when.*born/i, /birthday/i, /date\s+of\s+birth/i, /dob/i],
    response: {
      answer: "I was born in 2004, so I'm in my early 20s! I'm from Tarakeswar, a small town near Kolkata in West Bengal, India. Young, hungry to learn, and already working full-time as a Software Developer.",
      followUp: [
        "Where are you from?",
        "Tell me about your education",
        "What are you working on?"
      ]
    }
  },
  {
    keywords: ["where from", "hometown", "city", "location", "live", "based", "country", "state"],
    patterns: [/where\s+(are\s+you\s+from|do\s+you\s+live|are\s+you\s+based|is\s+your\s+hometown)/i, /which\s+(city|state|country)/i, /your\s+(location|hometown|city)/i],
    response: {
      answer: "I'm from Tarakeswar, a small town near Kolkata in West Bengal, India. It's a peaceful place — great for focused work! I did my college at Adamas University in Kolkata, and I currently work remotely as a Software Developer. Kolkata has a special place in my heart — the culture, the food (especially the street food!), and the warmth of the people.",
      followUp: [
        "What's your favorite food?",
        "Tell me about your education",
        "Do you like Kolkata?"
      ]
    }
  },
  {
    keywords: ["family", "parents", "siblings", "brother", "sister", "mom", "dad", "mother", "father"],
    patterns: [/your\s+(family|parents|siblings|brother|sister)/i, /tell.*about.*family/i, /do\s+you\s+have\s+(siblings|brothers|sisters)/i, /about.*mom|about.*dad/i],
    response: {
      answer: "Family is really important to me. I come from a middle-class family in Tarakeswar, and they've been incredibly supportive of my career in tech. They may not fully understand what 'kernel attestation systems' means, but they're always proud and encouraging. That support system is a big part of why I push myself to do better every day.",
      followUp: [
        "What motivates you?",
        "Tell me about yourself",
        "Where are you from?"
      ]
    }
  },
  {
    keywords: ["values", "believe", "principle", "important to you", "matters", "philosophy"],
    patterns: [/your\s+values/i, /what\s+do\s+you\s+(believe|value)/i, /what'?s?\s+important\s+to\s+you/i, /life\s+philosophy/i, /principles/i, /what\s+matters/i],
    response: {
      answer: "I believe in honesty, continuous learning, and doing meaningful work. I value loyalty in relationships and consistency in work. I think everyone should build something that outlasts them — whether it's code, knowledge, or kindness. I also strongly believe that your background shouldn't limit your ambitions. Coming from a small town, I've learned that hard work and curiosity can take you anywhere.",
      followUp: [
        "What motivates you?",
        "What's your biggest achievement?",
        "What kind of person are you?"
      ]
    }
  },
  {
    keywords: ["languages", "speak", "bengali", "hindi", "english", "language"],
    patterns: [/what\s+languages?\s+do\s+you\s+speak/i, /do\s+you\s+speak\s+(hindi|bengali|english)/i, /your\s+(spoken|natural)\s+languages?/i, /mother\s+tongue/i],
    response: {
      answer: "I speak Bengali (my mother tongue), Hindi, and English fluently. Bengali is what I speak at home, Hindi with most friends, and English is my professional and technical language. Being multilingual helps me connect with a diverse range of people!",
      followUp: [
        "Where are you from?",
        "Tell me about yourself",
        "What are your hobbies?"
      ]
    }
  },

  // ==========================================
  // HOBBIES, INTERESTS & LIFESTYLE
  // ==========================================
  {
    keywords: ["hobbies", "hobby", "free time", "spare time", "pastime", "leisure", "fun", "outside work", "outside coding"],
    patterns: [/your\s+hobb(y|ies)/i, /what\s+do\s+you\s+do\s+(for\s+fun|in\s+your?\s+(free|spare)\s+time)/i, /outside\s+(of\s+)?(work|coding|programming)/i, /leisure/i, /pastime/i, /free\s+time/i],
    response: {
      answer: "When I'm not coding, I enjoy gaming, watching tech videos and documentaries, exploring new tools and frameworks just for fun, and listening to music. I also love having deep conversations about tech, life, and ideas with friends over chai. I occasionally binge anime and sci-fi shows too. Honestly, tech is both my work and hobby — I genuinely enjoy tinkering with new projects even in my downtime!",
      followUp: [
        "What games do you play?",
        "What music do you listen to?",
        "Do you watch anime?"
      ]
    }
  },
  {
    keywords: ["game", "gaming", "gamer", "play", "video game", "favorite game"],
    patterns: [/do\s+you\s+(play|game|like)\s+games?/i, /fav(ou?rite)?\s+game/i, /gaming/i, /what\s+games?/i, /gamer/i, /video\s+games?/i],
    response: {
      answer: "Yes, I'm a casual gamer! I enjoy story-driven games and sometimes competitive ones to unwind. Gaming taught me a lot about strategic thinking, patience, and problem-solving under pressure — skills that actually transfer to coding. It's a great way to switch off from work mode while still keeping my brain engaged.",
      followUp: [
        "What are your other hobbies?",
        "How do you relax?",
        "Are you competitive?"
      ]
    }
  },
  {
    keywords: ["music", "song", "listen", "favorite music", "genre", "playlist"],
    patterns: [/what\s+(music|songs?)\s+do\s+you\s+(like|listen)/i, /fav(ou?rite)?\s+(music|song|genre|artist|band)/i, /what.*listen\s+to/i, /music\s+(taste|preference)/i, /playlist/i],
    response: {
      answer: "I have pretty eclectic taste in music! I listen to a mix of lo-fi beats while coding, Bollywood songs when I'm in a chill mood, and some hip-hop and pop. Lo-fi is basically my coding soundtrack — it helps me get into the zone. Music is a big part of my daily routine, there's always something playing in the background.",
      followUp: [
        "What are your hobbies?",
        "Are you a morning or night person?",
        "What does your daily routine look like?"
      ]
    }
  },
  {
    keywords: ["movie", "film", "watch", "favorite movie", "tv show", "series", "anime", "netflix"],
    patterns: [/fav(ou?rite)?\s+(movie|film|show|series|anime)/i, /what.*watch/i, /movie.*recommend/i, /do\s+you\s+watch\s+(anime|movies?|shows?|series)/i, /netflix/i, /tv\s+show/i],
    response: {
      answer: "I enjoy watching sci-fi, thriller, and tech-related content. I'm also into anime — there's something about the storytelling and creativity that I really appreciate. For shows, I like ones with clever plots and good character development. I also watch a lot of tech YouTube channels and documentaries about cybersecurity and engineering. It's learning disguised as entertainment!",
      followUp: [
        "What are your hobbies?",
        "What inspires you?",
        "Do you play games?"
      ]
    }
  },
  {
    keywords: ["food", "eat", "favorite food", "cuisine", "cook", "cooking", "biryani", "street food"],
    patterns: [/fav(ou?rite)?\s+(food|cuisine|dish|meal)/i, /what\s+do\s+you\s+(eat|like\s+to\s+eat)/i, /do\s+you\s+cook/i, /food\s+(preference|lover)/i, /street\s+food/i, /biryani/i, /foodie/i],
    response: {
      answer: "I'm a total foodie! Being from Kolkata, I love Bengali cuisine — fish curry, mishti doi, and rosogolla are classics. I'm also a huge biryani fan (Kolkata biryani with the potato is *chef's kiss*). Street food like phuchka (pani puri) and kathi rolls are my go-to comfort food. I can cook basic stuff for survival, but I'd much rather eat good food than make it. Chai is non-negotiable — it fuels my coding sessions!",
      followUp: [
        "Where are you from?",
        "What's your daily routine?",
        "Coffee or tea?"
      ]
    }
  },
  {
    keywords: ["coffee", "tea", "chai", "drink", "beverage"],
    patterns: [/coffee\s+or\s+tea/i, /tea\s+or\s+coffee/i, /do\s+you\s+drink\s+(coffee|tea|chai)/i, /chai/i, /fav(ou?rite)?\s+(drink|beverage)/i],
    response: {
      answer: "Chai, no contest! I'm a chai person through and through. A hot cup of masala chai is what gets me through late-night coding sessions. Coffee is fine occasionally, but chai is where my heart is. It's basically a Bengali programmer's fuel!",
      followUp: [
        "What's your favorite food?",
        "Are you a night owl?",
        "What are your hobbies?"
      ]
    }
  },
  {
    keywords: ["morning person", "night owl", "night person", "early bird", "sleep", "routine", "daily routine", "schedule"],
    patterns: [/morning\s+(person|bird)/i, /night\s+(owl|person)/i, /early\s+bird/i, /daily\s+routine/i, /your\s+(routine|schedule)/i, /when\s+do\s+you\s+(wake|sleep|work|code)/i, /sleep\s+(schedule|routine|habit)/i],
    response: {
      answer: "Definitely a night owl! My best coding happens late at night when everything is quiet. I usually work on personal projects and deep-focus tasks after 10 PM. Mornings are for meetings and lighter work. My typical day involves work during the day, learning or side projects in the evening, and creative problem-solving at night with chai in hand. I'm working on getting better at mornings though — it's a work in progress!",
      followUp: [
        "How do you manage your time?",
        "What are you working on?",
        "Do you drink coffee or tea?"
      ]
    }
  },
  {
    keywords: ["book", "reading", "read", "favorite book", "recommend"],
    patterns: [/do\s+you\s+(read|like)\s+books?/i, /fav(ou?rite)?\s+book/i, /reading\s+habit/i, /book.*recommend/i, /what.*reading/i],
    response: {
      answer: "I read more technical content than fiction, honestly. I follow a lot of engineering blogs, documentation, and tech articles. When it comes to books, I enjoy ones about technology, productivity, and startup culture. I also read about cybersecurity topics. Documentation and open-source codebases are my 'books' — I learn a lot by reading how other developers build things.",
      followUp: [
        "How do you learn new things?",
        "What are your hobbies?",
        "What inspires you?"
      ]
    }
  },
  {
    keywords: ["travel", "traveling", "visited", "trip", "places", "explore"],
    patterns: [/do\s+you\s+(like\s+to\s+)?travel/i, /places?\s+(you'?ve?\s+)?visited/i, /fav(ou?rite)?\s+(place|destination)/i, /dream\s+destination/i, /travel/i],
    response: {
      answer: "I haven't traveled extensively yet, but I'd love to explore more! Being from a small town near Kolkata, I appreciate both the peace of small places and the energy of big cities. I'd love to visit tech hubs like Bangalore, and internationally, places like San Francisco, Tokyo, or Berlin. For now, I explore the world through tech — working with people and ideas from everywhere.",
      followUp: [
        "Where are you from?",
        "What are your goals?",
        "What are your hobbies?"
      ]
    }
  },
  {
    keywords: ["fitness", "exercise", "workout", "gym", "sport", "sports", "health"],
    patterns: [/do\s+you\s+(work\s*out|exercise|go\s+to.*gym|play.*sport)/i, /fitness/i, /gym/i, /sport/i, /health/i, /stay\s+fit/i],
    response: {
      answer: "I'm not a hardcore gym person, but I do try to stay active. Long coding sessions can be tough on the body, so I take walks, do some basic exercises, and try to maintain good posture. I believe in keeping a healthy balance — a healthy body supports a productive mind. It's something I'm actively trying to improve!",
      followUp: [
        "How do you handle stress?",
        "What's your daily routine?",
        "What are your hobbies?"
      ]
    }
  },
  {
    keywords: ["pet", "dog", "cat", "animal", "pets"],
    patterns: [/do\s+you\s+have\s+(a\s+)?(pet|dog|cat)/i, /pets?/i, /animal\s+lover/i, /like\s+(dogs?|cats?|animals?)/i],
    response: {
      answer: "I love animals! I'm more of a dog person — their loyalty and energy are infectious. I don't currently have a pet, but it's definitely something I'd love in the future when I have a more settled lifestyle. For now, I adopt the stray dogs in my neighborhood with treats and attention.",
      followUp: [
        "What kind of person are you?",
        "What are your hobbies?",
        "Where do you live?"
      ]
    }
  },

  // ==========================================
  // DATING, RELATIONSHIPS & PERSONAL LIFE
  // ==========================================
  {
    keywords: ["single", "relationship", "girlfriend", "dating", "date", "love life", "partner", "married", "relationship status"],
    patterns: [/are\s+you\s+single/i, /relationship\s+status/i, /do\s+you\s+have\s+a\s+(girlfriend|partner|gf)/i, /dating/i, /love\s+life/i, /are\s+you\s+(married|taken|dating)/i, /your\s+(girlfriend|partner|gf)/i],
    response: {
      answer: "I'm single and yes, I'm open to dating! I value deep conversations, honesty, and genuine connections. If you're interested or want to get to know me better, feel free to reach out through the contact page or call/text me at 8250772855. I'd love to chat!",
      followUp: [
        "What kind of person are you?",
        "What do you look for in a partner?",
        "How can I contact you?"
      ]
    }
  },
  {
    keywords: ["ideal partner", "type", "look for", "girl", "kind of girl", "kind of partner", "what do you like in a person"],
    patterns: [/ideal\s+(partner|person|girl|type)/i, /what\s+do\s+you\s+look\s+for/i, /your\s+type/i, /kind\s+of\s+(girl|person|partner)/i, /what.*attract/i],
    response: {
      answer: "I appreciate someone who's genuine, curious, and has their own ambitions. Intelligence is attractive — I love someone who can hold deep conversations about anything, from technology to philosophy to random 2 AM thoughts. Kindness and a good sense of humor go a long way. I don't care much about superficial things; I value connection, mutual respect, and someone who understands that I might sometimes disappear into a coding rabbit hole!",
      followUp: [
        "What kind of person are you?",
        "What are your values?",
        "What are your hobbies?"
      ]
    }
  },
  {
    keywords: ["friends", "friendship", "social", "social life", "introverted", "extroverted", "introvert", "extrovert"],
    patterns: [/your\s+friends?/i, /social\s+life/i, /are\s+you\s+(introverted|extroverted|an?\s+(introvert|extrovert))/i, /do\s+you\s+have\s+(many\s+)?friends?/i, /friendship/i, /social\s+circle/i],
    response: {
      answer: "I'm an introvert who opens up a lot with the right people. I have a small circle of close friends rather than a large group of acquaintances. Quality over quantity! My friends are mostly from college and the tech community. We bond over code, gaming sessions, late-night discussions, and food. I'm the kind of friend who might not text every day but will always show up when it matters.",
      followUp: [
        "What kind of person are you?",
        "What are your hobbies?",
        "How do you spend your free time?"
      ]
    }
  },
  {
    keywords: ["fun fact", "interesting", "something interesting", "don't know about you", "surprising", "secret", "random fact"],
    patterns: [/fun\s+fact/i, /something\s+interesting/i, /tell\s+me\s+something\s+(I\s+)?don'?t\s+know/i, /surprise\s+me/i, /random\s+fact/i, /secret/i, /something\s+(cool|unique|random|surprising)/i],
    response: {
      answer: "Fun fact: I've solved over 800 LeetCode problems — that's more problems than most people solve in their entire coding journey! Also, one of my projects (DLKA) literally works at the Linux kernel level, which means I've written code that runs at the deepest layer of the operating system. Oh, and I ranked 849 globally in TryHackMe's HackfinityBattle hackathon. When I'm not doing all that, you'll probably find me sipping chai at midnight while debugging some random issue.",
      followUp: [
        "Tell me about DLKA",
        "What's your LeetCode journey?",
        "Tell me about HackfinityBattle"
      ]
    }
  },
  {
    keywords: ["joke", "funny", "make me laugh", "humor"],
    patterns: [/tell\s+(me\s+)?a\s+joke/i, /something\s+funny/i, /make\s+me\s+laugh/i, /humor/i, /^joke$/i],
    response: {
      answer: "Why do programmers prefer dark mode? Because light attracts bugs! 🐛 Okay okay, here's another one: I told my friend I'm building an AI chatbot. He asked if it's intelligent. I said, 'Well, it knows more about me than I do.' That's... actually true for this chatbot. Ask me anything!",
      followUp: [
        "Tell me something interesting",
        "What are your hobbies?",
        "What kind of person are you?"
      ]
    }
  },

  // ==========================================
  // MOTIVATION, INSPIRATION & MINDSET
  // ==========================================
  {
    keywords: ["motivate", "motivation", "drive", "what drives you", "why do you code", "passion", "inspired"],
    patterns: [/what\s+(motivates?|drives?|inspires?)\s+you/i, /why\s+do\s+you\s+(code|program|develop)/i, /your\s+(motivation|passion|drive)/i, /what\s+keeps\s+you\s+going/i, /source\s+of\s+(motivation|inspiration)/i],
    response: {
      answer: "What drives me is the ability to create something from nothing. Writing code that solves real problems gives me a rush. Coming from a small town, I'm motivated to prove that your background doesn't define your potential. Every project I build, every problem I solve, is a step forward. I'm also motivated by the tech community — seeing what others build inspires me to push my limits. And honestly, the thought of building something that could help thousands of people keeps me up at night (in a good way).",
      followUp: [
        "What are your goals?",
        "What's your biggest achievement?",
        "What are your values?"
      ]
    }
  },
  {
    keywords: ["role model", "idol", "look up to", "inspiration person", "admire", "mentor"],
    patterns: [/role\s+model/i, /who\s+do\s+you\s+(look\s+up\s+to|admire|idolize)/i, /your\s+(idol|inspiration|mentor)/i, /who\s+inspires?\s+you/i, /someone\s+you\s+admire/i],
    response: {
      answer: "I don't have a single idol, but I deeply admire people who build things that impact millions — engineers at companies like Google, open-source contributors, and indie hackers who turn ideas into products. I admire Linus Torvalds for creating Linux (which I literally work with at the kernel level), and the overall open-source community for making knowledge accessible. Closer to home, my parents inspire me with their hard work and sacrifice.",
      followUp: [
        "What motivates you?",
        "Why did you choose CS?",
        "Tell me about your values"
      ]
    }
  },
  {
    keywords: ["quote", "favorite quote", "motto", "life motto", "mantra"],
    patterns: [/fav(ou?rite)?\s+(quote|motto|saying)/i, /life\s+motto/i, /mantra/i, /live\s+by/i, /a\s+quote/i],
    response: {
      answer: "One quote I really resonate with is: 'The best way to predict the future is to create it.' I believe in taking action rather than waiting for things to happen. In tech especially, the people who build things are the ones who shape the future. Another one I like: 'Stay hungry, stay foolish' — it reminds me to keep learning and never assume I know enough.",
      followUp: [
        "What motivates you?",
        "What are your values?",
        "What are your goals?"
      ]
    }
  },
  {
    keywords: ["advice", "tip", "advice for beginners", "suggestion", "recommend for beginners"],
    patterns: [/advice\s+for\s+(beginners?|students?|new\s+developers?)/i, /tip\s+for/i, /any\s+advice/i, /what.*advice.*give/i, /recommend.*start/i, /how\s+to\s+start\s+(coding|programming)/i],
    response: {
      answer: "My advice: just start building! Don't get stuck in tutorial hell — pick a project and figure it out as you go. Start with something simple, and slowly increase complexity. Consistency beats intensity — coding for 1 hour daily is better than 10 hours once a week. Learn Git early, read other people's code, and don't be afraid to break things. Also, solve problems on LeetCode regularly — it builds a problem-solving mindset that helps everywhere. And most importantly, be patient with yourself. Every expert was once a beginner.",
      followUp: [
        "How do you learn new things?",
        "What's your LeetCode journey?",
        "What technologies should I learn?"
      ]
    }
  },
  {
    keywords: ["dream", "bucket list", "aspiration", "wish", "dream project", "dream company"],
    patterns: [/your\s+dream/i, /bucket\s+list/i, /dream\s+(job|company|project|role)/i, /if\s+you\s+could\s+(do|build|work)/i, /ultimate\s+goal/i],
    response: {
      answer: "My dream is to build a product that millions of people use daily. I'd love to work on something at the intersection of security and developer tools — making the internet safer while making developers more productive. Long-term, I want to build my own tech startup. Dream company? Anywhere that lets me solve hard problems with smart people — whether that's a FAANG company, a cutting-edge startup, or my own venture. I also dream of contributing to open-source projects that shape the industry.",
      followUp: [
        "What are your career goals?",
        "What motivates you?",
        "What kind of problems interest you?"
      ]
    }
  },

  // ==========================================
  // RECRUITER & BEHAVIORAL QUESTIONS
  // ==========================================
  {
    keywords: ["hire", "why should we hire", "why you", "what makes you different", "stand out", "unique", "differentiator"],
    patterns: [/why\s+should\s+(we|i)\s+hire\s+you/i, /what\s+makes\s+you\s+(different|unique|special|stand\s+out)/i, /why\s+you\s+(over|instead)/i, /what\s+sets\s+you\s+apart/i, /convince\s+me/i, /sell\s+yourself/i],
    response: {
      answer: "Three things set me apart: First, I have range — I've built everything from Linux kernel modules in C to AI-powered web apps with Next.js. Most developers specialize in one area; I'm comfortable across the entire stack and even at the systems level. Second, I'm a proven problem solver with 800+ LeetCode problems and projects that demonstrate real complexity, not just CRUD apps. Third, I ship — every project I've built is deployed, documented, and solving real problems. I don't just write code; I build products. Plus, I bring a security-first mindset from my cybersecurity background, which is increasingly valuable in any team.",
      followUp: [
        "Tell me about your projects",
        "What are your skills?",
        "Tell me about a challenge you faced"
      ]
    }
  },
  {
    keywords: ["weakness", "biggest weakness", "area of improvement", "improve", "shortcoming", "flaw"],
    patterns: [/your\s+(biggest\s+)?weakness/i, /area.*(improvement|improve)/i, /what.*work\s+on.*yourself/i, /shortcoming/i, /where\s+do\s+you\s+(need\s+to|want\s+to)\s+improve/i, /flaw/i],
    response: {
      answer: "Honestly, I sometimes go too deep into perfecting things. I can spend hours optimizing code that's already good enough, when I should be moving on to the next feature. I'm actively working on balancing quality with pragmatism — knowing when 'good enough' is actually good enough. Another area I'm improving is public speaking and presenting my work. I'm great at building things but I want to get better at showcasing them. That's partly why I built this portfolio — to practice putting my work out there.",
      followUp: [
        "What are your strengths?",
        "How do you handle feedback?",
        "Tell me about a challenge you faced"
      ]
    }
  },
  {
    keywords: ["challenge", "difficult", "hardest", "tough", "obstacle", "struggle", "overcame"],
    patterns: [/biggest\s+challenge/i, /most\s+difficult/i, /hardest\s+(thing|project|problem)/i, /challenge.*faced/i, /tell.*about.*time.*difficult/i, /obstacle.*overcame/i, /struggle/i, /tough\s+(time|situation|project)/i],
    response: {
      answer: "The DLKA kernel attestation project was my biggest technical challenge. Working at the Linux kernel level means one wrong move can crash the entire system — there's no 'undo.' I had to learn Netlink protocol, loadable kernel modules, and cryptographic verification from scratch. There were weeks where nothing worked and documentation was sparse. What got me through was breaking the problem into tiny pieces and tackling them one at a time. The moment the distributed consensus engine worked for the first time was one of the most satisfying moments of my life.",
      followUp: [
        "Tell me about DLKA",
        "How do you solve problems?",
        "What did you learn from it?"
      ]
    }
  },
  {
    keywords: ["failure", "failed", "mistake", "regret", "wrong", "messed up", "lesson learned"],
    patterns: [/tell.*about.*time.*fail/i, /biggest\s+(failure|mistake|regret)/i, /have\s+you\s+(ever\s+)?failed/i, /what.*learn.*from.*mistake/i, /something.*went\s+wrong/i, /messed\s+up/i],
    response: {
      answer: "Early in my journey, I spent months building a project without proper planning or version control. When my laptop had issues, I lost a significant amount of work. That was a painful lesson that taught me the importance of Git, backups, and planning before coding. I also initially struggled with imposter syndrome — comparing myself to developers with years of experience. I've learned that everyone has their own timeline, and the best thing I can do is focus on my own growth. Every failure has taught me something that made me a better developer.",
      followUp: [
        "How do you handle setbacks?",
        "What motivates you?",
        "Tell me about your strengths"
      ]
    }
  },
  {
    keywords: ["stress", "pressure", "handle stress", "cope", "burnout", "overwhelmed", "anxious"],
    patterns: [/how\s+do\s+you\s+(handle|deal\s+with|cope\s+with|manage)\s+(stress|pressure)/i, /when\s+(you'?re?\s+)?(stressed|overwhelmed|anxious)/i, /burnout/i, /under\s+pressure/i, /stressful\s+situation/i],
    response: {
      answer: "When I'm stressed, I step away from the screen. Seriously — sometimes the best debugging happens during a walk or over a cup of chai. I break big problems into smaller, manageable tasks so they feel less overwhelming. I also listen to music, play games, or just talk to friends. I've learned that pushing through exhaustion doesn't produce good code. I try to maintain a sustainable pace rather than burning out with intense bursts. If I'm stuck on a problem, I sleep on it — the solution often clicks the next morning.",
      followUp: [
        "How do you manage your time?",
        "What are your hobbies?",
        "What's your daily routine?"
      ]
    }
  },
  {
    keywords: ["feedback", "criticism", "constructive", "code review", "handle criticism"],
    patterns: [/how\s+do\s+you\s+(handle|take|receive|deal\s+with)\s+(feedback|criticism)/i, /code\s+review/i, /constructive\s+(criticism|feedback)/i, /someone\s+criticizes/i],
    response: {
      answer: "I genuinely welcome feedback — it's the fastest way to improve. During code reviews at Vizva, I see every comment as a learning opportunity, not a personal attack. I ask clarifying questions to understand the 'why' behind suggestions. When I disagree, I explain my reasoning respectfully and stay open to being convinced. I've found that the best code comes from collaboration, not ego. Getting feedback from experienced developers has been one of the most valuable parts of working in a team.",
      followUp: [
        "Tell me about your work experience",
        "How do you collaborate?",
        "What are your strengths?"
      ]
    }
  },
  {
    keywords: ["conflict", "disagreement", "difficult coworker", "team conflict", "argue"],
    patterns: [/how\s+do\s+you\s+(handle|deal\s+with|resolve)\s+(conflict|disagreement)/i, /difficult\s+(coworker|teammate|colleague)/i, /disagree\s+with\s+(a\s+)?(team|colleague)/i, /conflict\s+resolution/i],
    response: {
      answer: "I handle disagreements by focusing on the problem, not the person. If there's a technical disagreement, I like to discuss the pros and cons objectively — maybe even prototype both approaches. I listen first to understand the other person's perspective before presenting mine. In most cases, the best solution is a combination of ideas. If we truly can't agree, I'm comfortable deferring to the team lead or using data/benchmarks to make the decision. I've never had a major conflict because I prioritize respect and open communication.",
      followUp: [
        "Tell me about your teamwork skills",
        "How do you handle feedback?",
        "What's your work style?"
      ]
    }
  },
  {
    keywords: ["leadership", "lead", "leader", "manage team", "led a team"],
    patterns: [/leadership\s+(experience|style|quality)/i, /have\s+you\s+(ever\s+)?led/i, /lead\s+(a\s+)?team/i, /management\s+style/i, /are\s+you\s+a\s+leader/i],
    response: {
      answer: "At HERMEiAS, I served as Lead Software Developer, which meant I was responsible for architectural decisions, task distribution, and ensuring code quality across the team's projects. My leadership style is collaborative — I believe in empowering team members rather than micromanaging. I lead by example, writing clean code and being the first to tackle hard problems. I also mentor juniors by explaining the 'why' behind decisions, not just the 'how.' I think good leaders create an environment where everyone can do their best work.",
      followUp: [
        "Tell me about your experience at HERMEiAS",
        "How do you handle conflict?",
        "What are your strengths?"
      ]
    }
  },
  {
    keywords: ["work style", "work preference", "remote", "office", "hybrid", "work environment", "ideal work", "work culture"],
    patterns: [/work\s+style/i, /(remote|office|hybrid)/i, /ideal\s+work\s+(environment|culture)/i, /prefer.*(remote|office|in-person)/i, /work.*preference/i, /type\s+of\s+company/i, /work\s+culture/i],
    response: {
      answer: "I work well in both remote and office settings. Currently, I'm working remotely and I love the flexibility and deep focus it allows. My ideal environment is one with clear communication, async-friendly workflows, and freedom to make technical decisions. I thrive in teams that value quality over speed, encourage learning, and have a strong engineering culture. I don't like unnecessary meetings — give me clear goals, good documentation, and autonomy, and I'll deliver great work.",
      followUp: [
        "Tell me about your current role",
        "How do you collaborate with teams?",
        "What motivates you?"
      ]
    }
  },
  {
    keywords: ["salary", "compensation", "pay", "money", "expect", "ctc", "package"],
    patterns: [/salary\s+(expectation|range|requirement)/i, /how\s+much\s+do\s+you\s+(expect|want)/i, /compensation/i, /expected\s+(ctc|package|pay)/i, /money/i],
    response: {
      answer: "I believe in fair compensation that reflects the value I bring. Rather than throwing out a number, I'd prefer to understand the role, responsibilities, and impact first. I'm more interested in growth opportunities, challenging work, and a good team than just the paycheck. That said, I do my market research and expect compensation that aligns with my skills and experience. I'm currently employed full-time, so any opportunity would need to be compelling both technically and financially.",
      followUp: [
        "What's your current role?",
        "What kind of roles interest you?",
        "What are your career goals?"
      ]
    }
  },
  {
    keywords: ["why cs", "why computer science", "why programming", "why tech", "why software", "how did you start"],
    patterns: [/why\s+(did\s+you\s+choose\s+)?(cs|computer\s+science|programming|tech|software)/i, /how\s+did\s+you\s+(start|get\s+into)\s+(coding|programming|tech)/i, /what\s+got\s+you\s+into/i, /why\s+engineering/i],
    response: {
      answer: "I got hooked on tech through pure curiosity. As a kid, I was always the one taking things apart to understand how they worked. When I discovered programming, it felt like I unlocked a superpower — I could build anything I could imagine. Choosing Computer Science was natural because it combined logic, creativity, and endless possibilities. The moment I wrote my first program that actually ran, I knew this was my path. What keeps me here is that there's always something new to learn and build.",
      followUp: [
        "Tell me about your education",
        "What are your career goals?",
        "What motivates you?"
      ]
    }
  },
  {
    keywords: ["where do you see yourself", "five years", "5 years", "future", "long term goal", "10 years"],
    patterns: [/where\s+do\s+you\s+see\s+yourself/i, /(5|five|ten|10)\s+years/i, /future\s+plans/i, /long[\s-]term\s+goal/i, /in\s+the\s+future/i],
    response: {
      answer: "In 5 years, I see myself as a senior engineer or tech lead, building systems that scale and mentoring the next generation of developers. I want to have deep expertise in system design and security while staying hands-on with code. I might be at a top tech company, at a promising startup, or even building my own venture. In 10 years, I want to be known for building something impactful — whether that's a product, an open-source tool, or a company. The tech world moves fast, and I plan to move with it.",
      followUp: [
        "What motivates you?",
        "What kind of problems interest you?",
        "Tell me about your current role"
      ]
    }
  },
  {
    keywords: ["biggest achievement", "proudest moment", "accomplishment", "proud of", "achievement"],
    patterns: [/biggest\s+achievement/i, /proud(est)?\s+(moment|of)/i, /accomplishment/i, /what\s+are\s+you\s+most\s+proud\s+of/i, /greatest\s+achievement/i],
    response: {
      answer: "I'm most proud of a few things: Building the DLKA kernel attestation system — it's genuinely complex and works at the deepest level of the operating system. Solving 800+ LeetCode problems through sheer consistency. Landing a full-time role as a Software Developer while still finishing my degree. And ranking 849 globally in TryHackMe's HackfinityBattle. But honestly, the thing I'm most proud of is my growth — from a curious kid in a small town to a developer who can build production-grade systems across the full stack.",
      followUp: [
        "Tell me about DLKA",
        "What's your LeetCode journey?",
        "Tell me about your experience"
      ]
    }
  },
  {
    keywords: ["team player", "teamwork", "collaboration", "collaborate", "work with others", "team"],
    patterns: [/team\s+player/i, /teamwork/i, /work\s+with\s+others/i, /collaboration/i, /team\s+experience/i, /how.*work\s+in\s+a\s+team/i],
    response: {
      answer: "I'm definitely a team player. At both HERMEiAS and Vizva, I work closely with designers, other developers, and product stakeholders. I believe in clear communication, shared ownership, and lifting others up. I use Git branching workflows, participate actively in code reviews, and document my work so others can build on it. I've learned that the best software is built by teams that trust each other and communicate openly. I'm the kind of teammate who'll stay late to help debug someone else's issue.",
      followUp: [
        "Tell me about your work experience",
        "How do you handle conflict?",
        "What's your leadership style?"
      ]
    }
  },

  // ==========================================
  // HACKATHON & COMPETITIONS
  // ==========================================
  {
    keywords: ["hackathon", "hack", "competition", "compete", "contest", "participated"],
    patterns: [/hackathon/i, /have\s+you\s+(done|participated|competed)/i, /competition/i, /coding\s+contest/i, /hack\s+event/i, /competed/i],
    response: {
      answer: "Yes! I participated in TryHackMe's HackfinityBattle, which was a global cybersecurity hackathon involving Capture The Flag challenges across multiple rooms. I ranked 849 globally, which was a great experience. CTF competitions test your ability to think creatively under pressure — finding vulnerabilities, cracking codes, and solving puzzles against the clock. I've also participated in coding contests and university-level competitions. Hackathons are amazing because they push you to build fast, think on your feet, and collaborate intensely.",
      followUp: [
        "Tell me about HackfinityBattle",
        "What's CTF?",
        "Do you plan to do more hackathons?"
      ]
    }
  },
  {
    keywords: ["hackfinity", "hackfinitybattle", "ctf", "capture the flag", "tryhackme competition"],
    patterns: [/hackfinity/i, /capture\s+the\s+flag/i, /ctf/i, /tryhackme.*competition/i, /tryhackme.*hackathon/i],
    response: {
      answer: "HackfinityBattle was a global cybersecurity hackathon organized by TryHackMe. It involved Capture The Flag (CTF) challenges across multiple rooms — each room had different security challenges like web exploitation, cryptography, reverse engineering, and network analysis. I ranked 849 globally, competing against thousands of security enthusiasts worldwide. It was intense, educational, and addictive. CTF competitions are one of the best ways to learn cybersecurity because they force you to think like an attacker to find vulnerabilities.",
      followUp: [
        "What's your cybersecurity experience?",
        "Do you plan to do more CTFs?",
        "Tell me about your achievements"
      ]
    }
  },
  {
    keywords: ["more hackathons", "plan hackathon", "next competition", "future hackathon"],
    patterns: [/plan.*hackathon/i, /more\s+(hackathon|ctf|competition)/i, /next\s+(hackathon|competition|ctf)/i, /future.*hackathon/i, /do.*more.*hackathon/i],
    response: {
      answer: "Absolutely! I want to participate in more hackathons and CTF competitions. They're some of the best learning experiences — you build fast, learn new technologies under pressure, and meet amazing people. I'm particularly interested in cybersecurity CTFs and full-stack development hackathons. I'd also love to participate in larger ones like HackMIT, ETHGlobal, or MLH events. Hackathons push you out of your comfort zone, and that's where the best growth happens.",
      followUp: [
        "Tell me about HackfinityBattle",
        "What are your goals?",
        "What interests you?"
      ]
    }
  },

  // ==========================================
  // SKILLS & TECHNICAL
  // ==========================================
  {
    keywords: ["skills", "technologies", "tech stack", "programming languages", "what can you do", "expertise"],
    patterns: [/your\s+skills/i, /what.*skills/i, /tech\s+stack/i, /your\s+technologies/i, /programming\s+languages/i, /tell.*about.*skills/i, /technical.*skills/i],
    response: {
      answer: "I have advanced skills in Python, JavaScript, React, Node.js, and MySQL. I also work with TypeScript, Java, C, Next.js, and Tailwind CSS. For databases, I use Supabase, MongoDB, and PostgreSQL. I'm comfortable with Git, Linux, VS Code, and Cursor. My expertise includes Full Stack Development, Data Structures and Algorithms, REST APIs, Flutter Development, and Cybersecurity basics. I'm also experienced with Rust for systems programming.",
      followUp: [
        "What projects have you built?",
        "Tell me about your experience",
        "What frameworks do you use?"
      ]
    }
  },
  {
    keywords: ["favorite technology", "favorite language", "prefer", "most enjoy", "best technology", "go-to"],
    patterns: [/fav(ou?rite)?\s+(technology|language|framework|tool|stack)/i, /what\s+do\s+you\s+(prefer|enjoy\s+most)/i, /go-?to\s+(language|stack|framework)/i, /most\s+(comfortable|proficient)/i],
    response: {
      answer: "My go-to stack is React + TypeScript + Tailwind CSS + Supabase — it's incredibly productive for building full-stack apps. For language, I'd say JavaScript/TypeScript is what I use most, but Python is my comfort language for quick scripts and backend work. I have a soft spot for Rust though — it's challenging but rewarding, and building Nexterm in it was one of my best experiences. Honestly, I love learning new tools. The 'favorite' changes based on what I'm building!",
      followUp: [
        "Tell me about Nexterm",
        "What projects have you built?",
        "Tell me about your skills"
      ]
    }
  },

  // ==========================================
  // PROJECTS
  // ==========================================
  {
    keywords: ["projects", "portfolio", "work", "built", "created", "developed"],
    patterns: [/your\s+projects/i, /what.*projects/i, /what\s+(have\s+you\s+)?(built|created|made)/i, /show\s+me\s+your\s+(work|projects)/i, /tell.*about.*projects/i],
    response: {
      answer: "I've built several exciting projects: DLKA System — a distributed Linux kernel monitoring system using C and Python. Formethica — an AI-powered form builder with Google Gemini. Femway — a women's safety car booking platform. Nexterm — an AI terminal emulator built entirely in Rust. I also created a University Notes Platform and CharmCrafter using React and Supabase. Each project showcases different skills, from system-level programming to full-stack web development.",
      followUp: [
        "Tell me about DLKA System",
        "What's Formethica?",
        "Tell me about Nexterm"
      ]
    }
  },
  {
    keywords: ["favorite project", "best project", "proudest project", "most complex"],
    patterns: [/fav(ou?rite)?\s+project/i, /best\s+project/i, /proudest\s+project/i, /most\s+(complex|challenging)\s+project/i, /which\s+project.*most/i],
    response: {
      answer: "DLKA is my most technically complex project — working at the Linux kernel level is no joke. But Nexterm holds a special place because I built it entirely in Rust, which was a huge learning curve. Formethica is probably the most 'complete' product — it has AI integration, auth, analytics, and is used by real people. It's hard to pick just one because each project taught me something different. DLKA taught me systems, Nexterm taught me Rust, and Formethica taught me product thinking.",
      followUp: [
        "Tell me about DLKA",
        "Tell me about Nexterm",
        "Tell me about Formethica"
      ]
    }
  },
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
  {
    keywords: ["university notes", "notes platform", "charmcrafter", "study notes"],
    patterns: [/university\s+notes/i, /notes\s+platform/i, /charmcrafter/i, /study\s+notes/i, /tell.*about.*(notes|charmcrafter)/i],
    response: {
      answer: "I've built two related projects: The University Notes Platform is a comprehensive system for managing and sharing university course notes, built with TypeScript, Supabase, and Tailwind CSS. It has user auth, note organization, and a responsive interface. It's live at universitynotes.abhirupkumar.in. CharmCrafter is a modern web app built with React and TypeScript featuring shadcn-ui components and Supabase backend. Both projects showcase my full-stack capabilities with real database integration.",
      followUp: [
        "Tell me about your other projects",
        "What technologies do you use?",
        "What's your tech stack?"
      ]
    }
  },

  // ==========================================
  // EXPERIENCE
  // ==========================================
  {
    keywords: ["experience", "work", "job", "internship", "current role", "vizva", "full-time", "currently working", "where are you working"],
    patterns: [/your\s+experience/i, /work\s+experience/i, /where\s+(do\s+you|are\s+you)\s+(work|working)/i, /where\s+(do\s+you\s+)?currently\s+work/i, /currently\s+working/i, /current\s+(job|role|position|work)/i, /tell.*about.*experience/i, /what.*experience/i, /vizva/i, /where.*work.*in/i],
    response: {
      answer: "I'm currently working as a Software Developer at Vizva Consultancy Services (January 2026 - Present) in a full-time role. I develop scalable internal tools and web platforms that integrate with the company's flagship products, enabling efficient monitoring, management, and continuous improvement across teams. I work with React, TypeScript, Vite, Tailwind CSS, shadcn-ui, Supabase, Vercel, MongoDB, Next.js, Node.js, Express.js, and CI/CD pipelines. Previously, I was Lead Software Developer at HERMEiAS (May - December 2025) where I held a similar role.",
      followUp: [
        "What projects are you working on?",
        "Tell me about your education",
        "What are your skills?"
      ]
    }
  },
  {
    keywords: ["hermeias", "previous job", "internship experience", "lead developer"],
    patterns: [/hermeias/i, /previous\s+(job|role|company)/i, /first\s+(job|internship)/i, /intern(ship)?\s+experience/i, /lead\s+(software\s+)?developer/i],
    response: {
      answer: "My first professional role was as Lead Software Developer at HERMEiAS from May to December 2025. It was an internship where I was responsible for developing scalable internal tools and web platforms. I worked with React, TypeScript, Vite, Tailwind CSS, shadcn-ui, Supabase, and Vercel. Being a 'Lead' during an internship taught me a lot about ownership, decision-making, and delivering quality work under real business constraints. It set the foundation for my current full-time role.",
      followUp: [
        "Tell me about your current role",
        "What did you learn?",
        "What skills did you develop?"
      ]
    }
  },

  // ==========================================
  // EDUCATION
  // ==========================================
  {
    keywords: ["education", "degree", "university", "college", "study", "student", "adamas"],
    patterns: [/your\s+education/i, /where\s+did\s+you\s+study/i, /your\s+university/i, /what.*degree/i, /tell.*about.*education/i, /educational\s+background/i, /adamas/i, /which\s+college/i],
    response: {
      answer: "I completed my Bachelor of Technology in Computer Science & Engineering at Adamas University (2022-2026) with a CGPA of 8.68/10. My coursework included Data Structures, Algorithms, DBMS, Operating Systems, and Computer Networks. I was an active member of the Coding Club & Technical Society. Before that, I did my 12th from Kendriya Vidyalaya Tarakeswar with PCM and Computer Science (59%), and 10th from the same school (74%).",
      followUp: [
        "What are your technical skills?",
        "Tell me about your projects",
        "What's your current role?"
      ]
    }
  },

  // ==========================================
  // ACHIEVEMENTS & CERTIFICATIONS
  // ==========================================
  {
    keywords: ["achievement", "certification", "certificate", "award", "accomplishment"],
    patterns: [/achievement/i, /certification/i, /certificate/i, /award/i, /accomplishment/i, /what\s+have\s+you\s+(achieved|won|earned)/i],
    response: {
      answer: "Here are my key achievements: Cyber Security 101 & Pre Security certificates from TryHackMe (2025). The Complete Full-Stack Web Development Bootcamp from Udemy (2024). Software Engineer Certificate and Problem Solving Certificate from HackerRank. Top LeetCoder award at Adamas University (2025). 800+ problems solved on LeetCode. And ranked 849 globally in TryHackMe's HackfinityBattle CTF competition. You can see all of them on my Achievements page!",
      followUp: [
        "Tell me about HackfinityBattle",
        "What's your LeetCode journey?",
        "Tell me about your certifications"
      ]
    }
  },

  // ==========================================
  // CONTACT & SOCIAL
  // ==========================================
  {
    keywords: ["contact", "email", "reach", "connect", "get in touch", "hire"],
    patterns: [/how\s+(can|do)\s+i\s+(contact|reach|connect)/i, /get\s+in\s+touch/i, /email/i, /hire/i, /your\s+email/i, /contact\s+(info|information|details)/i],
    response: {
      answer: "You can reach me at theabhirupkumar@gmail.com, call or text me at 8250772855, or use the contact form on this site. I'm also on LinkedIn at linkedin.com/in/abhirupkumar and GitHub at github.com/DevAdvancer. I'm based in Tarakeswar, Kolkata, India. Always open to opportunities, collaborations, or just a good chat!",
      followUp: [
        "What's your LinkedIn?",
        "Tell me about your projects",
        "Are you available for opportunities?"
      ]
    }
  },
  {
    keywords: ["github", "repository", "code", "source", "open source"],
    patterns: [/github/i, /repositories/i, /source\s+code/i, /open[\s-]source/i],
    response: {
      answer: "All my projects are open-source and available on GitHub at github.com/DevAdvancer. I have projects ranging from system-level programming (DLKA, Nexterm in Rust) to full-stack web applications (Formethica, Femway, University Notes Platform). Feel free to explore, star, or contribute!",
      followUp: [
        "Tell me about your projects",
        "What technologies do you use?",
        "How can I contact you?"
      ]
    }
  },
  {
    keywords: ["linkedin", "social media", "twitter", "instagram", "online presence"],
    patterns: [/linkedin/i, /social\s+media/i, /twitter/i, /instagram/i, /online\s+presence/i, /social\s+profiles?/i],
    response: {
      answer: "You can find me on LinkedIn at linkedin.com/in/abhirupkumar — that's the best place to connect professionally. My GitHub is github.com/DevAdvancer where all my projects live. And of course, this portfolio at abhirupkumar.in is my main online presence. I'm most active on LinkedIn and GitHub.",
      followUp: [
        "What's your email?",
        "Tell me about your projects",
        "What's your GitHub?"
      ]
    }
  },
  {
    keywords: ["resume", "cv", "download", "pdf"],
    patterns: [/resume/i, /\bcv\b/i, /download.*resume/i],
    response: {
      answer: "You can download my resume directly from the navigation bar — just click the 'Resume' button! It contains detailed information about my education, experience, projects, and technical skills. The PDF is always kept up to date with my latest accomplishments.",
      followUp: [
        "What projects have you worked on?",
        "Tell me about your experience",
        "What are your skills?"
      ]
    }
  },

  // ==========================================
  // AVAILABILITY & HIRING
  // ==========================================
  {
    keywords: ["available", "hiring", "job", "opportunity", "position", "looking for", "open to"],
    patterns: [/are\s+you\s+available/i, /looking\s+for/i, /hiring/i, /open\s+to\s+(new\s+)?(opportunities|roles|positions)/i, /freelance/i, /contract/i],
    response: {
      answer: "I'm currently working full-time as a Software Developer at Vizva Consultancy Services since January 2026. While I'm focused on my current role, I'm always open to discussing interesting opportunities in full-stack development, system design, or cybersecurity. If something compelling comes along, I'd love to hear about it. Reach out through my contact page!",
      followUp: [
        "What are your skills?",
        "Tell me about your experience",
        "How can I contact you?"
      ]
    }
  },

  // ==========================================
  // TECHNICAL DEPTH
  // ==========================================
  {
    keywords: ["react", "next.js", "typescript", "python", "rust", "frameworks"],
    patterns: [/react/i, /next\.?js/i, /typescript/i, /python/i, /rust/i, /frameworks/i],
    response: {
      answer: "I work with a modern tech stack. For frontend, I use React, Next.js 15, TypeScript, and Tailwind CSS with shadcn-ui. On backend, I work with Node.js, Express.js, Python, and Flask. For databases, I use Supabase, PostgreSQL, MySQL, and MongoDB. I've also built projects in Rust (Nexterm) and worked with Linux Kernel Modules in C (DLKA). I believe in choosing the right tool for each project.",
      followUp: [
        "Show me projects using these technologies",
        "What's your favorite technology?",
        "Tell me about your skills"
      ]
    }
  },
  {
    keywords: ["database", "mongodb", "mysql", "postgresql", "supabase", "firebase"],
    patterns: [/database.*experience/i, /mongodb.*mysql/i, /sql.*nosql/i, /supabase/i],
    response: {
      answer: "I have experience with both SQL and NoSQL databases. MySQL and PostgreSQL for relational data with complex queries. Supabase in most recent projects for its PostgreSQL with built-in auth and real-time features. MongoDB for flexible schemas. I understand database design, indexing, normalization, and query optimization. I also implement Row Level Security policies in Supabase for projects like Femway to ensure data security at the database level.",
      followUp: [
        "Tell me about Femway",
        "What security practices do you follow?",
        "Tell me about your projects"
      ]
    }
  },
  {
    keywords: ["authentication", "role-based", "session", "auth system", "rbac"],
    patterns: [/role.*based.*auth/i, /authentication.*design/i, /session.*management/i, /rbac/i],
    response: {
      answer: "In projects like Femway, I implemented role-based access control with three distinct roles: Passenger, Driver, and Admin. Each role has specific permissions defined at the database level using Row Level Security policies. Sessions are managed securely with 24-hour token expiration. Admin verification uses secure codes. I hash passwords, validate tokens, and sanitize all inputs. The key is implementing security at multiple layers — database, API, and frontend.",
      followUp: [
        "Tell me about Femway",
        "What security practices do you follow?",
        "How do you handle user data?"
      ]
    }
  },
  {
    keywords: ["security", "secure coding", "vulnerabilities", "backend security", "api security"],
    patterns: [/security.*practices/i, /secure.*backend/i, /vulnerabilities/i, /api.*security/i],
    response: {
      answer: "I follow secure coding practices in all projects. I validate and sanitize inputs to prevent SQL injection and XSS. I use parameterized queries for database operations. Auth tokens are stored securely with automatic expiration. I implement HTTPS, CORS policies, and rate limiting. I use Row Level Security in databases for permissions at the data layer. My cybersecurity background from TryHackMe helps me think like an attacker and build better defenses.",
      followUp: [
        "Tell me about your cybersecurity experience",
        "Tell me about HackfinityBattle",
        "Tell me about Femway"
      ]
    }
  },
  {
    keywords: ["cybersecurity", "soc", "security fundamentals", "tryhackme"],
    patterns: [/cybersecurity.*projects/i, /soc.*fundamentals/i, /security.*applied/i, /tryhackme/i],
    response: {
      answer: "My cybersecurity knowledge influences how I build applications. I think about threat models, attack vectors, and defense strategies from the start. The DLKA project applies security concepts by monitoring kernel integrity and detecting tampering. I use cryptographic signing, secure authentication, and data sanitization across projects. My TryHackMe experience taught me about OWASP Top 10, which I actively prevent in my code. I have Cyber Security 101 and Pre Security certifications from TryHackMe.",
      followUp: [
        "Tell me about DLKA System",
        "Tell me about HackfinityBattle",
        "What are your certifications?"
      ]
    }
  },
  {
    keywords: ["leetcode", "competitive", "algorithms", "problem solving", "dsa"],
    patterns: [/leetcode/i, /competitive.*programming/i, /800.*problems/i, /algorithm.*practice/i, /dsa/i, /data\s+structures/i],
    response: {
      answer: "I've solved over 800 LeetCode problems! I focus on understanding patterns rather than memorizing solutions. I practice arrays, trees, graphs, dynamic programming, and system design. This was recognized at Adamas University where I received the Top LeetCoder award. It's not just about interviews — this practice makes me a fundamentally better problem solver. I can quickly identify the right data structure or algorithm for any given problem.",
      followUp: [
        "How do you apply DSA to projects?",
        "What's your problem-solving approach?",
        "Tell me about your achievements"
      ]
    }
  },
  {
    keywords: ["tools", "ide", "vscode", "cursor", "workflow", "development environment"],
    patterns: [/development.*tools/i, /ide.*prefer/i, /vscode.*cursor/i, /workflow/i],
    response: {
      answer: "I primarily use VS Code and Cursor for development. Cursor's AI features help me write better code faster. I use ESLint, Prettier, and GitLens for code quality. I'm comfortable with Linux command line tools and use Git extensively. For debugging, I use browser DevTools and built-in debuggers. I also use Kiro for some workflows. Good tools make me more productive and help me focus on solving problems.",
      followUp: [
        "How do you use Git?",
        "What's your coding workflow?",
        "Tell me about your skills"
      ]
    }
  },
  {
    keywords: ["real-time", "websockets", "live updates", "state management"],
    patterns: [/real.*time.*updates/i, /websockets/i, /live.*data/i, /state.*changes/i],
    response: {
      answer: "For real-time features, I use Supabase's built-in real-time subscriptions which work over WebSockets. In Formethica, form responses update live without page refreshes. I use React state management with hooks and context for UI synchronization. For more complex state, I've worked with TanStack Query for caching and optimistic updates. The goal is creating smooth user experiences where data feels instant.",
      followUp: [
        "Tell me about Formethica",
        "What databases do you use?",
        "How do you handle state?"
      ]
    }
  },
  {
    keywords: ["responsive", "mobile", "design", "ui", "tailwind"],
    patterns: [/responsive.*design/i, /mobile.*friendly/i, /ui.*implementation/i, /tailwind/i],
    response: {
      answer: "I implement responsive design using Tailwind CSS with its mobile-first approach. All my projects work seamlessly on mobile, tablet, and desktop. I use Flexbox and Grid for flexible layouts. I pay attention to touch targets, readable font sizes, and performance on mobile networks. This portfolio itself is a good example — try it on your phone!",
      followUp: [
        "What projects showcase your design?",
        "What technologies do you use?",
        "Tell me about your portfolio"
      ]
    }
  },
  {
    keywords: ["animations", "framer motion", "transitions", "ui effects"],
    patterns: [/animations/i, /framer.*motion/i, /transitions/i, /ui.*effects/i],
    response: {
      answer: "I use CSS animations and libraries like Framer Motion for smooth, engaging experiences. I use transform and opacity for 60fps animations instead of layout-triggering properties. I implement scroll-based animations and page transitions. The key is keeping animations subtle and purposeful — they should enhance usability, not distract. This portfolio uses scroll reveal animations, page transitions, and a 3D hero scene built with React Three Fiber.",
      followUp: [
        "Tell me about your portfolio",
        "What frontend technologies do you use?",
        "Tell me about the 3D scene"
      ]
    }
  },

  // ==========================================
  // LEARNING & GROWTH
  // ==========================================
  {
    keywords: ["learn", "learning approach", "new technology", "self-taught"],
    patterns: [/how.*learn/i, /learning.*approach/i, /new.*algorithms/i, /teach.*yourself/i],
    response: {
      answer: "I'm a self-motivated learner. I start with documentation and tutorials for core concepts, then build projects to apply what I learned. Learning by doing is my motto. I read blogs, watch tech videos, and participate in developer communities. For algorithms, I solve problems incrementally. I also read other people's code to see different approaches. Every bug is a learning opportunity.",
      followUp: [
        "What technologies have you learned recently?",
        "Tell me about your projects",
        "Any advice for beginners?"
      ]
    }
  },
  {
    keywords: ["continue learning", "growth", "after graduation", "skill development"],
    patterns: [/continue.*learning/i, /after.*graduation/i, /keep.*growing/i, /skill.*development/i],
    response: {
      answer: "I keep growing through hands-on projects, contributing to open source, and staying current with industry trends. I continue solving algorithmic problems. I want to dive deeper into distributed systems, cloud technologies, and advanced security. I learn best by building, so I keep creating challenging projects. I also plan to share knowledge through blog posts. Technology evolves fast, and I love that there's always something new.",
      followUp: [
        "What technologies interest you?",
        "Tell me about your blog",
        "What are your current projects?"
      ]
    }
  },
  {
    keywords: ["currently learning", "learning now", "what are you studying", "up to"],
    patterns: [/what\s+are\s+you\s+(learning|studying|working\s+on)\s+(now|currently|right\s+now|these\s+days)/i, /currently\s+learning/i, /what.*up\s+to/i, /keeping.*busy/i],
    response: {
      answer: "Right now, I'm deepening my expertise at Vizva with technologies like MongoDB, CI/CD pipelines, and advanced React patterns. On the side, I'm exploring more about system design, cloud infrastructure, and diving deeper into cybersecurity. I'm also working on improving my Rust skills. There's always a side project brewing — that's where I experiment with new ideas and technologies!",
      followUp: [
        "Tell me about your current role",
        "What technologies interest you?",
        "What are your goals?"
      ]
    }
  },

  // ==========================================
  // CAREER GOALS & FUTURE
  // ==========================================
  {
    keywords: ["career goals", "future plans", "aspirations"],
    patterns: [/career.*goals/i, /aspirations/i],
    response: {
      answer: "Short-term, I want to grow as an engineer at Vizva and take on more complex projects. I'm interested in full-stack development, system design, and cybersecurity roles. Long-term, I want to become a technical architect who can design complex systems and mentor others. I'm particularly drawn to building scalable applications and security-critical systems. Eventually, I'd love to build my own product or startup. Continuous learning and meaningful impact drive me.",
      followUp: [
        "What kind of roles interest you?",
        "Are you available for opportunities?",
        "What problems interest you?"
      ]
    }
  },
  {
    keywords: ["problems", "industries", "interested in", "domains"],
    patterns: [/kind.*problems/i, /industries.*interested/i, /domains/i],
    response: {
      answer: "I'm drawn to problems with real-world impact. Security-critical systems fascinate me (like DLKA). I'm interested in scalable platforms that serve many users, education technology, safety platforms (like Femway), and developer tools (like Nexterm). I enjoy problems that require deep thinking rather than routine CRUD applications. Any domain where technology makes a meaningful difference interests me.",
      followUp: [
        "Tell me about your projects",
        "What's DLKA System?",
        "What are your goals?"
      ]
    }
  },

  // ==========================================
  // WORK PRACTICES & PROCESS
  // ==========================================
  {
    keywords: ["collaboration", "teamwork", "git workflow", "version control"],
    patterns: [/collaborative/i, /git.*workflow/i, /version.*control/i],
    response: {
      answer: "I use Git with clear commit messages and branching strategies. I create feature branches for new work and use pull requests for code review. I write descriptive commit messages. In teams, I communicate regularly, share progress updates, and ask for help when stuck. I value code reviews as learning opportunities. Good collaboration means clear communication and being open to feedback.",
      followUp: [
        "Tell me about your experience",
        "What tools do you use?",
        "How do you handle feedback?"
      ]
    }
  },
  {
    keywords: ["deadlines", "pressure", "tight timeline", "requirements change"],
    patterns: [/deadlines/i, /tight.*timeline/i, /requirements.*change/i],
    response: {
      answer: "I handle deadlines by breaking projects into manageable tasks and prioritizing critical features first. I use the MVP approach — core functionality before nice-to-haves. When requirements change, I assess the impact and communicate about trade-offs. I stay calm under pressure by focusing on what I can control. Good time estimates come from experience, and I buffer for unexpected challenges.",
      followUp: [
        "Tell me about your work experience",
        "How do you manage time?",
        "What's your development process?"
      ]
    }
  },
  {
    keywords: ["decide", "choose framework", "technology choice", "why react", "why next"],
    patterns: [/how.*decide/i, /choose.*framework/i, /react.*vs/i, /technology.*decision/i],
    response: {
      answer: "I choose technologies based on project requirements. For complex interactive UIs, React for its ecosystem. Next.js for server-side rendering and SEO. Node.js works well with JS frontends, Python/Flask for APIs. I consider performance needs, team familiarity, community support, and maintainability. I'm not tied to one stack — I use the right tool for the job.",
      followUp: [
        "What projects use these technologies?",
        "Tell me about Formethica",
        "What's your tech stack?"
      ]
    }
  },
  {
    keywords: ["primary languages", "why python", "why javascript", "language choice"],
    patterns: [/primary.*languages/i, /why.*python/i, /why.*javascript/i, /which.*languages/i],
    response: {
      answer: "I primarily use Python and JavaScript for their versatility. Python for backend, scripting, and system-level code (DLKA). JavaScript/TypeScript with React and Node.js for full-stack applications. Rust for systems programming (Nexterm) because of performance and safety. C for kernel-level work. I choose languages based on the problem I'm solving.",
      followUp: [
        "Tell me about Nexterm",
        "What frameworks do you use?",
        "Tell me about DLKA System"
      ]
    }
  },

  // ==========================================
  // BLOG
  // ==========================================
  {
    keywords: ["blog", "articles", "writing", "posts"],
    patterns: [/your\s+blog/i, /blog\s+posts/i, /articles/i, /writing/i, /tell.*about.*blog/i, /what.*blog/i, /do\s+you\s+write/i],
    response: {
      answer: "I write about design, development, and creative processes on my blog. Posts include 'The Art of Minimalism in Design' about how less becomes more in UX, 'Building with Intention' about thoughtful development practices, and 'Finding Creativity in Constraints' about why limitations can be your greatest asset. Check out the Blog section for more!",
      followUp: [
        "What projects have you built?",
        "Tell me about your experience",
        "What inspires you?"
      ]
    }
  },

  // ==========================================
  // PORTFOLIO & THIS WEBSITE
  // ==========================================
  {
    keywords: ["portfolio", "website", "this site", "how did you build this"],
    patterns: [/this\s+(portfolio|website|site)/i, /how.*build.*this/i, /portfolio\s+website/i, /tech.*behind.*this/i, /what.*made.*with/i],
    response: {
      answer: "This portfolio is built with React 19, TypeScript, Vite, and Tailwind CSS. It features a 3D animated hero scene using React Three Fiber, smooth scroll animations, page transitions, and this chatbot you're talking to right now (which runs entirely client-side with no external APIs!). The UI uses shadcn/ui components. Blog posts are rendered with React Markdown. It's deployed on Vercel. Building it was a great exercise in modern web development.",
      followUp: [
        "Tell me about the 3D scene",
        "How does this chatbot work?",
        "What technologies do you use?"
      ]
    }
  },
  {
    keywords: ["chatbot", "how does this chatbot", "this assistant", "bot", "are you ai", "are you real"],
    patterns: [/how\s+does\s+this\s+(chatbot|bot|assistant)\s+work/i, /are\s+you\s+(ai|real|a\s+bot|human)/i, /this\s+(chatbot|bot)/i, /who\s+built\s+(this\s+)?(chatbot|bot|you)/i],
    response: {
      answer: "I'm a client-side chatbot built by Abhirup himself! I run entirely in your browser with no external API calls — everything is pattern-matched against a local knowledge base. No data leaves your device. I'm not a large language model like ChatGPT — I'm more like a smart FAQ system that Abhirup loaded with everything you'd want to know about him. I'm proof that you don't always need fancy AI to create a useful conversational experience!",
      followUp: [
        "Tell me about the portfolio",
        "What can I ask you?",
        "Tell me something interesting"
      ]
    }
  },

  // ==========================================
  // STRENGTHS
  // ==========================================
  {
    keywords: ["strengths", "good at", "best at", "qualities"],
    patterns: [/strengths/i, /(what\s+are\s+you\s+)?good\s+at/i, /best\s+at/i, /qualities/i],
    response: {
      answer: "My key strengths are analytical thinking, self-motivated learning, team collaboration, and attention to detail. I love breaking down complex problems into manageable pieces and constantly explore new technologies. I work well with others and value different perspectives. My focus areas include Full-Stack Development, Problem Solving with DSA, System Design, and Security Fundamentals.",
      followUp: [
        "What projects showcase these strengths?",
        "Tell me about your skills",
        "What are your weaknesses?"
      ]
    }
  },

  // ==========================================
  // BACKGROUND & JOURNEY
  // ==========================================
  {
    keywords: ["background", "journey", "story", "how did you", "got into", "started"],
    patterns: [/background/i, /what\s+brought\s+you/i, /how.*get.*into/i, /journey/i, /story/i],
    response: {
      answer: "My journey started with curiosity — I've always been fascinated by how technology solves real problems. Coming from a small town near Kolkata, I didn't have many mentors in tech, so I taught myself through online resources. During my studies at Adamas University, I dove deep into coding and built increasingly complex projects. From kernel-level C code to full-stack web apps, each project expanded what I thought was possible. What keeps me going is the endless learning and the power to create solutions that help people.",
      followUp: [
        "What projects have you built?",
        "Tell me about your education",
        "What are your career goals?"
      ]
    }
  },

  // ==========================================
  // MISCELLANEOUS & CATCH-ALL
  // ==========================================
  {
    keywords: ["what can you do", "what can i ask", "help", "options", "capabilities"],
    patterns: [/what\s+can\s+(you|i)\s+(do|ask)/i, /help/i, /options/i, /capabilities/i, /what.*talk\s+about/i],
    response: {
      answer: "I can tell you about pretty much anything related to Abhirup! Here's what I know about:\n\n- Skills, projects, and technical expertise\n- Work experience and education\n- Personal life, hobbies, and interests\n- Personality, values, and what kind of person he is\n- Hackathon experiences and achievements\n- Recruiter-style questions (strengths, weaknesses, challenges)\n- Career goals and aspirations\n- Daily routine, food preferences, fun facts\n- Contact information and availability\n\nGo ahead, ask me anything!",
      followUp: [
        "Tell me about yourself",
        "What are your hobbies?",
        "What projects have you built?",
        "Tell me something interesting"
      ]
    }
  },
  {
    keywords: ["boring", "lame", "not helpful", "useless", "bad", "stupid"],
    patterns: [/you'?re?\s+(boring|lame|useless|bad|stupid|dumb)/i, /not\s+(helpful|useful|good)/i, /this\s+(is\s+)?(boring|lame|useless)/i, /waste\s+of\s+time/i],
    response: {
      answer: "Ouch! I'm sorry I wasn't helpful. I'm a simple pattern-matching bot, so I have my limits. But I do know a LOT about Abhirup — try asking about his projects, hobbies, personality, hackathon experiences, or even his favorite food. If you want to have a deeper conversation, you can always reach him directly through the contact page!",
      followUp: [
        "Tell me something interesting",
        "What are your hobbies?",
        "How can I contact you?"
      ]
    }
  },
  {
    keywords: ["kolkata", "bengal", "west bengal", "india"],
    patterns: [/kolkata/i, /bengal/i, /west\s+bengal/i, /india/i],
    response: {
      answer: "Yes, I'm from West Bengal, India! Specifically from Tarakeswar, a small town near Kolkata. Kolkata is an incredible city — rich in culture, amazing food (the best street food in India, fight me!), and a growing tech scene. Being from Bengal gives me a unique perspective. The startup ecosystem in India is booming and I'm excited to be part of it!",
      followUp: [
        "What's your favorite food?",
        "Where do you work?",
        "Tell me about yourself"
      ]
    }
  },
  {
    keywords: ["documentation", "communicate", "document", "readme"],
    patterns: [/documentation/i, /document.*projects/i, /communicate.*design/i, /readme/i],
    response: {
      answer: "I document projects through clear README files with setup, features, and architecture. I write comments for complex logic and maintain API docs. Good code should be self-documenting with clear naming, but comments explain the 'why.' This chatbot is itself a form of living documentation!",
      followUp: [
        "Show me your GitHub",
        "Tell me about your projects",
        "How do you organize code?"
      ]
    }
  },
  {
    keywords: ["academics", "studies", "theory", "complement"],
    patterns: [/academic.*complement/i, /studies.*help/i, /university.*projects/i, /theory.*practice/i],
    response: {
      answer: "My academic coursework in Data Structures, Algorithms, OS, and Networks gives me solid foundations. I apply what I learn in class to projects — OS concepts helped build DLKA, database theory applies to my full-stack work. The combination of theory and practice makes me stronger because I understand not just how, but why things work.",
      followUp: [
        "Tell me about DLKA System",
        "What's your education?",
        "What projects demonstrate this?"
      ]
    }
  },
  {
    keywords: ["balance", "manage", "juggle", "time management", "handle"],
    patterns: [/balance.*work/i, /manage.*time/i, /juggle/i, /handle.*multiple/i, /time\s+management/i],
    response: {
      answer: "Balancing work, projects, and personal life requires good time management. I prioritize tasks based on deadlines and impact, use project planning tools, and break large goals into milestones. Work provides structure, personal projects let me explore at my own pace. I work smart, not just hard. Regular breaks and staying organized help me stay productive without burning out.",
      followUp: [
        "What's your current role?",
        "What's your daily routine?",
        "How do you handle stress?"
      ]
    }
  }
];

// Multiple fallback responses for variety
const fallbackResponses: ChatResponse[] = [
  {
    answer: "Hmm, I'm not sure about that one! But I know a lot about Abhirup — try asking about his projects, hobbies, personality, hackathon experiences, career goals, or even his favorite food. I'm pretty chatty once you hit the right topic!",
    followUp: [
      "Tell me about yourself",
      "What are your hobbies?",
      "What projects have you built?",
      "Tell me something interesting"
    ]
  },
  {
    answer: "That's a bit outside my knowledge base! I'm best at talking about Abhirup's life, skills, projects, and experiences. Want to know about his coding journey, what kind of person he is, or how he handles tough situations? Ask away!",
    followUp: [
      "What kind of person are you?",
      "Tell me about your experience",
      "What motivates you?",
      "What are your achievements?"
    ]
  },
  {
    answer: "I don't have info on that, but there's a lot I CAN tell you! I know about Abhirup's tech stack, personal interests, hackathon stories, work experience, and even his chai addiction. What sounds interesting?",
    followUp: [
      "Tell me about your hackathon experience",
      "What are your skills?",
      "What's your favorite food?",
      "How can I contact you?"
    ]
  },
  {
    answer: "Good question, but I'll need Abhirup to teach me that one! In the meantime, I can talk about his projects, personal life, career goals, hobbies, or really anything else about him. What would you like to know?",
    followUp: [
      "Tell me about yourself",
      "What do you do for fun?",
      "What are your career goals?",
      "Tell me a fun fact"
    ]
  }
];

export const defaultResponse: ChatResponse = fallbackResponses[0];

// ==========================================
// CLIENT-SIDE NLP ENGINE
// ==========================================

// Stop words to ignore during matching
const STOP_WORDS = new Set([
  "i", "me", "my", "myself", "we", "our", "you", "your", "he", "she", "it",
  "they", "them", "what", "which", "who", "whom", "this", "that", "these",
  "those", "am", "is", "are", "was", "were", "be", "been", "being", "have",
  "has", "had", "having", "do", "does", "did", "doing", "a", "an", "the",
  "and", "but", "if", "or", "because", "as", "until", "while", "of", "at",
  "by", "for", "with", "about", "against", "between", "through", "during",
  "before", "after", "above", "below", "to", "from", "up", "down", "in",
  "out", "on", "off", "over", "under", "again", "further", "then", "once",
  "here", "there", "when", "where", "why", "how", "all", "both", "each",
  "few", "more", "most", "other", "some", "such", "no", "nor", "not",
  "only", "own", "same", "so", "than", "too", "very", "s", "t", "can",
  "will", "just", "don", "should", "now", "d", "ll", "m", "o", "re",
  "ve", "y", "ain", "aren", "couldn", "didn", "doesn", "hadn", "hasn",
  "haven", "isn", "ma", "mightn", "mustn", "needn", "shan", "shouldn",
  "wasn", "weren", "won", "wouldn", "also", "could", "would", "shall",
  "may", "might", "must", "need", "let", "please", "tell", "know",
  "really", "actually", "basically", "like", "get", "got", "going",
  "thing", "things", "something", "anything", "everything", "much",
  "many", "way", "even", "well", "back", "still", "already", "right"
]);

// Synonym map — maps words to their canonical form
const SYNONYMS: Record<string, string> = {
  // Work & Career
  job: "work", career: "work", profession: "work", occupation: "work", employment: "work",
  employed: "work", working: "work", company: "work", employer: "work", workplace: "work",
  role: "experience", position: "experience", designation: "experience",
  salary: "compensation", pay: "compensation", money: "compensation", income: "compensation",
  wage: "compensation", ctc: "compensation", package: "compensation", earning: "compensation",
  hire: "hiring", recruit: "hiring", employ: "hiring", onboard: "hiring",
  internship: "internship", intern: "internship", trainee: "internship",
  freelance: "available", freelancing: "available", contract: "available", gig: "available",

  // Education
  college: "university", school: "university", institute: "university", institution: "university",
  degree: "education", qualification: "education", academic: "education", course: "education",
  studied: "study", studying: "study", studies: "study", learn: "study",
  grade: "cgpa", gpa: "cgpa", marks: "cgpa", score: "cgpa", percentage: "cgpa",

  // Skills & Tech
  coding: "programming", code: "programming", program: "programming", develop: "programming",
  developer: "programming", development: "programming", engineer: "programming",
  stack: "technologies", tech: "technologies", framework: "technologies", library: "technologies",
  frontend: "technologies", backend: "technologies", fullstack: "technologies",
  language: "programming", languages: "programming",
  tool: "tools", software: "tools", app: "tools", application: "tools",

  // Personal
  hobby: "hobbies", interest: "hobbies", interests: "hobbies", pastime: "hobbies",
  leisure: "hobbies", spare: "hobbies", free: "hobbies",
  age: "old", young: "old", born: "old", birthday: "old",
  home: "hometown", city: "hometown", town: "hometown", village: "hometown",
  live: "hometown", reside: "hometown", based: "hometown", location: "hometown",
  family: "parents", mom: "parents", dad: "parents", mother: "parents", father: "parents",
  sibling: "parents", brother: "parents", sister: "parents",
  friend: "friends", buddy: "friends", pal: "friends", mate: "friends",
  girlfriend: "relationship", boyfriend: "relationship", dating: "relationship",
  single: "relationship", married: "relationship", partner: "relationship",
  wife: "relationship", love: "relationship",
  personality: "person", character: "person", nature: "person", temperament: "person",

  // Food & Lifestyle
  food: "eat", cuisine: "eat", dish: "eat", meal: "eat", cook: "eat", cooking: "eat",
  restaurant: "eat", hungry: "eat", snack: "eat",
  coffee: "drink", tea: "drink", chai: "drink", beverage: "drink",
  movie: "watch", film: "watch", show: "watch", series: "watch", anime: "watch",
  netflix: "watch", tv: "watch",
  song: "music", songs: "music", singer: "music", band: "music", artist: "music",
  playlist: "music", genre: "music",
  game: "gaming", games: "gaming", gamer: "gaming", play: "gaming", videogame: "gaming",
  exercise: "fitness", workout: "fitness", gym: "fitness", sport: "fitness", sports: "fitness",
  health: "fitness",
  book: "reading", books: "reading", read: "reading", novel: "reading",
  trip: "travel", visit: "travel", visited: "travel", traveling: "travel", travelling: "travel",
  destination: "travel", places: "travel",
  dog: "pet", cat: "pet", animal: "pet", animals: "pet", pets: "pet",
  morning: "routine", night: "routine", sleep: "routine", wake: "routine", schedule: "routine",

  // Projects
  project: "projects", built: "projects", created: "projects", made: "projects",
  developed: "projects", build: "projects", portfolio: "projects",

  // Hackathon
  hackathon: "hack", ctf: "hack", competition: "hack", contest: "hack",
  competed: "hack", participate: "hack", participated: "hack",

  // Mindset
  motivate: "motivation", motivated: "motivation", drive: "motivation", driven: "motivation",
  inspire: "motivation", inspired: "motivation", passion: "motivation", passionate: "motivation",
  goal: "goals", target: "goals", aim: "goals", ambition: "goals", aspiration: "goals",
  dream: "goals", vision: "goals", plan: "goals",
  strength: "strengths", strong: "strengths", quality: "strengths", qualities: "strengths",
  weakness: "weaknesses", weak: "weaknesses", flaw: "weaknesses", shortcoming: "weaknesses",
  improve: "weaknesses", improvement: "weaknesses",
  challenge: "challenges", difficult: "challenges", hard: "challenges", tough: "challenges",
  obstacle: "challenges", struggle: "challenges", hardest: "challenges",
  fail: "failure", failed: "failure", mistake: "failure", regret: "failure",
  stress: "stressed", pressure: "stressed", overwhelm: "stressed", anxious: "stressed",
  burnout: "stressed",
  feedback: "criticism", criticize: "criticism", review: "criticism",
  conflict: "disagreement", argue: "disagreement", fight: "disagreement",
  leader: "leadership", lead: "leadership", manage: "leadership", managing: "leadership",
  value: "values", believe: "values", belief: "values", principle: "values",
  philosophy: "values", matter: "values",

  // Contact
  email: "contact", reach: "contact", connect: "contact", touch: "contact",
  message: "contact",

  // Meta
  resume: "cv", download: "cv",
  achievement: "achievements", certificate: "achievements", certification: "achievements",
  award: "achievements", accomplishment: "achievements",
  blog: "writing", article: "writing", post: "writing", posts: "writing",
};

// Simple English stemmer — strips common suffixes
function stem(word: string): string {
  if (word.length < 4) return word;

  // Handle common suffixes (ordered by length, longest first)
  const suffixes = [
    "ation", "ment", "ness", "ible", "able", "tion", "sion",
    "ally", "ully", "ious", "eous", "ling",
    "ing", "ied", "ies", "ous", "ful", "ity", "ive", "ize",
    "ist", "ism", "ess", "ent", "ant", "ure", "age",
    "ly", "ed", "er", "es", "al", "en", "ty",
    "s"
  ];

  for (const suffix of suffixes) {
    if (word.endsWith(suffix) && word.length - suffix.length >= 3) {
      return word.slice(0, -suffix.length);
    }
  }

  return word;
}

// Tokenize input: lowercase, remove punctuation, split into words
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s'-]/g, " ")
    .split(/\s+/)
    .filter(w => w.length > 0);
}

// Expand a token using synonyms and stemming
function normalize(token: string): string[] {
  const results: string[] = [token];

  // Add synonym if exists
  const synonym = SYNONYMS[token];
  if (synonym) results.push(synonym);

  // Add stemmed form
  const stemmed = stem(token);
  if (stemmed !== token) results.push(stemmed);

  // Add synonym of stemmed form
  const stemmedSynonym = SYNONYMS[stemmed];
  if (stemmedSynonym) results.push(stemmedSynonym);

  return [...new Set(results)];
}

// Compute Levenshtein distance for fuzzy matching
function levenshtein(a: string, b: string): number {
  const matrix: number[][] = [];
  for (let i = 0; i <= a.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= b.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }
  return matrix[a.length][b.length];
}

// Check if two words are fuzzy-equal (handles typos)
function fuzzyMatch(a: string, b: string): boolean {
  if (a === b) return true;
  if (Math.abs(a.length - b.length) > 2) return false;
  const maxDist = a.length <= 4 ? 1 : 2;
  return levenshtein(a, b) <= maxDist;
}

// Pre-compute IDF scores for all keywords across entries
// Words that appear in fewer entries are more distinctive
const idfCache: Record<string, number> = {};
function getIdf(keyword: string): number {
  if (idfCache[keyword] !== undefined) return idfCache[keyword];
  let count = 0;
  for (const entry of chatbotKnowledge) {
    for (const kw of entry.keywords) {
      if (kw.toLowerCase().includes(keyword) || keyword.includes(kw.toLowerCase())) {
        count++;
        break;
      }
    }
  }
  // IDF: rarer words score higher
  idfCache[keyword] = Math.log((chatbotKnowledge.length + 1) / (count + 1)) + 1;
  return idfCache[keyword];
}

// Main matching function with NLP pipeline
export function findBestMatch(userMessage: string): ChatResponse {
  const normalizedMessage = userMessage.toLowerCase().trim();

  // === Phase 1: Regex pattern matching (highest priority, most specific) ===
  for (const entry of chatbotKnowledge) {
    for (const pattern of entry.patterns) {
      if (pattern.test(normalizedMessage)) {
        return entry.response;
      }
    }
  }

  // === Phase 2: NLP-based semantic matching ===
  const rawTokens = tokenize(normalizedMessage);
  const meaningfulTokens = rawTokens.filter(t => !STOP_WORDS.has(t) && t.length > 1);

  // If user typed very short message with no meaningful tokens, use raw tokens
  const userTokens = meaningfulTokens.length > 0 ? meaningfulTokens : rawTokens.filter(t => t.length > 1);

  if (userTokens.length === 0) {
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  }

  // Expand user tokens with synonyms and stems
  const expandedUserTokens: string[] = [];
  for (const token of userTokens) {
    expandedUserTokens.push(...normalize(token));
  }

  // Score each knowledge entry
  const scores = chatbotKnowledge.map(entry => {
    let score = 0;

    // Expand entry keywords too
    const entryTokens: string[] = [];
    for (const kw of entry.keywords) {
      const kwParts = tokenize(kw);
      for (const part of kwParts) {
        entryTokens.push(...normalize(part));
      }
    }
    const entryTokenSet = new Set(entryTokens);

    // Direct and synonym-expanded matches with IDF weighting
    for (const userToken of expandedUserTokens) {
      if (entryTokenSet.has(userToken)) {
        score += getIdf(userToken) * 2;
        continue;
      }

      // Fuzzy match against entry tokens (handles typos)
      for (const entryToken of entryTokenSet) {
        if (fuzzyMatch(userToken, entryToken)) {
          score += getIdf(entryToken) * 1.5;
          break;
        }
      }
    }

    // Bonus: check if full keywords appear as substrings in the message
    for (const kw of entry.keywords) {
      const kwLower = kw.toLowerCase();
      if (normalizedMessage.includes(kwLower)) {
        score += kwLower.length * 0.5;
      }
    }

    // Normalize score by number of user tokens to avoid bias toward long messages
    const normalizedScore = userTokens.length > 0 ? score / Math.sqrt(userTokens.length) : 0;

    return { entry, score: normalizedScore };
  });

  scores.sort((a, b) => b.score - a.score);

  // Only return a match if the score is above a minimum threshold
  const MIN_SCORE = 1.5;
  if (scores[0] && scores[0].score >= MIN_SCORE) {
    return scores[0].entry.response;
  }

  // === Phase 3: Fallback with variety ===
  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
}
