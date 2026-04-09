const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const read = (...parts) => fs.readFileSync(path.join(ROOT, ...parts), 'utf8');

test('mobile decks filters collapse into scrollable chips instead of a dense wrapped wall', () => {
  const css = read('public', 'css', 'style.css');

  assert.match(css, /\.tag-bar \{[\s\S]*flex-wrap: nowrap;[\s\S]*overflow-x: auto;/);
  assert.match(css, /\.tag-chip \{[\s\S]*flex-shrink: 0;[\s\S]*white-space: nowrap;/);
  assert.match(css, /\.search-box,\s*\n\s*\.sort-select \{ width: 100%; \}/);
});

test('mobile comments and footer avoid cramped mobile controls', () => {
  const css = read('public', 'css', 'style.css');

  assert.match(css, /\.comment-form-actions \{[\s\S]*justify-content: stretch;/);
  assert.match(css, /\.comment-form-actions \.btn \{[\s\S]*width: 100%;/);
  assert.match(css, /\.footer-links a \{[\s\S]*min-height: 32px;/);
  assert.match(css, /\.fab \{[\s\S]*display: none !important;/);
});

test('mobile foyer spacing keeps bubbles centered without a boxed stage', () => {
  const css = read('public', 'css', 'style.css');
  const html = read('public', 'foyer.html');

  assert.doesNotMatch(html, /id="foyerGuidance"/);
  assert.doesNotMatch(html, /id="foyerLegend"/);
  assert.match(css, /\.foyer-filters \{[\s\S]*justify-content: center;/);
  assert.match(css, /\.foyer-container \{[\s\S]*padding: 16px 0;[\s\S]*border: none;[\s\S]*background: transparent;/);
  assert.match(css, /\.foyer-sidebar \{[\s\S]*margin-top: 8px;/);
});

test('event detail mobile hero promotes full-width actions and wrapped countdown units', () => {
  const html = read('public', 'event.html');

  assert.match(html, /\.event-hero-countdown \{[\s\S]*width: 100%;[\s\S]*flex-wrap: wrap;/);
  assert.match(html, /\.event-hero-actions \{[\s\S]*width: 100%;[\s\S]*flex-direction: column;/);
  assert.match(html, /\.event-hero-actions \.btn,[\s\S]*width: 100%;/);
});
