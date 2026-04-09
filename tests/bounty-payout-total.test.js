const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const read = (...parts) => fs.readFileSync(path.join(ROOT, ...parts), 'utf8');

test('server payout route computes winner payment from base bounty plus confirmed funding', () => {
  const server = read('server.js');
  assert.match(server, /const fundedSats = Number\(bounty\.funded_amount \|\| 0\);/);
  assert.match(server, /const payoutTotal = Number\(bounty\.sats_amount \|\| 0\) \+ fundedSats;/);
  assert.match(server, /const amount_sats = parseInt\(req\.body\.amount_sats\) \|\| payoutTotal;/);
});

test('bounty admin payout CTA uses the full displayed prize pool instead of only the base amount', () => {
  const html = read('public', 'bounty.html');
  assert.match(html, /const totalPool = baseSats \+ crowdSats;/);
  assert.match(html, /openPayWinnerModal\('\$\{esc\(b\.id\)\}', \$\{totalPool\}\)/);
  assert.doesNotMatch(html, /openPayWinnerModal\('\$\{esc\(b\.id\)\}', \$\{Number\(b\.sats_amount \|\| 0\)\}\)/);
});
