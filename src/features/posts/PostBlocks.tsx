import React from "react";
import type { PostBlock } from "./types";

export function PostBlocks({ blocks }: { blocks: PostBlock[] }) {
  return (
    <div className="grid">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "timeline":
            return <Timeline key={i} items={b.items} />;
          case "cardGrid":
            return <CardGrid key={i} cards={b.cards} />;
          case "code":
            return <CodeBlock key={i} title={b.title} language={b.language} code={b.code} note={b.note} />;
          case "callout":
            return <Callout key={i} kind={b.kind} title={b.title} body={b.body} />;
          default:
            return null;
        }
      })}
    </div>
  );
}

function Timeline({ items }: { items: { title: string; date?: string; body?: string; badges?: string[] }[] }) {
  return (
    <section className="card cardPad">
      <div className="h2">Timeline</div>
      <div className="grid">
        {items.map((it, idx) => (
          <div key={idx} style={{ display: "grid", gap: 8, padding: "10px 0", borderTop: idx ? "1px solid var(--border)" : "none" }}>
            <div className="row" style={{ flexWrap: "wrap" }}>
              <strong>{it.title}</strong>
              {it.date ? <span className="chip">{it.date}</span> : null}
              {it.badges?.map((x) => (
                <span key={x} className="chip" style={{ color: "var(--accent)" }}>
                  {x}
                </span>
              ))}
            </div>
            {it.body ? <div className="muted">{it.body}</div> : null}
          </div>
        ))}
      </div>
    </section>
  );
}

function CardGrid({ cards }: { cards: { title: string; body: string; tags?: string[] }[] }) {
  return (
    <section className="grid grid2">
      {cards.map((c, idx) => (
        <div key={idx} className="card cardPad">
          <div className="row" style={{ alignItems: "baseline" }}>
            <div className="h2">{c.title}</div>
            <div className="spacer" />
            {c.tags?.slice(0, 3).map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
          <div className="muted">{c.body}</div>
        </div>
      ))}
    </section>
  );
}

function CodeBlock({ title, language, code, note }: { title?: string; language?: string; code: string; note?: string }) {
  return (
    <section className="card cardPad">
      <div className="row" style={{ flexWrap: "wrap" }}>
        <div className="h2">{title ?? "Code"}</div>
        <div className="spacer" />
        {language ? <span className="chip">{language}</span> : null}
      </div>
      <pre style={{ margin: 0, overflow: "auto", padding: 12, borderRadius: 12, border: "1px solid var(--border)", background: "rgba(0,0,0,0.18)" }}>
        <code style={{ fontFamily: "var(--mono)", fontSize: 13, lineHeight: 1.5 }}>{code}</code>
      </pre>
      {note ? <div className="muted" style={{ marginTop: 10 }}>{note}</div> : null}
    </section>
  );
}

function Callout({ kind, title, body }: { kind: "info" | "warn" | "success"; title: string; body: string }) {
  const borderColor =
    kind === "warn" ? "rgba(250, 204, 21, 0.35)" : kind === "success" ? "rgba(34, 197, 94, 0.35)" : "rgba(125, 211, 252, 0.35)";
  return (
    <section className="card cardPad" style={{ borderColor }}>
      <div className="row" style={{ flexWrap: "wrap" }}>
        <div className="h2">{title}</div>
        <span className="chip" style={{ color: "var(--accent)" }}>{kind}</span>
      </div>
      <div className="muted">{body}</div>
    </section>
  );
}
