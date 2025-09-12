import { Routes, Route, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Blog from "./pages/Blog";
import Post from "./pages/Post"; // ✅ Added single post page
import PortfolioGrid from "./components/PortfolioGrid";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Navigation */}
      <nav className="p-4 bg-gray-100 flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/blog">Blog</Link>
      </nav>

      {/* Routes */}
      <Routes>
        {/* Home / Portfolio Page */}
        <Route
          path="/"
          element={
            <>
              {/* Hero Section */}
              <section className="flex flex-col items-center justify-center h-screen text-center px-6">
                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl md:text-6xl font-bold mb-4"
                >
                  Versatile Freelance Writer
                </motion.h1>
                <p className="text-lg md:text-xl max-w-2xl mb-6">
                  Clear, engaging content across industries. From blog posts and
                  articles to persuasive copy, I craft words that connect and
                  deliver results.
                </p>
                <Link
                  to="/blog"
                  className="rounded-2xl px-6 py-3 text-lg bg-blue-600 text-white"
                >
                  View My Work
                </Link>
              </section>

              {/* About Section */}
              <section className="py-20 px-6 max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6">About Me</h2>
                <p className="text-lg mb-4">
                  I’ve written across technology, health, lifestyle, and
                  business. My strength lies in adapting tone and style to
                  different audiences — whether it’s an in-depth guide, an
                  SEO-friendly blog post, or persuasive website copy.
                </p>
                <p className="text-lg">
                  Great writing doesn’t just inform — it connects. My goal is to
                  make every piece resonate with readers while achieving your
                  business objectives.
                </p>
              </section>

              {/* Portfolio Section */}
              <PortfolioGrid limit={6} />

              {/* Services Section */}
              <section className="py-20 px-6 max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6">Services</h2>
                <ul className="space-y-4 text-lg">
                  <li>✍️ Blog & Article Writing – SEO-friendly and engaging</li>
                  <li>📝 Copywriting – Website and landing page content</li>
                  <li>
                    🔍 Editing & Proofreading – Clarity, tone, and polish
                  </li>
                  <li>
                    📑 Case Studies & Whitepapers – Research-driven and
                    authoritative
                  </li>
                </ul>
              </section>

              {/* Contact Section */}
              <section className="py-20 px-6 bg-gray-100 text-center">
                <h2 className="text-3xl font-bold mb-6">Let’s Work Together</h2>
                <p className="text-lg mb-6 max-w-2xl mx-auto">
                  Looking for a writer who can adapt to your brand’s voice and
                  deliver engaging content on time? Let’s connect.
                </p>
                <p className="text-lg font-medium">📧 yourname@email.com</p>
                <p className="text-lg">🔗 LinkedIn: linkedin.com/in/yourname</p>
                <button className="mt-6 rounded-2xl px-6 py-3 text-lg bg-blue-600 text-white">
                  Get in Touch
                </button>
              </section>
            </>
          }
        />

        {/* Blog Page */}
        <Route path="/blog" element={<Blog />} />

        {/* Single Blog Post */}
        <Route path="/blog/:slug" element={<Post />} />
      </Routes>
    </div>
  );
}
