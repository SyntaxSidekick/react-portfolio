import React, { useEffect, useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Skeleton, SkeletonBlock } from '../Skeleton'
// Import only core highlight.js with specific languages instead of full bundle
import hljs from 'highlight.js/lib/core'
// Import only commonly used languages to reduce bundle size from 1.5MB to ~100KB
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import css from 'highlight.js/lib/languages/css'
import scss from 'highlight.js/lib/languages/scss'
import xml from 'highlight.js/lib/languages/xml' // for HTML
import json from 'highlight.js/lib/languages/json'
import bash from 'highlight.js/lib/languages/bash'
import php from 'highlight.js/lib/languages/php'
import sql from 'highlight.js/lib/languages/sql'
import 'highlight.js/styles/github-dark.css'
import Sidebar from './Sidebar'
import BlogNav from './BlogNav'

// Register only the languages we need
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('css', css)
hljs.registerLanguage('scss', scss)
hljs.registerLanguage('html', xml)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('json', json)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('shell', bash)
hljs.registerLanguage('php', php)
hljs.registerLanguage('sql', sql)

const Blog = ({ setPageTitle }) => {
  // BlogPost logic
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const contentRef = useRef(null)

  useEffect(() => {
    // Fetch categories for nav
    fetch('https://blog.riadkilani.com/wp-json/wp/v2/categories?per_page=100')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          // Removed setCategories call
        }
      })
    if (slug) {
      setLoading(true)
      fetch(`https://blog.riadkilani.com/wp-json/wp/v2/posts?slug=${slug}&_embed`)
        .then(res => {
          if (!res.ok) throw new Error('Post not found')
          return res.json()
        })
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            setPost(data[0])
            if (setPageTitle) setPageTitle(data[0].title.rendered.replace(/<[^>]+>/g, ''))
          } else {
            setError('Post not found')
            if (setPageTitle) setPageTitle(null)
          }
          setLoading(false)
        })
        .catch(err => {
          setError(err.message)
          setLoading(false)
          if (setPageTitle) setPageTitle(null)
        })
    }
  }, [slug, setPageTitle])

  // Highlight code and add copy buttons after post content is rendered
  useEffect(() => {
    if (!post) return
    const contentEl = contentRef.current
    if (!contentEl) return
    // Highlight code blocks
    contentEl.querySelectorAll('pre code').forEach(block => {
      hljs.highlightElement(block)
    })
    // Add copy buttons to wp-block-code
    contentEl.querySelectorAll('pre.wp-block-code').forEach(pre => {
      if (pre.querySelector('.copy-code-btn')) return // Don't add twice
      const code = pre.querySelector('code')
      if (!code) return
      const btn = document.createElement('button')
      btn.className = 'copy-code-btn'
      btn.type = 'button'
      btn.textContent = 'Copy'
      btn.setAttribute('aria-label', 'Copy code to clipboard')
      pre.insertBefore(btn, code)
    })
  }, [post])

  if (loading || error || !post) {
    return (
      <main className='blog-post-page'>
        <article className='blog-post'>
          <h1>
            <Skeleton width='60%' height={32} />
          </h1>
          <Skeleton width='100%' height={220} className="skeleton-mb-lg" />
          <SkeletonBlock lines={6} width={['100%', '95%', '90%', '80%', '70%', '60%']} height={16} />
        </article>
        {error && <div className="blog-error-message" role="alert">Error: {error}</div>}
      </main>
    )
  }

  return (
    <>
      <BlogNav />
      <main className='blog-post-main blog-post-page' role="main" aria-labelledby="post-title">
        <div className='container'>
        <nav className='breadcrumbs' aria-label="Breadcrumb">
          <Link to='/'>Home</Link> &gt; <Link to='/blog'>Blog</Link> &gt; <span aria-current="page">{post.title.rendered.replace(/<[^>]+>/g, '')}</span>
        </nav>
        <div className='content-sidebar-wrapper'>
          <article className='single-content blog-content'>
            <div className='blog-full'>
              <h1 id="post-title" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
              {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                <figure className="featured-image">
                  <img
                    src={post._embedded['wp:featuredmedia'][0].source_url}
                    alt={post._embedded['wp:featuredmedia'][0].alt_text || post.title.rendered.replace(/<[^>]+>/g, '')}
                    width={post._embedded['wp:featuredmedia'][0].media_details?.width}
                    height={post._embedded['wp:featuredmedia'][0].media_details?.height}
                    loading="eager"
                  />
                </figure>
              )}
              <div
                className='blog-post-content'
                ref={contentRef}
                dangerouslySetInnerHTML={{ __html: post.content.rendered }}
              />
            </div>
          </article>
          <Sidebar />
        </div>
        </div>
      </main>
    </>
  )
}

// ...existing code...
export default Blog
