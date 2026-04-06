const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const read = (...parts) => fs.readFileSync(path.join(ROOT, ...parts), 'utf8');

test('events carousel counter is more explicit and navigable', () => {
  const html = read('public', 'build.html');
  const css = read('public', 'css', 'style.css');
  assert.match(html, /Browse events/);
  assert.match(html, /Event 1 of/);
  assert.match(css, /\.carousel-counter-label/);
});

test('mini calendar cells expose clearer event affordance with markers and labels', () => {
  const html = read('public', 'build.html');
  const css = read('public', 'css', 'style.css');
  assert.match(html, /cal-event-markers/);
  assert.match(html, /aria-label=/);
  assert.match(css, /\.cal-event-dot/);
});

test('deck detail actions are grouped for cleaner wrapping on narrow widths', () => {
  const html = read('public', 'deck.html');
  const css = read('public', 'css', 'style.css');
  assert.match(html, /viewer-actions-group-primary/);
  assert.match(html, /viewer-actions-group-links/);
  assert.match(css, /\.viewer-actions-group/);
});

test('bounty deadline formatting and styles support urgency-aware tones', () => {
  const bountyHtml = read('public', 'bounty.html');
  const css = read('public', 'css', 'style.css');
  assert.match(bountyHtml, /tone: 'urgent'/);
  assert.match(bountyHtml, /tone: 'soon'/);
  assert.match(css, /\.deadline-chip\.soon/);
  assert.match(css, /\.deadline-chip\.urgent/);
});
