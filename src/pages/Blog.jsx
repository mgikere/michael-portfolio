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
