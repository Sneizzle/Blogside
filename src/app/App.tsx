import React, { useEffect, useMemo, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { applyTheme, getInitialTheme, toggleTheme, type ThemeMode } from "../features/theme/theme";
import { SearchModal } from "../features/search/SearchModal";
import { Home } from "../pages/Home";
import { PostPage } from "../pages/PostPage";

export function App() {
  const [theme, setTheme] = useState<ThemeMode>(() => "dark");
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const mode = getInitialTheme();
    setTheme(mode);
    applyTheme(mode);
  }, []);

  useEffect(() => {
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const isMac = navigator.platform.toLowerCase().includes("mac");
      const cmdk = (isMac && e.metaKey && e.key.toLowerCase() === "k") || (!isMac && e.ctrlKey && e.key.toLowerCase() === "k");
      if (cmdk) {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const themeLabel = theme === "dark" ? "Dark" : "Light";

  return (
    <>
      <header className="container">
        <div className="card cardPad">
          <div className="row" style={{ flexWrap: "wrap" }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <div style={{ display: "grid" }}>
                <span style={{ fontWeight: 800, letterSpacing: "-0.02em" }}>Blogside</span>
                <span className="muted" style={{ fontSize: 12 }}>
                  modular dev-updates • cards • timelines • fast search
                </span>
              </div>
            </Link>

            <div className="spacer" />

            <button className="btn" onClick={() => setSearchOpen(true)} title="Search (Ctrl/⌘K)">
              Search <span className="kbd" style={{ marginLeft: 8 }}>Ctrl/⌘K</span>
            </button>

            <button
              className="btn"
              onClick={() => {
                const next = toggleTheme(theme);
                setTheme(next);
                applyTheme(next);
              }}
              title="Toggle theme"
            >
              Theme: {themeLabel}
            </button>

            <a className="btn" href="https://github.com/Sneizzle/Blogside" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </div>
      </header>

      <main className="container" style={{ paddingTop: 0 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="container" style={{ paddingTop: 0, paddingBottom: 42 }}>
        <div className="muted" style={{ fontSize: 12 }}>
          Built with React + Vite • Deployed via GitHub Actions to GitHub Pages
        </div>
      </footer>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

function NotFound() {
  return (
    <div className="card cardPad">
      <div className="h2">404</div>
      <div className="muted">That route doesn’t exist.</div>
      <div style={{ height: 12 }} />
      <Link className="btn" to="/">Back home</Link>
    </div>
  );
}
