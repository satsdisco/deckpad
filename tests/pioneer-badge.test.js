const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const read = (...parts) => fs.readFileSync(path.join(ROOT, ...parts), 'utf8');

test('badge catalog defines Pioneer with a distinct founder-tier identity', () => {
  const server = read('server.js');
  const buildHtml = read('public', 'build.html');

  assert.match(server, /pioneer:\s*\{ id: 'pioneer',\s*emoji: '🧭',\s*name: 'Pioneer'/);
  assert.match(server, /desc: 'One of the first five LunarPad users'/);
  assert.match(buildHtml, /pioneer:'🧭'/);
});

test('pioneer eligibility is deterministic and based on the first five users by created_at then id', () => {
  const server = read('server.js');

  assert.match(server, /function getPioneerUserIds\(\)/);
  assert.match(server, /SELECT id FROM users ORDER BY datetime\(created_at\) ASC, id ASC LIMIT 5/);
  assert.match(server, /if \(!has\('pioneer'\)\) \{/);
  assert.match(server, /const pioneerIds = getPioneerUserIds\(\);/);
  assert.match(server, /if \(pioneerIds\.includes\(userId\)\) badges\.push\('pioneer'\);/);
});

test('pioneer badge is backfilled for existing first-five users at startup', () => {
  const server = read('server.js');
  assert.match(server, /function backfillPioneerBadges\(\)/);
  assert.match(server, /backfillPioneerBadges\(\);/);
});
