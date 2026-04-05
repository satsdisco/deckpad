---
phase: 01
plan: 01
title: Migration v011 — ideas and idea_members tables
wave: 1
---

# Plan: Migration v011 — ideas and idea_members tables

## Goal

Add migration v011 to create the `ideas` table, `idea_members` table, `target_type` column on `comments`, and supporting indexes.

## Tasks

### Task 1: Add v011 to the MIGRATIONS array

**File:** `server.js`
**Action:** add

Locate the MIGRATIONS array (line 219). The last entry is `v010_comment_replies` (line 283). Append a new entry immediately after it, before the closing `];` on line 287.

Insert the following object:

```js
  { name: 'v011_ideas', sql: [
    `CREATE TABLE IF NOT EXISTS ideas (
      id                 TEXT PRIMARY KEY,
      title              TEXT NOT NULL,
      description        TEXT,
      user_id            TEXT,
      slug               TEXT,
      total_sats_received INTEGER DEFAULT 0,
      created_at         DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS idea_members (
      id         TEXT PRIMARY KEY,
      idea_id    TEXT NOT NULL,
      user_id    TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    'ALTER TABLE comments ADD COLUMN target_type TEXT',
    'CREATE UNIQUE INDEX IF NOT EXISTS idx_ideas_slug ON ideas(slug) WHERE slug IS NOT NULL',
    'CREATE INDEX IF NOT EXISTS idx_idea_members_idea ON idea_members(idea_id)',
  ]},
```

Placement: after the closing `}` of the `v010_comment_replies` entry and before the `];` that closes the MIGRATIONS array.

### Task 2: Verify migration runner handles the new entry

**File:** `server.js`
**Action:** verify (no change needed)

The migration runner at lines 289-304 iterates MIGRATIONS, skips applied entries, executes each SQL statement with `try/catch` that ignores `duplicate column` and `already exists` errors, then inserts a record into `_migrations`. This pattern handles `ALTER TABLE comments ADD COLUMN target_type TEXT` safely if the column already exists (the error is suppressed). No changes to the runner are needed.

## Verification

- [ ] Server starts without error after adding the migration entry
- [ ] `SELECT name FROM _migrations WHERE name = 'v011_ideas'` returns one row after first boot
- [ ] `SELECT * FROM ideas LIMIT 1` executes without error (table exists)
- [ ] `SELECT * FROM idea_members LIMIT 1` executes without error (table exists)
- [ ] `PRAGMA table_info(comments)` shows a `target_type` column
- [ ] `PRAGMA index_list(ideas)` shows `idx_ideas_slug`
- [ ] `PRAGMA index_list(idea_members)` shows `idx_idea_members_idea`
- [ ] Running the server a second time does not re-run v011 (idempotent)
