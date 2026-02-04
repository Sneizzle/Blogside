import type { PostDoc } from "./types";

// Vite will include these JSON files in the bundle (fast, simple, and works on GitHub Pages).
const modules = import.meta.glob<{ default: PostDoc }>("../../content/posts/*.json", { eager: true });

export function getAllPosts(): PostDoc[] {
  const posts = Object.values(modules).map((m) => m.default);
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  return posts;
}

export function getPostById(id: string): PostDoc | undefined {
  return getAllPosts().find((p) => p.id === id);
}
