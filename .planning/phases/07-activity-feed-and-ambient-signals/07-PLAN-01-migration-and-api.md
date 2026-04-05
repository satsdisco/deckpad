---
phase: 07
plan: 01
title: Migration and API
wave: 1
---

# Plan 01: Migration and API

## Objective

Add view tracking columns to the ideas table and build the GET /api/foyer/activity endpoint that powers the activity feed sidebar.

## Files to Modify

- `server.js`

## Tasks

### 1. Migration v013: add view tracking columns

Add to the MIGRATIONS array after the existing v012 entry (server.js ~line 310):

```js
{ name: 'v013_idea_views', sql: [
  'ALTER TABLE ideas ADD COLUMN views_today INTEGER DEFAULT 0',
  'ALTER TABLE ideas ADD COLUMN views_date TEXT',
]},
```

Both columns are nullable-safe: views_today defaults to 0, views_date is NULL until first view.

### 2. Update GET /api/ideas/:id to increment views_today

Location: server.js ~line 2148. After the `if (!row)` 404 check and before `res.json(...)`, add view tracking:

```js
// Increment views_today (reset if date has changed)
const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
if (row.views_date === today) {
  db.prepare('UPDATE ideas SET views_today = views_today + 1 WHERE id = ?').run(req.params.id);
  row.views_today = (row.views_today || 0) + 1;
} else {
  db.prepare('UPDATE ideas SET views_today = 1, views_date = ? WHERE id = ?').run(today, req.params.id);
  row.views_today = 1;
  row.views_date = today;
}
```

This runs synchronously (SQLite sync driver) so the response always reflects the incremented count.

### 3. Add GET /api/foyer/activity endpoint

Add after the Ideas API section (server.js ~line 2241), before the comments endpoint:

```js
// GET /api/foyer/activity — recent high-signal foyer events
app.get('/api/foyer/activity', (req, res) => {
  const events = db.prepare(`
    SELECT 'zap' as type,
      z.user_name as actor_name,
      i.title as idea_title,
      i.id as idea_id,
      z.created_at as ts,
      z.amount_sats
    FROM zaps z
    JOIN ideas i ON z.target_id = i.id
    WHERE z.target_type = 'idea' AND z.status = 'confirmed'

    UNION ALL

    SELECT 'join' as type,
      u.name as actor_name,
      i.title as idea_title,
      i.id as idea_id,
      im.created_at as ts,
      NULL as amount_sats
    FROM idea_members im
    JOIN ideas i ON im.idea_id = i.id
    LEFT JOIN users u ON im.user_id = u.id

    UNION ALL

    SELECT 'new_idea' as type,
      u.name as actor_name,
      i.title as idea_title,
      i.id as idea_id,
      i.created_at as ts,
      NULL as amount_sats
    FROM ideas i
    LEFT JOIN users u ON i.user_id = u.id

    UNION ALL

    SELECT 'conversion' as type,
      u.name as actor_name,
      i.title as idea_title,
      i.id as idea_id,
      i.created_at as ts,
      NULL as amount_sats
    FROM ideas i
    LEFT JOIN users u ON i.user_id = u.id
    WHERE i.converted_to_project_id IS NOT NULL

    ORDER BY ts DESC
    LIMIT 15
  `).all();
  res.json(events);
});
```

The UNION query hits four existing tables with no new joins. ORDER BY ts DESC on the combined set returns the 15 most recent events across all types.

## Verification

- [ ] Migration v013 runs on server start, no errors
- [ ] `ideas` table has `views_today` and `views_date` columns
- [ ] GET /api/ideas/:id increments views_today on each call
- [ ] GET /api/ideas/:id resets views_today to 1 on a new calendar day
- [ ] GET /api/foyer/activity returns JSON array with up to 15 items
- [ ] Each item has: type, actor_name, idea_title, idea_id, ts, amount_sats
- [ ] Zap items include amount_sats; join/new_idea/conversion have null amount_sats
- [ ] Endpoint is public (no requireAuth)
