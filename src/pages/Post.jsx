Perfect! Let’s fully update your setup to use front-matter instead of gray-matter. I’ll provide complete, working examples for getPosts.js, Post.jsx, and Blog.jsx. This will work on Netlify without Node-only modules.


---

getPosts.js

import fm from "front-matter";

export async function getPosts() {
  const modules = import.meta.glob("../posts/*.md", { eager: true });

  const posts = Object.entries(modules).map(([path, mod]) => {
    const raw = mod.default ?? mod;
    const parsed = fm(raw);

    return {
      ...parsed.attributes, // metadata (title, date, slug, etc.)
      content: parsed.body, // markdown content
      slug: parsed.attributes.slug ?? path.split("/").pop().replace(/\.md$/, ""),
      _path: path,
    };
  });

  // Sort newest first
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  return posts;
}


---

Post.jsx

Assuming you’re rendering a single post:

import React from "react";
import { useParams } from "react-router-dom";
import { getPosts } from "../lib/getPosts";
import ReactMarkdown from "react-markdown";

export default function Post() {
  const { slug } = useParams();
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    async function fetchPost() {
      const posts = await getPosts();
      const found = posts.find((p) => p.slug === slug);
      setPost(found);
    }
    fetchPost();
  }, [slug]);

  if (!post) return <p>Loading...</p>;

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{new Date(post.date).toLocaleDateString()}</p>
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </article>
  );
}


---

Blog.jsx

Assuming this is the list of all posts:

import React from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../lib/getPosts";

export default function Blog() {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    async function fetchPosts() {
      const allPosts = await getPosts();
      setPosts(allPosts);
    }
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={`/blog/${post.slug}`}>
              {post.title} — {new Date(post.date).toLocaleDateString()}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}


---

✅ Notes

1. Browser-friendly: front-matter works in Vite/Netlify builds.


2. Markdown rendering: I used react-markdown to render content. If you don’t have it, install it:



npm install react-markdown

3. Slugs default to the filename if not specified in frontmatter.


4. _path is optional but can help for debugging.




---

If you want, I can also rewrite your vite.config.js or md import setup so you can dynamically import markdown with syntax highlighting and images fully working on Netlify. That makes your blog fully production-ready.

Do you want me to do that next?

