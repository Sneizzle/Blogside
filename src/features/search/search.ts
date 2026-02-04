import FlexSearch from "flexsearch";
import type { PostDoc } from "../posts/types";

export type SearchHit = { id: string; title: string; summary: string; date: string; tags: string[] };

export async function loadSearchIndex() {
  // Generated at build-time by scripts/build-search.mjs
  const data = await import("../../generated/search-index.json");
  return data.default as { docs: SearchHit[] };
}

export function createSearch(docs: SearchHit[]) {
  const index = new FlexSearch.Index({ tokenize: "forward", cache: true, resolution: 9 });
  docs.forEach((d, i) => index.add(i, `${d.title} ${d.summary} ${d.tags.join(" ")}`));
  return {
    query(q: string, limit = 20): SearchHit[] {
      const trimmed = q.trim();
      if (!trimmed) return [];
      const ids = index.search(trimmed, limit) as number[];
      return ids.map((i) => docs[i]).filter(Boolean);
    },
  };
}
