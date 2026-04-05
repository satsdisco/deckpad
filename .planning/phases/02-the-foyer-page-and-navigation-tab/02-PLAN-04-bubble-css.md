---
phase: 02
plan: 04
title: Bubble CSS
wave: 1
---

# Plan: Bubble CSS

## Goal

Add all Foyer-specific CSS to `public/css/style.css`: bubble layout, individual bubble styles, hover states, filter pills reuse, detail card styles, and responsive overrides.

## Tasks

### Task 1: Append Foyer CSS to style.css
**File:** `public/css/style.css`
**Action:** modify

Append the following block at the end of the file (after the closing `.lightbox-overlay img` rule at line 3498):

```css

/* ─── The Foyer ──────────────────────────────────────────────────────────── */

.foyer-page { padding: 32px 0 80px; }

.foyer-header { margin-bottom: 24px; }
.foyer-title { font-family: var(--font-mono); font-size: 1.4rem; font-weight: 800; color: var(--text); margin: 0 0 6px; letter-spacing: -0.02em; }
.foyer-subtitle { font-size: 0.85rem; color: var(--muted); margin: 0; }

/* Filter pills — reuse .comment-filter, wrapper styles only */
.foyer-filters { display: flex; gap: 4px; margin-bottom: 32px; flex-wrap: wrap; }

/* Bubble container */
.foyer-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  justify-content: center;
  padding: 16px 0;
  min-height: 240px;
}

/* Individual bubble */
.idea-bubble {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border-radius: 50%;
  background: var(--surface2);
  border: 1px solid rgba(124,92,252,0.2);
  cursor: pointer;
  padding: 12px;
  text-align: center;
  overflow: hidden;
  transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease, background .2s ease;
  box-shadow: 0 2px 12px rgba(0,0,0,0.3);
  position: relative;
}
.idea-bubble:hover {
  transform: scale(1.07);
  border-color: var(--accent);
  background: var(--accent-dim);
  box-shadow: 0 0 24px var(--accent-glow), 0 4px 20px rgba(0,0,0,0.4);
  z-index: 2;
}
.idea-bubble:active { transform: scale(0.98); }

.bubble-title {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--text);
  line-height: 1.35;
  max-width: 80%;
  word-break: break-word;
}

.bubble-votes {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  font-weight: 700;
  color: var(--accent);
  background: rgba(124,92,252,0.12);
  border: 1px solid rgba(124,92,252,0.18);
  border-radius: 100px;
  padding: 1px 6px;
  line-height: 1.6;
}

/* ─── Foyer Detail ───────────────────────────────────────────────────────── */

.foyer-detail-page { padding: 24px 0 80px; max-width: 700px; }

.foyer-detail-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 32px 36px;
  margin-top: 20px;
}

.foyer-detail-meta-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.foyer-detail-label {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--accent);
  background: var(--accent-dim);
  border: 1px solid rgba(124,92,252,0.2);
  border-radius: 100px;
  padding: 2px 8px;
}
.foyer-detail-time { font-size: 0.75rem; color: var(--muted); }

.foyer-detail-title {
  font-family: var(--font-mono);
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text);
  margin: 0 0 16px;
  line-height: 1.3;
  letter-spacing: -0.02em;
}

.foyer-detail-desc {
  font-size: 0.9rem;
  color: var(--text2);
  line-height: 1.7;
  margin: 0 0 24px;
  white-space: pre-wrap;
}

.foyer-detail-author {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--border);
}
.foyer-detail-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}
.foyer-detail-avatar-fallback {
  background: var(--accent-dim);
  border: 1px solid rgba(124,92,252,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--accent);
}
.foyer-detail-author-name { font-size: 0.85rem; font-weight: 600; color: var(--text2); }
.foyer-detail-author-name:hover { color: var(--accent); }

.foyer-detail-stats {
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
}
.foyer-stat { display: flex; flex-direction: column; align-items: center; gap: 2px; }
.foyer-stat-value { font-family: var(--font-mono); font-size: 1.1rem; font-weight: 700; color: var(--text); }
.foyer-stat-label { font-size: 0.65rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; }

.foyer-detail-actions {
  display: flex;
  gap: 8px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

.foyer-detail-section {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--border);
}
.foyer-section-heading {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 12px;
}
.foyer-empty-section {
  font-size: 0.82rem;
  color: var(--muted);
  font-style: italic;
}

/* ─── Foyer Responsive ───────────────────────────────────────────────────── */

@media (max-width: 768px) {
  .foyer-container { gap: 10px; padding: 8px 0; }
  .idea-bubble { transform-origin: center; }
  .foyer-detail-card { padding: 20px 20px; }
  .foyer-detail-title { font-size: 1.2rem; }
}

@media (max-width: 480px) {
  .foyer-container { gap: 8px; }
  /* Scale all bubbles down by ~20% on small phones */
  .idea-bubble { transform: scale(0.82); margin: -8px; }
  .idea-bubble:hover { transform: scale(0.88); }
  .foyer-detail-card { padding: 16px; }
  .foyer-detail-stats { gap: 16px; }
  .foyer-detail-actions { flex-direction: column; }
}
```

## Verification

- [ ] .foyer-container displays bubbles in a centered, wrapping flex layout with visible gaps
- [ ] Bubbles are circular (border-radius: 50%) with glass-style background
- [ ] Bubble hover shows accent glow and scale-up, matching the platform's interaction style
- [ ] .bubble-title truncates at 3 lines and does not overflow the bubble boundary
- [ ] .bubble-votes badge renders inside the bubble below the title
- [ ] .foyer-filters renders the sort pill buttons in the same style as .comment-filters
- [ ] .foyer-detail-card renders as a centered card with defined max-width on the detail page
- [ ] Author avatar has circular crop; fallback initial letter renders in accent color
- [ ] Stat row (votes, sats, builders) renders horizontally with mono font values
- [ ] On mobile (480px), bubbles scale down to avoid overflow; detail card padding reduces
- [ ] No existing styles broken: run through build.html, index.html, project.html visually
