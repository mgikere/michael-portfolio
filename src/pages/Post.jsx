import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPosts } from "../utils/getPosts";
import { marked } from "marked";

export default function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    getPosts().then((all) => {
      const match = all.find((p) => p.slug === slug);
      setPost(match || null);
    });
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Post not found.</p>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-sm text-gray-600 mb-6">
        {new Date(post.date).toLocaleDateString()}
      </p>

      {post.cover && (
        <img
          src={post.cover}
          alt={post.cover_alt ?? post.title}
          className="w-full h-64 object-cover rounded mb-6"
        />
      )}

      <div
        className="prose prose-lg"
        dangerouslySetInnerHTML={{ __html: marked(post.content || "") }}
      />

      <div className="mt-10">
        <Link to="/blog" className="text-blue-600">
          ← Back to Blog
        </Link>
      </div>
    </article>
  );
}
