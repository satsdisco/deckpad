const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const read = (...parts) => fs.readFileSync(path.join(ROOT, ...parts), 'utf8');

test('mobile header switches to a real two-row grid instead of overlapping nav and actions', () => {
  const css = read('public', 'css', 'style.css');
  const mobileBlock = css.match(/@media \(max-width: 768px\) \{([\s\S]*?)\n\}/);

  assert.ok(mobileBlock, 'expected max-width 768px mobile styles');
  const block = mobileBlock[1];

  assert.match(block, /grid-template-areas:\s*'brand actions'\s*'tabs tabs'/);
  assert.match(block, /\.logo \{[\s\S]*grid-area: brand;/);
  assert.match(block, /\.header-actions \{[\s\S]*grid-area: actions;/);
  assert.match(block, /\.nav-tabs \{[\s\S]*grid-area: tabs;/);
  assert.match(block, /\.header-actions \{[\s\S]*position: static;/);
});

test('mobile build nav stays polished with static section chips and responsive carousel sizing', () => {
  const css = read('public', 'css', 'style.css');

  assert.match(css, /\.build-sidebar \{[\s\S]*position: static;/);
  assert.match(css, /\.sidebar-link \{[\s\S]*border-radius: 14px;/);
  assert.match(css, /\.event-carousel \.event-card \{[\s\S]*min-width: calc\(100vw - 3rem\);/);
  assert.match(css, /@media \(max-width: 480px\) \{[\s\S]*\.event-carousel \.event-card \{[\s\S]*min-width: calc\(100vw - 2\.25rem\);/);
});

test('mobile overlays respect narrow screens and safe areas', () => {
  const css = read('public', 'css', 'style.css');

  assert.match(css, /\.notif-dropdown \{[\s\S]*position: fixed;[\s\S]*left: 12px;[\s\S]*right: 12px;/);
  assert.match(css, /\.fab \{[\s\S]*bottom: calc\(16px \+ env\(safe-area-inset-bottom, 0px\)\);/);
  assert.match(css, /#contextualFab \{ display: none !important; \}/);
  assert.match(css, /@media \(max-width: 480px\) \{[\s\S]*\.user-pill > span:not\(\.user-pill-chevron\) \{[\s\S]*display: none;/);
});
