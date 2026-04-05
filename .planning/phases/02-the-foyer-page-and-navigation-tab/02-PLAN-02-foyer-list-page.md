---
phase: 02
plan: 02
title: Foyer List Page
wave: 1
---

# Plan: Foyer List Page

## Goal

Create `public/foyer.html` with a bubble/tag-cloud layout, sort filter pills, and a "Post Idea" FAB that opens a modal to submit new ideas via `POST /api/ideas`.

## Tasks

### Task 1: Create public/foyer.html
**File:** `public/foyer.html`
**Action:** create

Full file content:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>The Foyer — LunarPad</title>
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

<div class="container foyer-page">
  <div class="foyer-header">
    <h1 class="foyer-title">The Foyer</h1>
    <p class="foyer-subtitle">Ideas looking for builders. Bigger bubbles have more votes.</p>
  </div>

  <div class="foyer-filters" id="foyerFilters">
    <button class="comment-filter active" data-sort="top">Top</button>
    <button class="comment-filter" data-sort="newest">Newest</button>
    <button class="comment-filter" data-sort="most_zapped">Most Zapped</button>
    <button class="comment-filter" data-sort="biggest_team">Biggest Teams</button>
  </div>

  <div class="foyer-container" id="bubbleContainer">
    <div class="empty-state"><p>Loading ideas...</p></div>
  </div>
</div>

<!-- Post Idea Modal -->
<div class="modal-overlay" id="postIdeaModal">
  <div class="modal-content" style="max-width:480px">
    <button class="modal-close" onclick="this.closest('.modal-overlay').classList.remove('open')">&times;</button>
    <div class="modal-title">Post an Idea</div>
    <div class="form-group">
      <label>Title</label>
      <input type="text" id="ideaTitle" placeholder="What's the idea?" maxlength="120">
    </div>
    <div class="form-group">
      <label>Description</label>
      <textarea id="ideaDesc" placeholder="Describe the problem, the opportunity, or what you'd build..." rows="5"></textarea>
    </div>
    <div class="modal-actions">
      <button class="btn" onclick="this.closest('.modal-overlay').classList.remove('open')">Cancel</button>
      <button class="btn btn-primary" onclick="submitIdea()">Post Idea</button>
    </div>
  </div>
</div>

<button class="fab" title="Post Idea" onclick="document.getElementById('postIdeaModal').classList.add('open')">
  <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
  <span class="fab-label">Post Idea</span>
</button>

<script src="/js/auth.js"></script>
<script>
'use strict';

let _currentSort = 'top';

function esc(s) {
  if (s == null) return '';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function bubbleSize(votes, maxVotes) {
  const MIN = 90;
  const MAX = 200;
  if (!maxVotes || maxVotes === 0) return MIN;
  const ratio = Math.log(votes + 1) / Math.log(maxVotes + 1);
  return Math.round(MIN + ratio * (MAX - MIN));
}

async function loadIdeas(sort) {
  _currentSort = sort || _currentSort;
  const container = document.getElementById('bubbleContainer');
  container.innerHTML = '<div class="empty-state"><p>Loading...</p></div>';
  try {
    const res = await fetch(`/api/ideas?sort=${_currentSort}`);
    if (!res.ok) throw new Error();
    const ideas = await res.json();
    if (!ideas.length) {
      container.innerHTML = '<div class="empty-state"><p>No ideas yet. Be the first to post one.</p></div>';
      return;
    }
    const maxVotes = Math.max(...ideas.map(i => i.vote_count || 0), 1);
    container.innerHTML = ideas.map(idea => {
      const size = bubbleSize(idea.vote_count || 0, maxVotes);
      const votes = idea.vote_count || 0;
      return `<div class="idea-bubble" style="width:${size}px;height:${size}px" onclick="location.href='/foyer/${esc(idea.id)}'" title="${esc(idea.title)}">
        <span class="bubble-title">${esc(idea.title)}</span>
        <span class="bubble-votes">${votes}</span>
      </div>`;
    }).join('');
  } catch {
    container.innerHTML = '<div class="empty-state"><p>Failed to load ideas.</p></div>';
  }
}

async function submitIdea() {
  const title = document.getElementById('ideaTitle').value.trim();
  const description = document.getElementById('ideaDesc').value.trim();
  if (!title) { alert('Title is required.'); return; }
  try {
    const res = await fetch('/api/ideas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      alert(err.error || 'Failed to post idea.');
      return;
    }
    document.getElementById('postIdeaModal').classList.remove('open');
    document.getElementById('ideaTitle').value = '';
    document.getElementById('ideaDesc').value = '';
    loadIdeas('newest');
    document.querySelector('[data-sort="newest"]').click();
  } catch {
    alert('Network error. Please try again.');
  }
}

document.getElementById('foyerFilters').addEventListener('click', e => {
  const btn = e.target.closest('.comment-filter');
  if (!btn) return;
  document.querySelectorAll('#foyerFilters .comment-filter').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  loadIdeas(btn.dataset.sort);
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
});

document.addEventListener('DOMContentLoaded', () => loadIdeas('top'));

initAuth();
</script>
</body>
</html>
```

## Verification

- [ ] GET /foyer loads the page without errors
- [ ] Bubble container renders idea bubbles fetched from GET /api/ideas
- [ ] Bubble sizes vary visually: an idea with more votes is larger than one with fewer votes
- [ ] Clicking a bubble navigates to /foyer/{id}
- [ ] Sort filter pills change active state on click and reload bubbles with the correct sort param
- [ ] FAB "Post Idea" button is visible bottom-right
- [ ] Clicking FAB opens the Post Idea modal
- [ ] Submitting the modal with a title calls POST /api/ideas and refreshes the bubble view
- [ ] Submitting without a title shows an alert and does not submit
- [ ] Empty ideas list shows a friendly empty state message
- [ ] Pressing Escape closes the modal
- [ ] "The Foyer" nav tab has the `active` class on this page; Build in Public and Decks do not
