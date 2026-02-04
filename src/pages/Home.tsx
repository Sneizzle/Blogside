import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPosts } from "../features/posts/loadPosts";

export function Home() {
  const all = useMemo(() => getAllPosts(), []);
  const [filter, setFilter] = useState("");

  const tags = useMemo(() => {
    const s = new Set<string>();
    all.forEach((p) => p.tags.forEach((t) => s.add(t)));
    return Array.from(s).sort((a, b) => a.localeCompare(b));
  }, [all]);

  const filtered = useMemo(() => {
    const f = filter.trim().toLowerCase();
    if (!f) return all;
    return all.filter((p) => p.tags.some((t) => t.toLowerCase() === f));
  }, [all, filter]);

  return (
    <div className="grid">
      <div className="card cardPad">
        <h1 className="h1">Dev updates that look like a product</h1>
        <div className="muted" style={{ marginTop: 10 }}>
          Structured posts (cards + timelines), native dark mode, and fast discovery.
        </div>
        <div style={{ height: 14 }} />
        <div className="row" style={{ flexWrap: "wrap" }}>
          <span className="chip">Initial load &lt; 2s</span>
          <span className="chip">Interactions &lt; 100ms</span>
          <span className="chip">Ctrl/⌘K search</span>
        </div>
      </div>

      <div className="card cardPad">
        <div className="row" style={{ flexWrap: "wrap" }}>
          <strong>Filter by tag</strong>
          <div className="spacer" />
          <select
            className="input"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ width: "min(320px, 100%)" }}
          >
            <option value="">All</option>
            {tags.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid">
        {filtered.map((p) => (
          <Link key={p.id} to={`/post/${p.id}`} className="card cardPad" style={{ textDecoration: "none", boxShadow: "none" }}>
            <div className="row" style={{ flexWrap: "wrap" }}>
              <strong style={{ fontSize: 16 }}>{p.title}</strong>
              <div className="spacer" />
              <span className="chip">{p.date}</span>
              {p.tags.slice(0, 3).map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
            <div className="muted" style={{ marginTop: 8 }}>
              {p.summary}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
