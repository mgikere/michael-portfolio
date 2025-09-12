import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../utils/getPosts";

export default function PortfolioGrid({ limit = 6 }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  const shown = limit ? posts.slice(0, limit) : posts;

  return (
    <section id="portfolio" className="py-20 px-6 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10">Portfolio</h2>

      {shown.length === 0 ? (
        <p className="text-center">No posts yet.</p>
      ) : (
        <div className="grid gap-8 max-w-6xl mx-auto sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((post) => (
            <article
              key={post.slug}
              className="rounded-2xl shadow-md bg-white overflow-hidden"
            >
              <Link to={`/blog/${post.slug}`} className="block">
                <div className="h-44 w-full bg-gray-200 overflow-hidden">
                  {post.cover ? (
                    <img
                      src={post.cover}
                      alt={post.cover_alt ?? post.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xl text-gray-500">
                      No image
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">{post.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {new Date(post.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700">
                    {(post.content || "").slice(0, 120)}
                    {(post.content || "").length > 120 ? "…" : ""}
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
