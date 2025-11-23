import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SectionHeader, CTAButton } from "../../common";

const BlogSection = ({ blogPosts }) => {
  return (
    <section className="blog-section" id="blog" aria-labelledby="blog-title">
      <div className="container">
        <SectionHeader 
          badge="Insights & Updates"
          title="From the Blog"
          subtitle="Sharing knowledge, insights, and experiences from the world of web development and design."
          id="blog-title"
        />

        <motion.div 
          className="blog-posts-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {blogPosts.length === 0 ? (
            <div className="blog-loading">Loading latest blog posts...</div>
          ) : (
            blogPosts.slice(0, 2).map((post, i) => (
              <motion.article 
                className="card card-interactive blog-card" 
                key={i}
                style={{ '--card-delay': `${i * 0.1}s` }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              >
                <Link to={`/blog/${post.slug}`} className="blog-card-link">
                  {post.img && (
                    <div className="blog-card-image">
                      <img
                        src={post.img}
                        alt={post.title}
                        loading="lazy"
                        width="400"
                        height="220"
                      />
                      <div className="blog-card-overlay">
                        <span className="read-more-text">Read Article →</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="card-body blog-card-content">
                    <time className="blog-date" dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                    
                    <h3 
                      className="card-title blog-title"
                      dangerouslySetInnerHTML={{ __html: post.title }}
                    />
                    
                    <p className="card-text blog-excerpt">{post.excerpt}</p>
                    
                    <span className="blog-read-more">
                      Read More <i className="fas fa-arrow-right" aria-hidden="true"></i>
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))
          )}
        </motion.div>

        <div className="blog-cta">
          <CTAButton 
            href="/blog"
            icon="fas fa-blog"
            title="View All Posts"
            subtitle="Read insights, tutorials, and articles"
            ariaLabel="Read all blog posts and articles"
            variant="blog"
          />
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
