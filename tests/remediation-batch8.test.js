const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const read = (...parts) => fs.readFileSync(path.join(ROOT, ...parts), 'utf8');

test('mobile build section nav is static grid navigation instead of a hidden swipe row', () => {
  const css = read('public', 'css', 'style.css');
  const mobileBlock = css.match(/@media \(max-width: 768px\) \{([\s\S]*?)\n\}/);

  assert.ok(mobileBlock, 'expected max-width 768px mobile styles');
  const block = mobileBlock[1];

  assert.match(block, /\.sidebar-nav \{[\s\S]*display: grid;[\s\S]*grid-template-columns: repeat\(2, minmax\(0, 1fr\)\);/);
  assert.match(block, /\.sidebar-link \{[\s\S]*width: 100%;[\s\S]*min-height: 48px;/);
  assert.match(block, /\.sidebar-link-label \{[\s\S]*text-align: center;/);
  const sidebarNavBlock = block.match(/\.sidebar-nav \{([\s\S]*?)\n  \}/);
  assert.ok(sidebarNavBlock, 'expected sidebar nav mobile rule');
  assert.doesNotMatch(sidebarNavBlock[1], /overflow-x: auto/);
});
