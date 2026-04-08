const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const read = (...parts) => fs.readFileSync(path.join(ROOT, ...parts), 'utf8');

test('staging auth no longer auto-logs every non-local host in as alice', () => {
  const server = read('server.js');

  assert.match(server, /function isLocalDevAutoLoginRequest/);
  assert.match(server, /\['localhost', '127\.0\.0\.1', '::1'\]/);
  assert.match(server, /if \(!req\.user && isLocalDevAutoLoginRequest\(req\)\)/);
  assert.match(server, /function isStagingQaHost/);
});

test('staging exposes a quick-login route for seeded stg_ accounts only', () => {
  const server = read('server.js');

  assert.match(server, /app\.get\('\/auth\/staging-login\/:username'/);
  assert.match(server, /host === 'decks\.satsdisco\.com'/);
  assert.match(server, /username\.startsWith\('stg_'/);
  assert.match(server, /Staging QA login only supports stg_ accounts/);
});

test('welcome page shows staging QA quick-login buttons on staging host', () => {
  const html = read('public', 'welcome.html');

  assert.match(html, /id="stagingQuickLogin"/);
  assert.match(html, /\/auth\/staging-login\/stg_nova/);
  assert.match(html, /moonbase-123/);
  assert.match(html, /window\.location\.hostname === 'decks\.satsdisco\.com'/);
});