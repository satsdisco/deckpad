const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const read = (...parts) => fs.readFileSync(path.join(ROOT, ...parts), 'utf8');

test('hosts can undo skipped state through dedicated API and live controls', () => {
  const server = read('server.js');
  const liveHtml = read('public', 'live.html');
  const eventHtml = read('public', 'event.html');

  assert.match(server, /app\.delete\('\/api\/speakers\/:id\/skip'/);
  assert.match(server, /SET status = 'scheduled', skipped_at = NULL WHERE id = \?/);
  assert.match(liveHtml, /id="undoSkippedBtn"/);
  assert.match(liveHtml, /function undoSkipped\(\)/);
  assert.match(eventHtml, /undoSpeakerSkipped/);
  assert.match(eventHtml, /Undo Skip/);
});

test('live lineup replay allows admins to click skipped and presented speakers, excluding winners only', () => {
  const liveHtml = read('public', 'live.html');

  assert.match(liveHtml, /const isReplayable = isAdmin && s\.status !== 'winner'/);
  assert.doesNotMatch(liveHtml, /s\.status !== 'skipped' && s\.status !== 'winner'/);
});
