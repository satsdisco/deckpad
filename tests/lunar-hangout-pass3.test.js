const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const read = (...parts) => fs.readFileSync(path.join(ROOT, ...parts), 'utf8');

test('pass 3 live flow supports end-of-event-only voting states', () => {
  const server = read('server.js');

  assert.match(server, /presentations_complete/);
  assert.match(server, /All Presentations Complete/);
  assert.match(server, /Voting is now open/);
  assert.match(server, /speakerVotingState\.status === 'voting' && !speakerVotingState\.current_speaker_id/);
  assert.match(server, /speakerVotingState\.speaker_status !== 'skipped'/);
});

test('pass 3 live page moves waiting state into toolbar and renders final voting controls', () => {
  const html = read('public', 'live.html');

  assert.match(html, /id="liveStatusDetail"/);
  assert.match(html, /function formatToolbarDetail/);
  assert.match(html, /id="finalVotingPanel"/);
  assert.match(html, /id="finalVotingGrid"/);
  assert.match(html, /function renderFinalVoting/);
  assert.match(html, /function voteForSpeaker\(speakerId\)/);
  assert.match(html, /Open Final Voting/);
  assert.doesNotMatch(html, /<div class="live-waiting" id="waitingScreen">/);
});
