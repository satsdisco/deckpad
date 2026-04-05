---
phase: 02
plan: 01
title: Page Routes and Nav Tab
wave: 1
---

# Plan: Page Routes and Nav Tab

## Goal

Add `/foyer` and `/foyer/:id` page routes to server.js and insert "The Foyer" nav tab into every existing HTML file.

## Tasks

### Task 1: Add page routes in server.js
**File:** `server.js`
**Action:** modify

Insert two new page routes after the `/f/:slug` slug redirect block (around line 790). Follow the exact pattern used for `/build` and `/project/:id`.

Add after line 790 (after the `/f/:slug` block, before the `// ─── Upload` divider):

```js
app.get('/foyer',     requireAuth, (_, res) => res.sendFile(path.join(ROOT, 'public', 'foyer.html')));
app.get('/foyer/:id', requireAuth, (_, res) => res.sendFile(path.join(ROOT, 'public', 'foyer-detail.html')));
```

No other changes to server.js in this plan.

### Task 2: Add "The Foyer" tab to build.html
**File:** `public/build.html`
**Action:** modify

Current nav block (lines 102-106):
```html
  <nav class="nav-tabs">
    <a href="/" class="nav-tab active">Build in Public</a>
    <a href="/decks" class="nav-tab">Decks</a>
    
  </nav>
```

Replace with:
```html
  <nav class="nav-tabs">
    <a href="/" class="nav-tab active">Build in Public</a>
    <a href="/decks" class="nav-tab">Decks</a>
    <a href="/foyer" class="nav-tab">The Foyer</a>
  </nav>
```

### Task 3: Add "The Foyer" tab to index.html (Decks page)
**File:** `public/index.html`
**Action:** modify

Current nav (lines 13-16):
```html
  <nav class="nav-tabs">
    <a href="/" class="nav-tab">Build in Public</a>
    <a href="/decks" class="nav-tab active">Decks</a>
    
  </nav>
```

Replace with:
```html
  <nav class="nav-tabs">
    <a href="/" class="nav-tab">Build in Public</a>
    <a href="/decks" class="nav-tab active">Decks</a>
    <a href="/foyer" class="nav-tab">The Foyer</a>
  </nav>
```

### Task 4: Add "The Foyer" tab to project.html
**File:** `public/project.html`
**Action:** modify

Current nav (lines 22-25):
```html
  <nav class="nav-tabs">
    <a href="/" class="nav-tab active">Build in Public</a>
    <a href="/decks" class="nav-tab">Decks</a>
  </nav>
```

Replace with:
```html
  <nav class="nav-tabs">
    <a href="/" class="nav-tab active">Build in Public</a>
    <a href="/decks" class="nav-tab">Decks</a>
    <a href="/foyer" class="nav-tab">The Foyer</a>
  </nav>
```

### Task 5: Add "The Foyer" tab to deck.html
**File:** `public/deck.html`
**Action:** modify

Find nav block with `<a href="/decks" class="nav-tab">Decks</a>` and append:
```html
    <a href="/foyer" class="nav-tab">The Foyer</a>
```

### Task 6: Add "The Foyer" tab to event.html
**File:** `public/event.html`
**Action:** modify

Find nav block (around line 128-131) and append The Foyer tab after the Decks tab:
```html
    <a href="/foyer" class="nav-tab">The Foyer</a>
```

### Task 7: Add "The Foyer" tab to bounty.html
**File:** `public/bounty.html`
**Action:** modify

Find nav block (lines 13-16) and append after the Decks tab:
```html
    <a href="/foyer" class="nav-tab">The Foyer</a>
```

### Task 8: Add "The Foyer" tab to profile.html
**File:** `public/profile.html`
**Action:** modify

Find nav block (lines 22-25) and append after the Decks tab:
```html
    <a href="/foyer" class="nav-tab">The Foyer</a>
```

### Task 9: Add "The Foyer" tab to admin.html
**File:** `public/admin.html`
**Action:** modify

Find nav block (lines 36-39) and append after the Decks tab:
```html
    <a href="/foyer" class="nav-tab">The Foyer</a>
```

### Task 10: Add "The Foyer" tab to vote.html
**File:** `public/vote.html`
**Action:** modify

Find nav block (lines 13-16) and append after the Decks tab:
```html
    <a href="/foyer" class="nav-tab">The Foyer</a>
```

### Task 11: Add "The Foyer" tab to upload.html
**File:** `public/upload.html`
**Action:** modify

Find nav block (lines 13-16) and append after the Decks tab:
```html
    <a href="/foyer" class="nav-tab">The Foyer</a>
```

### Task 12: Add "The Foyer" tab to 404.html
**File:** `public/404.html`
**Action:** modify

Find nav block (lines 13-16) and append after the Decks tab:
```html
    <a href="/foyer" class="nav-tab">The Foyer</a>
```

Note: `live.html` and `welcome.html` do not use the standard nav-tabs pattern; skip them.

## Verification

- [ ] GET /foyer returns 200 and serves foyer.html (once that file exists)
- [ ] GET /foyer/some-uuid returns 200 and serves foyer-detail.html (once that file exists)
- [ ] "The Foyer" tab appears in the nav on every page that has Build in Public and Decks tabs
- [ ] "The Foyer" tab does NOT have the `active` class on any existing page (active state is set by foyer.html and foyer-detail.html)
- [ ] No duplicate nav tabs; each file has exactly 3 tabs: Build in Public, Decks, The Foyer
