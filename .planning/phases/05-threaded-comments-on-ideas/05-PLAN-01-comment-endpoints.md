---
phase: 05
plan: 01
title: Idea comment API endpoints
wave: 1
---

# Plan: Idea comment API endpoints

## Goal

Add GET and POST comment endpoints for ideas, reusing the existing comment table and thread-scoped notification logic.

## Tasks

### Task 1: Add GET /api/ideas/:id/comments
**File:** `server.js`
**Action:** add

Insert after the POST /api/ideas/:id/leave endpoint, before the Project Deck Versions section. Follow exact pattern from GET /api/projects/:id/comments.

### Task 2: Add POST /api/ideas/:id/comments
**File:** `server.js`
**Action:** add

Insert after the GET endpoint. Accept { content, parent_id }. Validate parent_id if provided. Use deck_id = idea_id (same convention as projects). Thread-scoped notifications: top-level notifies idea author only, reply notifies author + thread participants.

## Verification

- [ ] GET /api/ideas/:id/comments returns array with vote counts
- [ ] POST /api/ideas/:id/comments creates comment with idea ID in deck_id
- [ ] POST with parent_id creates a threaded reply
- [ ] Notification fires for idea author on top-level comment
- [ ] Thread participants notified on reply, not all commenters
