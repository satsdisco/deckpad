# Phase 5: Threaded Comments on Ideas - Context

**Gathered:** 2026-04-05
**Status:** Ready for planning

<domain>
## Phase Boundary

Reuse the existing threaded comment system on idea detail pages. Comments already work for decks and projects with threading, sorting, and notifications. This phase wires the same infrastructure to ideas.

</domain>

<decisions>
## Implementation Decisions

### API Endpoints
- **D-01:** Add GET /api/ideas/:id/comments (same pattern as GET /api/projects/:id/comments)
- **D-02:** Add POST /api/ideas/:id/comments accepting { content, parent_id } (same pattern as POST /api/projects/:id/comments)
- **D-03:** Both endpoints use the comments table with deck_id = idea_id (same convention as projects)

### Notifications
- **D-04:** Thread-scoped notifications: reply notifies thread participants + idea author. Top-level comment notifies idea author only. Same logic as deck/project comments.
- **D-05:** Notification type 'comment' for top-level, 'reply' for thread replies. Reuse existing notify() helper.

### Frontend
- **D-06:** On foyer-detail.html, replace the "Comments coming soon" placeholder with the full comment system.
- **D-07:** Reuse the exact same JS pattern from project.html: loadComments, renderProjThread, postComment, postProjReply, sortProjComments, voteComment.
- **D-08:** Include comment sort filter pills (Top, Newest, Oldest, Biggest Threads).
- **D-09:** Include the inline thread reply input at the bottom of threads.

### Claude's Discretion
- Whether to extract comment JS into a shared file (like auth.js) or continue the per-page duplication pattern

</decisions>

<canonical_refs>
## Canonical References

### Comment system (existing)
- `server.js` GET/POST /api/projects/:id/comments (lines ~2011-2075) — exact pattern to replicate
- `public/project.html` comment JS (loadComments, renderProjThread, etc.) — exact pattern to replicate
- `public/css/style.css` comment styles — already exist, no new CSS needed

### Idea detail page
- `public/foyer-detail.html` — has #comments placeholder to replace

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- All comment CSS classes already exist
- notify() helper handles 'comment' and 'reply' types
- Vote system already works for 'comment' type
- Thread rendering (renderProjThread, showProjReplyForm, etc.) can be copied directly

### Integration Points
- Add comment endpoints in server.js after existing ideas API block
- Update foyer-detail.html to load and render comments

</code_context>

<specifics>
No specific requirements. Direct reuse of existing patterns.
</specifics>

<deferred>
None.
</deferred>

---

*Phase: 05-threaded-comments-on-ideas*
*Context gathered: 2026-04-05*
