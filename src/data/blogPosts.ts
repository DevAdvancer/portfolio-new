export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "the-art-of-minimalism",
    title: "The Art of Minimalism in Design",
    excerpt: "Exploring how less truly becomes more in the world of visual design and user experience.",
    date: "2024-12-15",
    readTime: "5 min read",
    tags: ["Design", "Philosophy"],
    content: `
# The Art of Minimalism in Design

Minimalism isn't about removing elements—it's about **amplifying what matters**.

## Why Minimalism Works

When we strip away the unnecessary, we create space for:

- **Clarity** — The message becomes crystal clear
- **Focus** — Users know exactly where to look
- **Elegance** — Beauty emerges from simplicity

> "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away." — Antoine de Saint-Exupéry

## The Three Principles

### 1. Intentional White Space

White space isn't empty—it's breathing room. It gives your content the spotlight it deserves.

### 2. Purposeful Typography

Every font choice, every size, every weight should have a reason. Typography is the voice of your design.

### 3. Restrained Color

A limited palette creates harmony. Choose colors that serve the content, not distract from it.

## Conclusion

Minimalism is a practice of restraint and intention. When done well, it doesn't feel like anything is missing—it feels complete.
    `
  },
  {
    id: "building-with-intention",
    title: "Building with Intention",
    excerpt: "How thoughtful development practices lead to better products and happier users.",
    date: "2024-12-10",
    readTime: "4 min read",
    tags: ["Development", "Process"],
    content: `
# Building with Intention

Every line of code is a decision. Every decision shapes the user experience.

## The Intentional Developer

Writing code isn't just about making things work—it's about making things **right**.

### Code as Communication

\`\`\`typescript
// This communicates intent
const userPreferences = getUserPreferences();
const theme = userPreferences.prefersDarkMode ? 'dark' : 'light';

// This doesn't
const t = u.d ? 'd' : 'l';
\`\`\`

## The Ripple Effect

Small decisions compound:

1. Clear naming leads to maintainable code
2. Maintainable code leads to faster iteration
3. Faster iteration leads to better products
4. Better products lead to happier users

## Conclusion

Build with intention. Your future self—and your users—will thank you.
    `
  },
  {
    id: "finding-creativity",
    title: "Finding Creativity in Constraints",
    excerpt: "Why limitations can be your greatest asset in the creative process.",
    date: "2024-12-05",
    readTime: "6 min read",
    tags: ["Creativity", "Process"],
    content: `
# Finding Creativity in Constraints

The blank page is terrifying. Constraints set you free.

## The Paradox of Choice

When everything is possible, nothing gets done. Constraints give us:

- **Direction** — A starting point
- **Focus** — Clear boundaries
- **Innovation** — Creative problem-solving

## Famous Constraints

### Twitter's 140 Characters

The limit forced clarity. Every word had to earn its place.

### Instagram's Square Photos

The format became iconic. Constraints created a recognizable aesthetic.

## Embracing Limitations

Next time you face a constraint, don't fight it. Ask yourself:

> "How can this limitation become my advantage?"

The answer might surprise you.
    `
  }
];
