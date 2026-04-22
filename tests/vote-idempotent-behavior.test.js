const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const server = fs.readFileSync(path.join(ROOT, 'server.js'), 'utf8');

test('content votes stay withdrawable while only notifying on new upvotes', () => {
  assert.match(server, /function toggleContentVote\(type, id, voter, req\) \{/);
  assert.match(server, /if \(existing\) \{\s*stmts\.removeVote\.run\(type, id, voter\);\s*\} else \{\s*stmts\.addVote\.run\(type, id, voter\);\s*notifyVoteTarget\(type, id, req\);\s*\}/);
  assert.match(server, /return \{ \.\.\.nextState, voted: !existing \};/);
});

test('event session speaker votes are also withdrawable after being cast', () => {
  assert.match(server, /function toggleEventSessionVote\(type, id, voter, req\) \{/);
  assert.match(server, /if \(existing\) \{\s*stmts\.removeVote\.run\(type, id, voter\);\s*\} else \{\s*stmts\.addVote\.run\(type, id, voter\);\s*notifyVoteTarget\(type, id, req\);\s*\}/);
  assert.match(server, /return \{ \.\.\.nextState, voted: !existing \};/);
});
