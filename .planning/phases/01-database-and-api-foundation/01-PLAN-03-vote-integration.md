---
phase: 01
plan: 03
title: Vote system integration and slug redirect for ideas
wave: 1
---

# Plan: Vote system integration and slug redirect for ideas

## Goal

Add 'idea' to the vote type validation, wire badge checks for idea votes, and add the `/f/:slug` slug redirect route.

## Tasks

### Task 1: Add 'idea' to POST /api/vote type validation

**File:** `server.js`
**Action:** modify

Locate line 2403:

```js
  if (!['deck', 'speaker', 'project', 'comment'].includes(type) || !id) {
    return res.status(400).json({ error: 'type (deck|speaker|project|comment) and id required' });
  }
```

Replace with:

```js
  if (!['deck', 'speaker', 'project', 'comment', 'idea'].includes(type) || !id) {
    return res.status(400).json({ error: 'type (deck|speaker|project|comment|idea) and id required' });
  }
```

This is the only validation gate. Once 'idea' passes, the existing `stmts.hasVoted`, `stmts.addVote`, `stmts.removeVote`, and `stmts.getVoteCount` prepared statements work without changes since they use `target_type` and `target_id` generically.

### Task 2: Add idea vote notification and badge check

**File:** `server.js`
**Action:** modify

Locate the vote notification block inside `app.post('/api/vote', ...)` (lines 2414-2423). It currently handles `deck`, `project`, and `comment`. Add an `idea` branch in the same pattern.

Find the existing block:

```js
    } else if (type === 'comment') {
      const _c = db.prepare('SELECT user_id, content FROM comments WHERE id = ?').get(id);
      if (_c?.user_id) notify(_c.user_id, 'vote', req.user.id, actorName, 'comment', id, (_c.content || '').substring(0, 50));
    }
```

Replace with:

```js
    } else if (type === 'comment') {
      const _c = db.prepare('SELECT user_id, content FROM comments WHERE id = ?').get(id);
      if (_c?.user_id) notify(_c.user_id, 'vote', req.user.id, actorName, 'comment', id, (_c.content || '').substring(0, 50));
    } else if (type === 'idea') {
      const _i = db.prepare('SELECT user_id, title FROM ideas WHERE id = ?').get(id);
      if (_i?.user_id) notify(_i.user_id, 'vote', req.user.id, actorName, 'idea', id, _i.title);
    }
```

### Task 3: Add idea badge check trigger

**File:** `server.js`
**Action:** modify

Locate the badge check block immediately after the notification block (lines 2426-2429):

```js
  if (type === 'project' && !existing) {
    const proj = db.prepare('SELECT user_id FROM projects WHERE id = ?').get(id);
    if (proj?.user_id) cachedBadgeCheck(proj.user_id);
  }
```

Replace with:

```js
  if (type === 'project' && !existing) {
    const proj = db.prepare('SELECT user_id FROM projects WHERE id = ?').get(id);
    if (proj?.user_id) cachedBadgeCheck(proj.user_id);
  }
  if (type === 'idea' && !existing) {
    const idea = db.prepare('SELECT user_id FROM ideas WHERE id = ?').get(id);
    if (idea?.user_id) cachedBadgeCheck(idea.user_id);
  }
```

Mirrors the project pattern exactly. `cachedBadgeCheck` is rate-limited to 60s per user so calling it here is safe.

### Task 4: Update GET /api/vote/count and GET /api/vote/check type validation

**File:** `server.js`
**Action:** modify

Both GET vote endpoints have their own type validation arrays that must also accept 'idea'.

Locate line 2436 (GET /api/vote/count):

```js
  if (!['deck', 'speaker', 'project', 'comment'].includes(type) || !id) {
    return res.status(400).json({ error: 'type and id required' });
  }
```

Replace with:

```js
  if (!['deck', 'speaker', 'project', 'comment', 'idea'].includes(type) || !id) {
    return res.status(400).json({ error: 'type and id required' });
  }
```

Locate line 2448 (GET /api/vote/check):

```js
  if (!['deck', 'speaker', 'project', 'comment'].includes(type) || !ids) {
    return res.status(400).json({ error: 'type and ids required' });
  }
```

Replace with:

```js
  if (!['deck', 'speaker', 'project', 'comment', 'idea'].includes(type) || !ids) {
    return res.status(400).json({ error: 'type and ids required' });
  }
```

### Task 5: Add /f/:slug redirect route

**File:** `server.js`
**Action:** add

Locate the slug routes at lines 754-763:

```js
app.get('/d/:slug', requireAuth, (req, res) => {
  const deck = db.prepare('SELECT id FROM decks WHERE slug = ?').get(req.params.slug);
  if (!deck) return res.redirect('/decks');
  res.redirect(301, `/deck/${deck.id}`);
});
app.get('/p/:slug', requireAuth, (req, res) => {
  const project = db.prepare('SELECT id FROM projects WHERE slug = ?').get(req.params.slug);
  if (!project) return res.redirect('/');
  res.redirect(301, `/project/${project.id}`);
});
```

Append the idea slug route immediately after `/p/:slug`:

```js
app.get('/f/:slug', requireAuth, (req, res) => {
  const idea = db.prepare('SELECT id FROM ideas WHERE slug = ?').get(req.params.slug);
  if (!idea) return res.redirect('/foyer');
  res.redirect(301, `/foyer/${idea.id}`);
});
```

Follows the identical pattern of `/d/:slug` and `/p/:slug`. Uses 301 (permanent redirect) consistent with existing slug routes. Redirects to `/foyer` (the ideas list) on miss, consistent with the phase 2 page route destination.

## Verification

- [ ] `POST /api/vote` with `{ type: 'idea', id: '<valid-idea-id>' }` returns `{ votes: 1, voted: true }`
- [ ] Voting again on the same idea removes the vote and returns `{ votes: 0, voted: false }`
- [ ] `POST /api/vote` with `{ type: 'idea', id: '<unknown-id>' }` returns votes: 0 (no error — consistent with existing behavior for non-existent targets)
- [ ] `POST /api/vote` with an invalid type (e.g. `'widget'`) still returns 400
- [ ] `GET /api/vote/count?type=idea&id=<id>` returns `{ votes: N, voted: bool }`
- [ ] `GET /api/vote/check?type=idea&ids=<id1>,<id2>` returns a map of id to vote state
- [ ] A notification row is created for the idea author when a different user votes on their idea
- [ ] `GET /f/<valid-slug>` returns a 301 redirect to `/foyer/<id>`
- [ ] `GET /f/nonexistent-slug` returns a redirect to `/foyer`
