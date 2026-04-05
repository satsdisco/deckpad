# Phase 3: Upvoting and Zapping Ideas - Context

**Gathered:** 2026-04-05
**Status:** Ready for planning

<domain>
## Phase Boundary

Wire the existing vote and zap infrastructure to ideas so builders can signal interest and pool sats. Vote system already accepts 'idea' type from Phase 1. This phase adds the frontend interactions and the zap API endpoint.

</domain>

<decisions>
## Implementation Decisions

### Voting on Bubbles
- **D-01:** Show a small upvote arrow on bubble hover. Clicking the arrow votes without navigating. Clicking the bubble title/body navigates to detail page.
- **D-02:** After voting on a bubble, the bubble should visually update (vote count changes, brief glow animation) without full page reload.

### Voting on Detail Page
- **D-03:** Replace the disabled "Upvote" button with a working vote toggle button. Reuse the existing vote-btn pattern from projects/decks.
- **D-04:** Vote count updates immediately on click (optimistic UI).

### Zapping
- **D-05:** Add POST /api/ideas/:id/zap endpoint following the exact pattern from POST /api/projects/:id/zap. Sats go to idea's total_sats_received (pool for the team).
- **D-06:** On the detail page, replace the disabled "Zap" button with a working zap flow: click opens amount input, generates LNbits invoice, shows QR code, polls for verification.
- **D-07:** Zap notification fires to the idea author when payment is confirmed.
- **D-08:** No zapping from bubble view, only from detail page (zap flow requires modal/QR).

### Claude's Discretion
- Exact hover animation for the upvote arrow on bubbles
- QR code modal styling (reuse existing zap modal pattern)
- Whether to show zap total on bubbles (currently not shown, title + votes only)

</decisions>

<canonical_refs>
## Canonical References

### Vote system
- `server.js` POST /api/vote — already accepts 'idea' type (Phase 1)
- `public/project.html` vote button pattern — reuse for detail page

### Zap system
- `server.js` POST /api/projects/:id/zap (line ~1501) — exact pattern to replicate for ideas
- `server.js` GET /api/zaps/verify/:zap_id — reuse as-is for idea zap verification
- `public/project.html` zap flow JS — reuse showZap/pollZap pattern

### Frontend
- `public/foyer.html` — bubble rendering, needs hover vote arrow
- `public/foyer-detail.html` — detail page, needs working vote/zap buttons

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- POST /api/vote already works for ideas (Phase 1)
- Zap verify/confirm endpoints work for any target_type
- `notify()` helper already handles 'vote' and 'zap' types for ideas
- LNbits integration functions: `lnbitsCreateInvoice()`, `lnbitsCheckPayment()`

### Integration Points
- Add POST /api/ideas/:id/zap in server.js (new endpoint)
- Update foyer.html bubble rendering to include hover vote arrow
- Update foyer-detail.html to wire vote and zap buttons

</code_context>

<specifics>
## Specific Ideas

No specific requirements beyond reusing existing patterns.

</specifics>

<deferred>
## Deferred Ideas

- Zap total visible on bubbles — evaluate after seeing the UI
- Team join/leave — Phase 4
- Comments — Phase 5

</deferred>

---

*Phase: 03-upvoting-and-zapping-ideas*
*Context gathered: 2026-04-05*
