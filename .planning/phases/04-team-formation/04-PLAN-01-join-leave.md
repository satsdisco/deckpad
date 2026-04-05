---
phase: 04
plan: 01
title: Team join/leave endpoints and frontend wiring
wave: 1
---

# Plan: Team join/leave endpoints and frontend wiring

## Goal

Add join/leave API endpoints for idea teams and wire the button on the detail page.

## Tasks

### Task 1: Add POST /api/ideas/:id/join
**File:** `server.js`
**Action:** add

Insert after the GET /api/ideas/:id/zaps endpoint, before the Project Deck Versions section.

```js
// POST /api/ideas/:id/join — join the idea team
app.post('/api/ideas/:id/join', requireAuth, (req, res) => {
  const idea = stmts.getIdeaById.get(req.params.id);
  if (!idea) return res.status(404).json({ error: 'Idea not found' });
  const existing = db.prepare('SELECT id FROM idea_members WHERE idea_id = ? AND user_id = ?').get(req.params.id, req.user.id);
  if (existing) return res.status(409).json({ error: 'Already a member' });
  const id = crypto.randomUUID();
  db.prepare('INSERT INTO idea_members (id, idea_id, user_id) VALUES (?, ?, ?)').run(id, req.params.id, req.user.id);
  res.json({ ok: true });
});
```

### Task 2: Add POST /api/ideas/:id/leave
**File:** `server.js`
**Action:** add

Insert immediately after the join endpoint.

```js
// POST /api/ideas/:id/leave — leave the idea team
app.post('/api/ideas/:id/leave', requireAuth, (req, res) => {
  const result = db.prepare('DELETE FROM idea_members WHERE idea_id = ? AND user_id = ?').run(req.params.id, req.user.id);
  if (!result.changes) return res.status(404).json({ error: 'Not a member' });
  res.json({ ok: true });
});
```

### Task 3: Wire Join Team button on detail page
**File:** `public/foyer-detail.html`
**Action:** modify

In renderIdea(), replace the disabled Join Team button with a dynamic one:
```html
<button class="btn btn-sm" id="joinBtn" onclick="toggleTeam()">Join Team</button>
```

After loadIdea() completes, check if current user is a team member and set button state.

Add functions:
- `initTeamState()`: check if user's ID is in idea.members, set button text accordingly
- `toggleTeam()`: POST join or leave, refresh team list and button
- `refreshTeam()`: re-fetch idea, update members section and team count

### Task 4: Update team member rendering
**File:** `public/foyer-detail.html`
**Action:** modify

The members section already renders in renderIdea(). After join/leave, call refreshTeam() which re-fetches the idea and updates just the members section and stats without full page reload.

## Verification

- [ ] POST /api/ideas/:id/join adds user to team, returns { ok: true }
- [ ] POST /api/ideas/:id/join again returns 409
- [ ] POST /api/ideas/:id/leave removes user, returns { ok: true }
- [ ] POST /api/ideas/:id/leave when not a member returns 404
- [ ] Detail page shows "Join Team" for non-members, "Leave Team" for members
- [ ] Team list updates immediately after join/leave
- [ ] Team count in stats row updates
