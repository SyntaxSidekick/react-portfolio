import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Skeleton, SkeletonBlock } from '../Skeleton'
import { PageHeader } from '../'
import Sidebar from './Sidebar'
import BlogNav from './BlogNav'

const BlogIndex = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://blog.riadkilani.com/wp-json/wp/v2/posts?per_page=10&_embed')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch posts')
        return res.json()
      })
      .then(data => {
        setPosts(data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  return (
    <>
      <BlogNav />
      <main className='blog-index-page' role="main" aria-labelledby="page-title">
        <PageHeader 
          title="Latest Blog Posts"
          subtitle="From random thoughts to insightful articles on web development, design, and technology."
        />
        <div className='container'>
        <div className='content-sidebar-wrapper'>
          <section className='listing-content blog-content' role="region" aria-label="Blog post list">
            <div className='blog-posts-grid'>
              {loading ? (
                <div className='blog-loading'>Loading latest blog posts...</div>
              ) : (
                posts.map((post, i) => (
                  <motion.article 
                    className="card card-interactive blog-card" 
                    key={post.id}
                    style={{ '--card-delay': `${i * 0.1}s` }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                  >
                    <Link 
                      to={`/blog/${post.slug}`} 
                      className="blog-card-link"
                      aria-label={`Read article: ${post.title.rendered.replace(/<[^>]+>/g, '')}`}
                    >
                      {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                        <div className="blog-card-image">
                          <img
                            src={post._embedded['wp:featuredmedia'][0].source_url}
                            alt={post.title.rendered.replace(/<[^>]+>/g, '')}
                            loading="lazy"
                            width="400"
                            height="220"
                          />
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
                          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                        />
                        
                        <div 
                          className="card-text blog-excerpt"
                          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                        />
                        
                        <span className="blog-read-more">
                          Read More <i className="fas fa-arrow-right" aria-hidden="true"></i>
                        </span>
                      </div>
                    </Link>
                  </motion.article>
                ))
              )}
            </div>
          </section>
          <Sidebar />
        </div>
        </div>
      </main>
    </>
  )
}

export default BlogIndex
