---
phase: 01
plan: 02
title: Ideas CRUD API endpoints
wave: 1
---

# Plan: Ideas CRUD API endpoints

## Goal

Add `GET /api/ideas`, `POST /api/ideas`, `GET /api/ideas/:id`, and `DELETE /api/ideas/:id` endpoints following existing project CRUD patterns exactly.

## Tasks

### Task 1: Add prepared statements for ideas

**File:** `server.js`
**Action:** modify

Locate the `stmts` object (lines 413-437). Add the following two statements inside the object, before the closing `};`. Place them after `markAllNotifsRead`.

```js
  insertIdea:    db.prepare('INSERT INTO ideas (id, title, description, user_id, slug, total_sats_received) VALUES (?, ?, ?, ?, ?, 0)'),
  getIdeaById:   db.prepare('SELECT * FROM ideas WHERE id = ?'),
```

These follow the same naming convention as `insertUser`, `getById`, etc. already in the stmts object.

### Task 2: Add Ideas API section and GET /api/ideas

**File:** `server.js`
**Action:** add

Find the section comment `// ─── Projects API` (line 1920). Insert a new Ideas API section immediately after the project CRUD block ends (after `DELETE /api/projects/:id` or the last project endpoint before the next section comment). Insert the full block below.

```js
// ─── Ideas API ─────────────────────────────────────────────────────────────

app.get('/api/ideas', (req, res) => {
  const { sort } = req.query;
  const orderBy = {
    top:         'votes DESC, i.created_at DESC',
    newest:      'i.created_at DESC',
    oldest:      'i.created_at ASC',
    most_zapped: 'total_sats_received DESC, i.created_at DESC',
    biggest_team: 'team_size DESC, i.created_at DESC',
  }[sort] || 'votes DESC, i.created_at DESC';

  const rows = db.prepare(`
    SELECT i.*,
      u.name as author_name, u.username as author_username, u.avatar as author_avatar,
      COALESCE(v.vote_count, 0) as votes,
      COALESCE(t.team_size, 0) as team_size
    FROM ideas i
    LEFT JOIN users u ON i.user_id = u.id
    LEFT JOIN (SELECT target_id, COUNT(*) as vote_count FROM votes WHERE target_type = 'idea' GROUP BY target_id) v ON i.id = v.target_id
    LEFT JOIN (SELECT idea_id, COUNT(*) as team_size FROM idea_members GROUP BY idea_id) t ON i.id = t.idea_id
    ORDER BY ${orderBy}
  `).all();
  res.json(rows);
});
```

Note: `orderBy` is built from a whitelist map, never from raw user input, so string interpolation is safe here. This matches the approach used in the leaderboard and other multi-sort endpoints.

### Task 3: Add POST /api/ideas

**File:** `server.js`
**Action:** add

Append immediately after the GET /api/ideas handler from Task 2:

```js
app.post('/api/ideas', requireAuth, (req, res) => {
  const { title, description } = req.body;
  if (!title || !title.trim()) return res.status(400).json({ error: 'title required' });
  const id = crypto.randomUUID();
  const slug = uniqueSlug('ideas', toSlug(title.trim()));
  stmts.insertIdea.run(id, title.trim(), description || null, req.user?.id || null, slug);
  if (req.user?.id) cachedBadgeCheck(req.user.id);
  res.json({ id, slug });
});
```

Follows the exact pattern of `POST /api/projects` (line 1940): requireAuth, validate required fields, randomUUID, uniqueSlug, insert, badge check, return `{ id, slug }`.

### Task 4: Add GET /api/ideas/:id

**File:** `server.js`
**Action:** add

Append immediately after POST /api/ideas:

```js
app.get('/api/ideas/:id', (req, res) => {
  const row = db.prepare(`
    SELECT i.*,
      u.name as author_name, u.username as author_username, u.avatar as author_avatar,
      COALESCE(v.vote_count, 0) as votes,
      COALESCE(z.zap_total, 0) as zap_total,
      COALESCE(t.team_size, 0) as team_size
    FROM ideas i
    LEFT JOIN users u ON i.user_id = u.id
    LEFT JOIN (SELECT target_id, COUNT(*) as vote_count FROM votes WHERE target_type = 'idea' GROUP BY target_id) v ON i.id = v.target_id
    LEFT JOIN (SELECT target_id, COALESCE(SUM(amount_sats), 0) as zap_total FROM zaps WHERE target_type = 'idea' AND status = 'confirmed' GROUP BY target_id) z ON i.id = z.target_id
    LEFT JOIN (SELECT idea_id, COUNT(*) as team_size FROM idea_members GROUP BY idea_id) t ON i.id = t.idea_id
    WHERE i.id = ?
  `).get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Not found' });

  const members = db.prepare(`
    SELECT im.id, im.user_id, im.created_at, u.name, u.username, u.avatar
    FROM idea_members im
    LEFT JOIN users u ON im.user_id = u.id
    WHERE im.idea_id = ?
    ORDER BY im.created_at ASC
  `).all(req.params.id);

  res.json({ ...row, members });
});
```

Follows the GET /api/projects/:id pattern (line 1994): single row with LEFT JOINs for counts, 404 on missing, returns full detail object. Adds `members` array in the response (team members with user info) since this is the detail endpoint.

### Task 5: Add DELETE /api/ideas/:id

**File:** `server.js`
**Action:** add

Append immediately after GET /api/ideas/:id:

```js
app.delete('/api/ideas/:id', requireAuth, (req, res) => {
  const idea = stmts.getIdeaById.get(req.params.id);
  if (!idea) return res.status(404).json({ error: 'Not found' });
  if (idea.user_id && req.user?.id !== idea.user_id && !req.user?.is_admin) {
    return res.status(403).json({ error: 'Not your idea' });
  }
  db.prepare('DELETE FROM idea_members WHERE idea_id = ?').run(req.params.id);
  stmts.deleteVotes.run('idea', req.params.id);
  db.prepare('DELETE FROM ideas WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});
```

Follows requireAuth, ownership check (author or admin), cascades deletes to idea_members and votes before deleting the idea row. Matches the pattern used in project and deck delete handlers.

## Verification

- [ ] `POST /api/ideas` with `{ title: "Test Idea" }` returns `{ id, slug }` with a UUID and slugified title
- [ ] `POST /api/ideas` without `title` returns 400 with `{ error: 'title required' }`
- [ ] `POST /api/ideas` without auth returns 401
- [ ] `GET /api/ideas` returns an array (empty or populated)
- [ ] `GET /api/ideas?sort=newest` returns ideas ordered by `created_at DESC`
- [ ] `GET /api/ideas?sort=biggest_team` executes without error
- [ ] `GET /api/ideas?sort=most_zapped` executes without error
- [ ] `GET /api/ideas/:id` for a valid id returns the idea object with `votes`, `zap_total`, `team_size`, `members` fields
- [ ] `GET /api/ideas/:id` for an unknown id returns 404
- [ ] `DELETE /api/ideas/:id` by the author returns `{ ok: true }` and removes the row
- [ ] `DELETE /api/ideas/:id` by a different non-admin user returns 403
- [ ] After delete, `GET /api/ideas/:id` returns 404
