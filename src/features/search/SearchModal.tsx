import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { createSearch, loadSearchIndex, type SearchHit } from "./search";

export function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const [docs, setDocs] = useState<SearchHit[] | null>(null);

  useEffect(() => {
    if (!open) return;
    let alive = true;
    loadSearchIndex().then((d) => alive && setDocs(d.docs));
    return () => {
      alive = false;
    };
  }, [open]);

  const engine = useMemo(() => (docs ? createSearch(docs) : null), [docs]);
  const results = useMemo(() => (engine ? engine.query(q, 20) : []), [engine, q]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        display: "grid",
        placeItems: "center",
        padding: 16,
        zIndex: 50,
      }}
      onMouseDown={onClose}
    >
      <div className="card" style={{ width: "min(900px, 100%)" }} onMouseDown={(e) => e.stopPropagation()}>
        <div className="cardPad">
          <div className="row">
            <strong>Search</strong>
            <div className="spacer" />
            <span className="kbd">Esc</span>
          </div>
          <div style={{ height: 10 }} />
          <input className="input" placeholder="Search posts… (title, tags, summary)" value={q} onChange={(e) => setQ(e.target.value)} autoFocus />
          <hr className="sep" />
          {!docs ? (
            <div className="muted">Loading index…</div>
          ) : results.length === 0 ? (
            <div className="muted">No results.</div>
          ) : (
            <div className="grid" style={{ maxHeight: 440, overflow: "auto" }}>
              {results.map((r) => (
                <Link key={r.id} to={`/post/${r.id}`} onClick={onClose} className="card cardPad" style={{ boxShadow: "none" }}>
                  <div className="row" style={{ flexWrap: "wrap" }}>
                    <strong>{r.title}</strong>
                    <span className="chip">{r.date}</span>
                    {r.tags.slice(0, 3).map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="muted">{r.summary}</div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
