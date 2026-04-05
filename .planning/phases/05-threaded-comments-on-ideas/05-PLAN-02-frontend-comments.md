---
phase: 05
plan: 02
title: Comment UI on idea detail page
wave: 1
---

# Plan: Comment UI on idea detail page

## Goal

Replace the "Comments coming soon" placeholder on foyer-detail.html with the full threaded comment system, including sort filters, reply forms, and vote buttons.

## Tasks

### Task 1: Replace comments placeholder
**File:** `public/foyer-detail.html`
**Action:** modify

Replace the static comments section with dynamic comment form area, sort filters, and comment list div. Same HTML structure as project.html comments section.

### Task 2: Add comment JavaScript
**File:** `public/foyer-detail.html`
**Action:** add

Add functions copied from project.html pattern, adapted for ideas:
- loadIdeaComments(): fetch GET /api/ideas/:id/comments, build thread data, render
- buildIdeaThreadData(): group into roots + replies
- sortIdeaComments(): sort by top/newest/oldest/threads
- renderIdeaThread(): render root + kids with reply input
- postIdeaComment(): POST to /api/ideas/:id/comments
- postIdeaReply(): POST with parent_id
- voteIdeaComment(): POST /api/vote with type='comment'

### Task 3: Call loadIdeaComments after idea loads
**File:** `public/foyer-detail.html`
**Action:** modify

In loadIdea(), after rendering the idea content, call loadIdeaComments().

## Verification

- [ ] Comments section renders on idea detail page
- [ ] Can post a top-level comment
- [ ] Can reply to a comment (thread appears inline)
- [ ] Sort filters work (Top, Newest, Oldest, Biggest Threads)
- [ ] Vote button on comments toggles correctly
- [ ] Quick reply input visible at bottom of threads with replies
