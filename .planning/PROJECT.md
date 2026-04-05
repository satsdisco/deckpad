# LunarPad

## What This Is

LunarPad is an internal platform for Lunar Rails' BuildInPublic initiative. Builders upload HTML presentations, showcase projects, compete in demo days, earn sats through bounties, and engage through voting, zapping, and threaded comments. It runs on Node.js/Express with SQLite and vanilla HTML/CSS/JS.

## Core Value

Give Bitcoin builders a living home to share work, compete, and earn sats, replacing scattered Slack threads with a gamified platform.

## Requirements

### Validated

- ✓ HTML deck upload with thumbnails and fullscreen viewer — existing
- ✓ Project showcase with repo/demo links, upvoting, and comments — existing
- ✓ Demo day events with speaker signup, countdown, calendar view — existing
- ✓ Bounties with sats rewards and participant tracking — existing
- ✓ Lightning zaps via LNbits with auto-forwarding — existing
- ✓ Unified voting system across decks, speakers, projects, comments — existing
- ✓ User profiles with badges and Lightning addresses — existing
- ✓ Google OAuth and username/password authentication — existing
- ✓ In-app notifications for comments, replies, votes, zaps — existing
- ✓ Threaded comments with reply chains and thread-scoped notifications — existing
- ✓ Comment sorting and filtering (top, newest, oldest, biggest threads) — existing

### Active

- [ ] "The Foyer" ideas page: new top-level tab where anyone can post ideas (title + description)
- [ ] Upvoting and zapping ideas, with sats pooling as a team bounty
- [ ] Join button on ideas to form teams of interested builders
- [ ] Threaded comments on ideas (reuse existing comment system)
- [ ] Idea-to-project conversion: carry over sats pool, team members, and link back to origin idea
- [ ] Ideas listing with sorting/filtering (top voted, most zapped, newest, biggest teams)

### Out of Scope

- Role-based teams (builder, designer, etc.) — keep it simple with just a join list
- Approval-based team joining — anyone can join freely
- Email or push notifications — in-app only for now
- Idea categories or tags — keep it lightweight, title + description only
- Private or draft ideas — everything is public immediately

## Context

LunarPad is a brownfield project. The codebase is a monolithic `server.js` (~3200 lines) serving static HTML pages from `public/`. Database is SQLite via Node.js built-in module with 16 tables and a migration system. The existing vote, zap, comment, and notification infrastructure can be reused directly for The Foyer.

Key architectural patterns:
- All IDs are UUIDs via `crypto.randomUUID()`
- Prepared statements in a `stmts` object for common queries
- Comments use `deck_id` field for both deck and project comments (reused via convention)
- Zaps create LNbits invoices with auto-forwarding to recipient Lightning addresses
- Frontend is vanilla JS with inline scripts per page, shared `auth.js` for notifications

Deployment: Mac mini + Cloudflare Tunnel. Staging at decks.satsdisco.com (auto-deploys from staging branch). Production at lunarpad.dev.

## Constraints

- **Tech stack**: Node.js, Express, SQLite, vanilla HTML/CSS/JS. No frameworks, no build step.
- **Design**: Dark navy (#0d0f1a), purple (#7c5cfc), gold (#d4a843). Space Grotesk + Inter fonts.
- **Deployment**: Push to staging branch for testing at decks.satsdisco.com.
- **Lightning**: LNbits for invoice generation and payment verification.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Tab name "The Foyer" | Matches the open ballroom/marketplace metaphor for idea exchange | — Pending |
| Title + description only for ideas | Keep posting lightweight, lower barrier to participation | — Pending |
| Sats pool for team, not idea author | Incentivizes building, not just ideating | — Pending |
| Carry everything over on conversion | Continuity from idea to project, no lost context or sats | — Pending |
| Join button without roles | Simplicity first, roles add complexity without clear value yet | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-05 after initialization*
