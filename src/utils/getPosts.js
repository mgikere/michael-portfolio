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
