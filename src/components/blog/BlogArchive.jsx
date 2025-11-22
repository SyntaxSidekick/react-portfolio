import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Skeleton, SkeletonBlock } from '../Skeleton'
import { PageHeader } from '../'
import Sidebar from './Sidebar'
import BlogNav from './BlogNav'

const BlogArchive = () => {
  const { category } = useParams()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const categoryName = category ? category.replace(/-/g, ' ') : 'All'

  useEffect(() => {
    setLoading(true)
    if (category) {
      // Fetch category ID from slug
      fetch(`https://blog.riadkilani.com/wp-json/wp/v2/categories?slug=${category}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            const catId = data[0].id
            let url = `https://blog.riadkilani.com/wp-json/wp/v2/posts?per_page=10&_embed&categories=${catId}`
            fetch(url)
              .then(res => {
                if (!res.ok) throw new Error('Failed to fetch posts')
                return res.json()
              })
              .then(data => {
                setPosts(data)
                setLoading(false)
              })
              .catch(err => {
                setError(err.message)
                setLoading(false)
              })
          } else {
            setPosts([])
            setLoading(false)
          }
        })
    } else {
      // No category, show all posts
      let url = 'https://blog.riadkilani.com/wp-json/wp/v2/posts?per_page=10&_embed'
      fetch(url)
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch posts')
          return res.json()
        })
        .then(data => {
          setPosts(data)
          setLoading(false)
        })
        .catch(err => {
          setError(err.message)
          setLoading(false)
        })
    }
  }, [category])

  if (loading || error) {
    return (
      <main className='blog-index-page'>
        <div className='content-sidebar-wrapper'>
          <section className='listing-content blog-content'>
            <h1>
              <Skeleton width='40%' height={32} />
            </h1>
            <ul className='blog-index-list'>
              {Array.from({ length: 4 }).map((_, i) => (
                <li key={i} className='blog-index-item'>
                  <article className='blog-snippet'>
                    <Skeleton width='60%' height={24} style={{ marginBottom: 8 }} />
                    <Skeleton width='100%' height={160} style={{ marginBottom: 12 }} />
                    <SkeletonBlock lines={2} width={['90%', '70%']} height={14} />
                  </article>
                </li>
              ))}
            </ul>
          </section>
          <Sidebar />
        </div>
        {error && <div style={{ color: 'red', textAlign: 'center', marginTop: 32 }}>Error: {error}</div>}
      </main>
    )
  }

  return (
    <>
      <BlogNav activeCategory={category} />
      <main className='blog-index-page' role="main" aria-labelledby="page-title">
        <PageHeader 
          title={`Latest Posts in ${categoryName}`}
          subtitle={`Interested in ${categoryName}? Read more here.`}
        />
        <div className='container'>
        <nav className='breadcrumbs' aria-label="Breadcrumb">
          <Link to='/'>Home</Link> &gt; <Link to='/blog'>Blog</Link> &gt; <span aria-current="page">Category: {categoryName}</span>
        </nav>
        <div className='content-sidebar-wrapper'>
          <section className='listing-content blog-content' aria-labelledby="page-title">
            <ul className='blog-index-list'>
              {posts.map(post => (
                <li key={post.id} className='blog-index-item'>
                  <article className='blog-snippet' aria-labelledby={`post-title-${post.id}`}>
                    <h2 id={`post-title-${post.id}`}>
                      <Link to={`/blog/${post.slug}`} aria-label={`Read article: ${post.title.rendered.replace(/<[^>]+>/g, '')}`}>{post.title.rendered.replace(/<[^>]+>/g, '')}</Link>
                    </h2>
                    {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                      <figure className="blog-archive-image">
                        <img
                          src={post._embedded['wp:featuredmedia'][0].source_url}
                          alt={post._embedded['wp:featuredmedia'][0].alt_text || post.title.rendered.replace(/<[^>]+>/g, '')}
                          loading="lazy"
                          width="400"
                          height="220"
                        />
                      </figure>
                    )}
                    <div className='blog-index-excerpt' dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                    <Link to={`/blog/${post.slug}`} className='read-more-link' aria-label={`Read more about ${post.title.rendered.replace(/<[^>]+>/g, '')}`}>
                      Read More <span aria-hidden="true">→</span>
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          </section>
          <Sidebar />
        </div>
        </div>
      </main>
    </>
  )
}

export default BlogArchive
