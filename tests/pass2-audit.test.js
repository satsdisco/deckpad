const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const read = (...parts) => fs.readFileSync(path.join(ROOT, ...parts), 'utf8');
const uiRules = require(path.join(ROOT, 'public/js/ui-rules.js'));

test('ui rules expose past event archive helpers', () => {
  assert.equal(typeof uiRules.getInitialPastEventsVisibleCount, 'function');
  assert.equal(typeof uiRules.shouldShowPastEventsToggle, 'function');
  assert.equal(typeof uiRules.getFoyerLowContentMessage, 'function');
});

test('past events archive toggle only appears when there are more items than the default visible set', () => {
  assert.equal(uiRules.getInitialPastEventsVisibleCount(), 3);
  assert.equal(uiRules.shouldShowPastEventsToggle([{ id: 1 }, { id: 2 }, { id: 3 }]), false);
  assert.equal(uiRules.shouldShowPastEventsToggle([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]), true);
});

test('foyer low-content message appears only for sparse idea sets', () => {
  assert.equal(uiRules.getFoyerLowContentMessage([]), '');
  assert.match(uiRules.getFoyerLowContentMessage([{ id: 1 }, { id: 2 }]), /early/i);
  assert.equal(uiRules.getFoyerLowContentMessage([{ id: 1 }, { id: 2 }, { id: 3 }]), '');
});

test('secondary event cards render as semantic links', () => {
  const html = read('public', 'build.html');
  assert.match(html, /<a href="\/event\/\$\{esc\(ev\.id\)\}" class="event-card"/);
});

test('past events archive includes a toggle affordance', () => {
  const html = read('public', 'build.html');
  assert.match(html, /id="pastEventsToggle"/);
  assert.match(html, /togglePastEvents\(\)/);
});

test('foyer page includes onboarding guidance for the bubble view', () => {
  const html = read('public', 'foyer.html');
  assert.match(html, /Click a bubble to explore/i);
  assert.match(html, /id="foyerGuidance"/);
});

test('foyer detail promotes convert-to-project as a primary CTA', () => {
  const html = read('public', 'foyer-detail.html');
  assert.match(html, /class="btn btn-primary" id="convertBtn"/);
});

test('countdown layout uses a resilient grid to avoid clipping', () => {
  const css = read('public', 'css', 'style.css');
  assert.match(css, /\.event-countdown\s*\{[^}]*grid-template-columns:\s*repeat\(4, minmax\(0, 1fr\)\)/s);
});
