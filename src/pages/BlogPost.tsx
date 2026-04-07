import { useParams, Link, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogPosts";
import ScrollReveal from "@/components/ScrollReveal";
import SEO from "@/components/SEO";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-transparent">
      <SEO
        title={`${post.title} - Abhirup Kumar's Blog`}
        description={post.excerpt}
        keywords={post.tags.join(", ")}
        url={`https://www.abhirupkumar.in/blog/${post.id}`}
        type="article"
      />
      <Navigation />
      <main className="pt-24 sm:pt-32 pb-16 sm:pb-24">
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
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-primary" />
                  <span className="text-xs sm:text-sm text-muted-foreground">{post.readTime}</span>
                </div>
                <h1 className="font-serif text-2xl sm:text-3xl md:text-5xl text-foreground mb-4 sm:mb-6">
                  {post.title}
                </h1>
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
                  {post.content}
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
