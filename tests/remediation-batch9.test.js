const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const read = (...parts) => fs.readFileSync(path.join(ROOT, ...parts), 'utf8');

test('mobile build nav gap is tightened between top tabs and section grid', () => {
  const css = read('public', 'css', 'style.css');
  const mobileBlock = css.match(/@media \(max-width: 768px\) \{([\s\S]*?)\n\}/);

  assert.ok(mobileBlock, 'expected max-width 768px mobile styles');
  const block = mobileBlock[1];

  assert.match(block, /\.header \{[\s\S]*gap: 6px 12px;[\s\S]*min-height: 70px;/);
  assert.match(block, /\.nav-tabs \{[\s\S]*padding: 0 0 4px;/);
  assert.match(block, /\.build-sidebar-shell \{[\s\S]*padding: 4px 1rem 8px;/);
  assert.match(block, /\.build-content \{[\s\S]*padding: 12px 1rem 0;/);
});
