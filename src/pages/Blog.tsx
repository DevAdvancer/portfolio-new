import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogPosts";
import ScrollReveal from "@/components/ScrollReveal";
import SEO from "@/components/SEO";

const Blog = () => {
  return (
    <div className="min-h-screen bg-transparent">
      <SEO
        title="Blog - Abhirup Kumar | Thoughts & Writing on Design & Development"
        description="Read articles and thoughts from Abhirup Kumar on software development, design, web development, React, TypeScript, and the creative process."
        keywords="Abhirup Kumar blog, software development blog, web development articles, React tutorials, TypeScript blog, programming thoughts, design philosophy"
        url="https://www.abhirupkumar.in/blog"
      />
      <Navigation />
      <main id="main-content" tabIndex={-1} className="pt-12 sm:pt-20 pb-16 sm:pb-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <header className="mb-10 sm:mb-16">
                <p className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-3 sm:mb-4">
                  Journal
                </p>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-4 sm:mb-6">
                  Thoughts & Writing by Abhirup Kumar
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Exploring design, development, and the creative process.
                </p>
              </header>
            </ScrollReveal>

            <div className="space-y-6 sm:space-y-8">
              {blogPosts.map((post, index) => (
                <ScrollReveal key={post.id} delay={index * 100}>
                  <Link
                    to={`/blog/${post.id}`}
                    className="group block border border-border bg-card/50 p-4 sm:p-6 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5"
                  >
                    <article>
                      <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <span className="text-xs text-muted-foreground">
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-primary" />
                        <span className="text-xs text-muted-foreground">{post.readTime}</span>
                      </div>
                      <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground mb-3 sm:mb-4 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 sm:px-3 py-1 bg-secondary/50 text-muted-foreground border border-border"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </article>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
