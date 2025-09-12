import matter from "gray-matter";

export async function getPosts() {
  const modules = import.meta.glob("../posts/*.md", { eager: true });

  const posts = Object.entries(modules).map(([path, mod]) => {
    const raw = mod.default ?? mod;
    const { data, content } = matter(raw);
    return {
      ...data,
      content,
      slug: data.slug ?? path.split("/").pop().replace(/\.md$/, ""),
      _path: path,
    };
  });

  // Sort newest first
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  return posts;
}
