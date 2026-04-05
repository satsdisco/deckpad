---
phase: 02
plan: 03
title: Foyer Detail Page
wave: 1
---

# Plan: Foyer Detail Page

## Goal

Create `public/foyer-detail.html` as a focused idea detail view: centered card with title, description, author info, vote/zap/team placeholders, and a comments section placeholder for future phases.

## Tasks

### Task 1: Create public/foyer-detail.html
**File:** `public/foyer-detail.html`
**Action:** create

Full file content:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Idea — LunarPad</title>
<link rel="stylesheet" href="/css/style.css">
</head>
<body>

<header class="header">
  <a href="/" class="logo">Lunar <span class="logo-slash"> \ </span><span class="logo-accent">Pad</span></a>
  <nav class="nav-tabs">
    <a href="/" class="nav-tab">Build in Public</a>
    <a href="/decks" class="nav-tab">Decks</a>
    <a href="/foyer" class="nav-tab active">The Foyer</a>
  </nav>
  <div class="header-actions" id="authArea">
    <div id="userArea"></div>
  </div>
</header>

<div class="container foyer-detail-page">
  <a href="/foyer" class="viewer-back">The Foyer</a>

  <div id="ideaContent">
    <div class="empty-state"><p>Loading...</p></div>
  </div>
</div>

<script src="/js/auth.js"></script>
<script>
'use strict';

function esc(s) {
  if (s == null) return '';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function timeAgo(ts) {
  if (!ts) return '';
  const diff = Math.floor((Date.now() - new Date(ts).getTime()) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
  if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
  return Math.floor(diff / 86400) + 'd ago';
}

function ideaId() {
  return location.pathname.split('/').pop();
}

async function loadIdea() {
  const el = document.getElementById('ideaContent');
  try {
    const res = await fetch(`/api/ideas/${ideaId()}`);
    if (res.status === 404) {
      el.innerHTML = '<div class="empty-state"><p>Idea not found.</p></div>';
      return;
    }
    if (!res.ok) throw new Error();
    const idea = await res.json();

    document.title = `${idea.title} — LunarPad`;

    const authorAvatar = idea.author_avatar
      ? `<img src="${esc(idea.author_avatar)}" class="foyer-detail-avatar" alt="${esc(idea.author_name)}">`
      : `<div class="foyer-detail-avatar foyer-detail-avatar-fallback">${esc((idea.author_name || '?')[0]).toUpperCase()}</div>`;

    el.innerHTML = `
      <div class="foyer-detail-card">
        <div class="foyer-detail-meta-top">
          <span class="foyer-detail-label">Idea</span>
          <span class="foyer-detail-time">${esc(timeAgo(idea.created_at))}</span>
        </div>

        <h1 class="foyer-detail-title">${esc(idea.title)}</h1>

        ${idea.description ? `<p class="foyer-detail-desc">${esc(idea.description)}</p>` : ''}

        <div class="foyer-detail-author">
          ${authorAvatar}
          <a href="/profile/${esc(idea.user_id)}" class="foyer-detail-author-name">${esc(idea.author_name || 'Anonymous')}</a>
        </div>

        <div class="foyer-detail-stats">
          <div class="foyer-stat">
            <span class="foyer-stat-value">${idea.vote_count || 0}</span>
            <span class="foyer-stat-label">votes</span>
          </div>
          <div class="foyer-stat">
            <span class="foyer-stat-value">${idea.total_sats_received || 0}</span>
            <span class="foyer-stat-label">sats</span>
          </div>
          <div class="foyer-stat">
            <span class="foyer-stat-value">${idea.team_size || 0}</span>
            <span class="foyer-stat-label">builders</span>
          </div>
        </div>

        <div class="foyer-detail-actions">
          <button class="btn" disabled title="Voting coming in Phase 3">Upvote</button>
          <button class="btn" disabled title="Zapping coming in Phase 3">Zap &#9889;</button>
          <button class="btn" disabled title="Team joining coming in Phase 4">Join Team</button>
        </div>

        <div class="foyer-detail-section" id="teamSection">
          <div class="foyer-section-heading">Team</div>
          <div class="foyer-empty-section">No builders yet. Join to be first.</div>
        </div>

        <div class="foyer-detail-section" id="comments">
          <div class="foyer-section-heading">Discussion</div>
          <div class="foyer-empty-section">Comments coming in Phase 5.</div>
        </div>
      </div>
    `;
  } catch {
    el.innerHTML = '<div class="empty-state"><p>Failed to load idea.</p></div>';
  }
}

document.addEventListener('DOMContentLoaded', loadIdea);

initAuth();
</script>
</body>
</html>
```

## Verification

- [ ] GET /foyer/{valid-uuid} loads the page and displays the idea title, description, and author
- [ ] Page title updates to the idea title once loaded
- [ ] Author avatar renders as an image when present, falls back to initial letter when not
- [ ] Author name links to /profile/{user_id}
- [ ] Vote count, sats, and team size stats render (showing 0 when none)
- [ ] Upvote, Zap, and Join Team buttons are visible but disabled (Phase 3/4 placeholders)
- [ ] Team section renders with placeholder text
- [ ] Comments section renders with placeholder text and has id="comments"
- [ ] GET /foyer/{invalid-uuid} shows "Idea not found" empty state
- [ ] "The Foyer" nav tab has the `active` class; Build in Public and Decks do not
- [ ] "The Foyer" back link navigates to /foyer
