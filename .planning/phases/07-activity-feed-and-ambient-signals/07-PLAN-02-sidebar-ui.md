---
phase: 07
plan: 02
title: Sidebar UI
wave: 1
---

# Plan 02: Sidebar UI

## Objective

Restructure foyer.html from single-column to two-column layout and add the activity feed sidebar with polling.

## Files to Modify

- `public/foyer.html`

## Tasks

### 1. Wrap existing layout in two-column structure

Replace the current `<main>` block with a layout wrapper. The existing `.foyer-header`, `.foyer-filters`, and `.foyer-container` stay in `.foyer-main`. A new `.foyer-sidebar` sits alongside.

Current structure:
```html
<main class="container" style="padding-top:24px">
  <div class="foyer-header">...</div>
  <div class="foyer-filters">...</div>
  <div class="foyer-container" id="bubbleContainer">...</div>
</main>
```

New structure:
```html
<main class="container" style="padding-top:24px">
  <div class="foyer-layout">
    <div class="foyer-main">
      <div class="foyer-header">...</div>
      <div class="foyer-filters">...</div>
      <div class="foyer-container" id="bubbleContainer">...</div>
    </div>
    <aside class="foyer-sidebar">
      <div class="activity-feed-header">Activity</div>
      <div class="activity-feed" id="activityFeed">
        <div class="activity-empty">Loading...</div>
      </div>
    </aside>
  </div>
</main>
```

### 2. Add pollActivity() function

Add to the `<script>` block, alongside the existing polling pattern from auth.js. Place after the existing `voteBubble` function:

```js
let _activityInterval = null;

async function loadActivity() {
  try {
    const res = await fetch('/api/foyer/activity');
    const items = await res.json();
    renderActivity(items);
  } catch {}
}

function renderActivity(items) {
  const feed = document.getElementById('activityFeed');
  if (!items || !items.length) {
    feed.innerHTML = '<div class="activity-empty">No activity yet.</div>';
    return;
  }
  const icons = { zap: '⚡', join: '👥', new_idea: '💡', conversion: '🚀' };
  feed.innerHTML = items.map(item => {
    const icon = icons[item.type] || '•';
    const label = activityLabel(item);
    const time = timeAgoShort(item.ts);
    return `<div class="activity-item">
      <span class="activity-icon">${icon}</span>
      <div class="activity-body">
        <span class="activity-text">${esc(label)}</span>
        <span class="activity-time">${esc(time)}</span>
      </div>
    </div>`;
  }).join('');
}

function activityLabel(item) {
  const actor = item.actor_name || 'Someone';
  const title = item.idea_title || 'an idea';
  switch (item.type) {
    case 'zap':        return `${actor} zapped ${item.amount_sats} sats on "${title}"`;
    case 'join':       return `${actor} joined the "${title}" team`;
    case 'new_idea':   return `${actor} posted "${title}"`;
    case 'conversion': return `"${title}" was converted to a project`;
    default:           return `${actor} acted on "${title}"`;
  }
}

function timeAgoShort(ts) {
  if (!ts) return '';
  const diff = Math.floor((Date.now() - new Date(ts).getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}
```

### 3. Start polling on page load

After the existing `loadIdeas('top');` call at the bottom of the script block, add:

```js
loadActivity();
_activityInterval = setInterval(loadActivity, 30000);

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    clearInterval(_activityInterval);
    _activityInterval = null;
  } else {
    loadActivity();
    _activityInterval = setInterval(loadActivity, 30000);
  }
});
```

This matches the visibility-aware polling pattern used in auth.js for notifications.

## Verification

- [ ] Foyer page renders two columns (bubbles left, sidebar right)
- [ ] Sidebar shows "Activity" header and feed items on load
- [ ] Each feed item shows icon, label text, and relative timestamp
- [ ] Zap items show amount_sats in label
- [ ] Feed polls every 30s and updates without page reload
- [ ] Polling pauses when tab is hidden, resumes on visibility
- [ ] Empty state renders "No activity yet." when feed is empty
