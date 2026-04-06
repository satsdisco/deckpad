const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const read = (...parts) => fs.readFileSync(path.join(ROOT, ...parts), 'utf8');
const rules = require(path.join(ROOT, 'content-rules.js'));

test('public content rules hide obvious placeholder projects and foyer ideas', () => {
  assert.equal(rules.isPlaceholderProject({ name: 'dsfsdf', description: 'real desc' }), true);
  assert.equal(rules.isPlaceholderIdea({ title: 'asd', description: 'real desc' }), true);
  assert.equal(rules.isPlaceholderProject({ name: 'Lightning Dashboard', description: 'ship analytics' }), false);
});

test('public content rules block offensive comments and filter them from feeds', () => {
  assert.equal(rules.hasBlockedCommentContent('you fucking faggot'), true);
  assert.equal(rules.hasBlockedCommentContent('great work, nice ship'), false);
  const filtered = rules.filterPublicComments([
    { id: '1', content: 'asd' },
    { id: '2', content: 'clean useful feedback' },
    { id: '3', content: 'nigger' },
  ]);
  assert.deepEqual(filtered.map((row) => row.id), ['2']);
});

test('bounty page computes total pool before winner claim section uses it', () => {
  const html = read('public', 'bounty.html');
  assert.ok(html.indexOf('const totalPool = baseSats + crowdSats;') < html.indexOf("<div class=\"claim-card-amount\">⚡ ${totalPool.toLocaleString()} sats</div>"));
});

test('server applies public content rules and exposes admin comment removal route', () => {
  const server = read('server.js');
  assert.match(server, /filterPublicProjects\(rows\)/);
  assert.match(server, /filterPublicIdeas\(rows\)/);
  assert.match(server, /filterPublicComments\(rows\)/);
  assert.match(server, /app\.delete\('\/api\/comments\/:id', requireAuth, requireAdmin/);
});
