const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const read = (...parts) => fs.readFileSync(path.join(ROOT, ...parts), 'utf8');

test('early adopter badge uses an explicit cutoff constant instead of rolling first-month logic', () => {
  const server = read('server.js');
  assert.match(server, /const EARLY_ADOPTER_CUTOFF_AT =/);
  assert.match(server, /new Date\(user\.created_at\) <= EARLY_ADOPTER_CUTOFF_AT/);
  assert.doesNotMatch(server, /SELECT MIN\(created_at\) as first FROM users/);
  assert.doesNotMatch(server, /diff <= 30 \* 24 \* 60 \* 60 \* 1000/);
});
