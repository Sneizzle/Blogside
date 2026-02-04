import React from "react";
import { Link, useParams } from "react-router-dom";
import { getPostById } from "../features/posts/loadPosts";
import { PostBlocks } from "../features/posts/PostBlocks";

export function PostPage() {
  const { id } = useParams();
  const post = id ? getPostById(id) : undefined;

  if (!post) {
    return (
      <div className="card cardPad">
        <div className="h2">Post not found</div>
        <div className="muted">No post exists for id: {id}</div>
        <div style={{ height: 12 }} />
        <Link className="btn" to="/">Back home</Link>
      </div>
    );
  }

  return (
    <article className="grid">
      <div className="card cardPad">
        <div className="row" style={{ flexWrap: "wrap" }}>
          <h1 className="h1" style={{ margin: 0 }}>{post.title}</h1>
          <div className="spacer" />
          <span className="chip">{post.date}</span>
        </div>
        <div className="muted" style={{ marginTop: 10 }}>{post.summary}</div>
        <div style={{ height: 12 }} />
        <div className="row" style={{ flexWrap: "wrap" }}>
          {post.tags.map((t) => (
            <span key={t} className="chip">{t}</span>
          ))}
        </div>
      </div>

      <PostBlocks blocks={post.blocks} />

      <div>
        <Link className="btn" to="/">← Back</Link>
      </div>
    </article>
  );
}
