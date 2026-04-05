---
phase: 07
plan: 03
title: CSS and Views Badge
wave: 1
---

# Plan 03: CSS and Views Badge

## Objective

Add two-column layout styles, activity feed item styles, responsive collapse, and the "Viewed by X today" badge on idea bubbles.

## Files to Modify

- `public/css/style.css`
- `public/foyer.html` (bubble rendering only)

## Tasks

### 1. Two-column layout CSS

Append to style.css in the Foyer section (search for `.foyer-container` to find the right area):

```css
.foyer-layout { display: flex; align-items: flex-start; gap: 24px; }
.foyer-main { flex: 1; min-width: 0; }
.foyer-sidebar { width: 280px; flex-shrink: 0; }
```

`.min-width: 0` on `.foyer-main` prevents flex blowout when the bubble container is absolutely positioned.

### 2. Activity feed sidebar styles

```css
.activity-feed-header { font-size: .75rem; font-weight: 600; text-transform: uppercase; letter-spacing: .06em; color: var(--text-muted); padding: 0 0 10px; border-bottom: 1px solid var(--border); margin-bottom: 8px; }
.activity-feed { display: flex; flex-direction: column; gap: 2px; max-height: 600px; overflow-y: auto; }
.activity-item { display: flex; align-items: flex-start; gap: 8px; padding: 8px 10px; border-radius: var(--radius); transition: background .15s; }
.activity-item:hover { background: var(--surface); }
.activity-icon { font-size: .9rem; line-height: 1.4; flex-shrink: 0; }
.activity-body { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.activity-text { font-size: .8rem; color: var(--text); line-height: 1.35; word-break: break-word; }
.activity-time { font-size: .7rem; color: var(--text-muted); }
.activity-empty { font-size: .8rem; color: var(--text-muted); padding: 12px 0; }
```

### 3. Responsive: sidebar collapses below bubbles at 900px

```css
@media (max-width: 900px) {
  .foyer-layout { flex-direction: column; }
  .foyer-sidebar { width: 100%; }
  .activity-feed { max-height: 320px; }
}
```

At 900px and below the sidebar stacks under the bubble cloud. Feed height is reduced to avoid dominating the mobile viewport.

### 4. Views badge styles

```css
.bubble-views { display: block; font-size: .65rem; color: var(--text-muted); margin-top: 3px; line-height: 1; }
```

### 5. Update bubble rendering in foyer.html to show views_today

The GET /api/ideas endpoint already returns all idea columns including views_today and views_date. No API change needed.

In foyer.html, inside the `renderBubbles()` function, update the bubble template string. After the `<button class="bubble-vote-btn ...">` block (currently the last element inside the anchor), add the views badge conditionally:

Current template ends with:
```js
      <button class="bubble-vote-btn ${voted ? 'voted' : ''}" onclick="event.preventDefault();event.stopPropagation();voteBubble('${esc(item.idea.id)}',this)" title="Upvote">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
        <span id="bv-${esc(item.idea.id)}">${item.votes}</span>
      </button>
    </a>`;
```

Update to:
```js
      <button class="bubble-vote-btn ${voted ? 'voted' : ''}" onclick="event.preventDefault();event.stopPropagation();voteBubble('${esc(item.idea.id)}',this)" title="Upvote">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
        <span id="bv-${esc(item.idea.id)}">${item.votes}</span>
      </button>
      ${item.idea.views_today > 0 ? `<span class="bubble-views">${item.idea.views_today} view${item.idea.views_today === 1 ? '' : 's'} today</span>` : ''}
    </a>`;
```

Note: views_today from the list endpoint reflects the stored value (not live-incremented on list load, only on detail load). This is correct: the list shows yesterday's or earlier-today's views, updated each time someone opens the idea detail.

## Verification

- [ ] Foyer page is two-column on desktop (bubbles left, sidebar right)
- [ ] Sidebar is exactly 280px wide
- [ ] At 900px viewport width or below, sidebar stacks below bubbles
- [ ] Bubbles with views_today > 0 show "X view(s) today" badge
- [ ] Bubbles with views_today = 0 or NULL show no badge
- [ ] Views badge text is small and does not break bubble layout
- [ ] Activity feed scrolls independently when content exceeds 600px height
- [ ] Activity feed items have hover state
