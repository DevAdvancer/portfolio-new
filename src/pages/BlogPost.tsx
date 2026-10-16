import { useParams, Link } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogPosts";
import ScrollReveal from "@/components/ScrollReveal";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-transparent">
      <Navigation />
      <main id="main-content" tabIndex={-1} className="pt-12 sm:pt-20 pb-16 sm:pb-24">
        <article className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <ScrollReveal>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 sm:mb-12 group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to Journal
              </Link>

              <header className="mb-8 sm:mb-12">
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <time dateTime={post.date} className="text-xs sm:text-sm text-muted-foreground">
                    {new Date(`${post.date}T00:00:00Z`).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                      timeZone: "UTC",
                    })}
                  </time>
                  <span className="w-1 h-1 rounded-full bg-primary" />
                  <span className="text-xs sm:text-sm text-muted-foreground">{post.readTime}</span>
                </div>
                <h1 className="font-serif text-2xl sm:text-3xl md:text-5xl text-foreground mb-4 sm:mb-6">
                  {post.title}
                </h1>
                <p className="text-sm text-muted-foreground mb-4">By <Link to="/#about" rel="author" className="underline underline-offset-4">Abhirup Kumar</Link></p>
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
              </header>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="prose-custom">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {post.content.replace(/^\s*# [^\n]+\n/, "")}
                </ReactMarkdown>
              </div>
            </ScrollReveal>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
