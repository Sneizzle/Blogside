export type PostBlock =
  | { type: "timeline"; items: { title: string; date?: string; body?: string; badges?: string[] }[] }
  | { type: "cardGrid"; cards: { title: string; body: string; tags?: string[] }[] }
  | { type: "code"; title?: string; language?: string; code: string; note?: string }
  | { type: "callout"; kind: "info" | "warn" | "success"; title: string; body: string };

export type PostDoc = {
  id: string;
  title: string;
  date: string;      // ISO yyyy-mm-dd
  summary: string;
  tags: string[];
  author?: string;
  blocks: PostBlock[];
};
