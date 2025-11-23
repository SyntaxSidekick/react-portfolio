
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import DynamicTitle from './DynamicTitle';
import Loader from './components/Loader';

// Lazy load route components for code splitting
const Home = lazy(() => import('./components/home/Home'));
const Bio = lazy(() => import('./components/bio/Bio'));
const Portfolio = lazy(() => import('./components/portfolio/Portfolio'));
const BlogIndex = lazy(() => import('./components/blog/BlogIndex'));
const Blog = lazy(() => import('./components/blog/Blog'));
const BlogArchive = lazy(() => import('./components/blog/BlogArchive'));
const BlogTagArchive = lazy(() => import('./components/blog/BlogTagArchive'));
const Contact = lazy(() => import('./components/contact/Contact'));




function App() {
  const [postTitle, setPostTitle] = useState(null);
  return (
    <BrowserRouter>
      <DynamicTitle postTitle={postTitle} />
      <Header />
      <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bio" element={<Bio />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/category/:category" element={<BlogArchive />} />
        <Route path="/blog/tag/:tag" element={<BlogTagArchive />} />
        <Route path="/blog/:slug" element={<Blog setPageTitle={setPostTitle} />} />
        <Route path="/contact" element={<Contact />} />
        {/* Add more routes as needed */}
      </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
