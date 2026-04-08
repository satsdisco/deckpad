const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const read = (...parts) => fs.readFileSync(path.join(ROOT, ...parts), 'utf8');

test('host can unmark a presented speaker through dedicated API routes', () => {
  const server = read('server.js');

  assert.match(server, /app\.delete\('\/api\/speakers\/:id\/presented'/);
  assert.match(server, /app\.post\('\/api\/live\/:eventId\/unmark-presented'/);
  assert.match(server, /SET presented_at = NULL,\s*status = 'scheduled'/);
});

test('live and event pages expose undo presented controls for hosts', () => {
  const liveHtml = read('public', 'live.html');
  const eventHtml = read('public', 'event.html');

  assert.match(liveHtml, /id="undoPresentedBtn"/);
  assert.match(liveHtml, /function undoPresented\(\)/);
  assert.match(eventHtml, /undoSpeakerPresented/);
  assert.match(eventHtml, /Undo Presented/);
});
