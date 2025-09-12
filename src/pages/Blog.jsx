import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../utils/getPosts"; // ✅ named import

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [debug, setDebug] = useState("🟡 Blog.jsx loaded");

  useEffect(() => {
    setDebug("🔄 Blog.jsx useEffect running...");

    getPosts()
      .then((data) => {
        setDebug("✅ Posts loaded: " + data.length);
        setPosts(data);
      })
      .catch((err) => {
        setDebug("❌ Error loading posts: " + err.message);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>

      {/* Debug message visibly on screen */}
      <p className="text-sm text-red-600 mb-4">{debug}</p>

      {posts.length === 0 ? (
        <p>No posts yet</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <div
              key={index}
              className="rounded-xl shadow p-4 bg-white hover:shadow-lg transition"
            >
              {/* Show cover image if available */}
              {post.cover && (
                <img
                  src={post.cover}
                  alt={post.title}
                  className="rounded-lg mb-3 w-full h-40 object-cover"
                />
              )}
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-600 text-sm mb-2">{post.date}</p>
              <Link
                to={`/blog/${post.slug}`}
                className="text-blue-600 font-medium"
              >
                Read more →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
