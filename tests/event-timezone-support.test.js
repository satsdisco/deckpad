const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const read = (...parts) => fs.readFileSync(path.join(ROOT, ...parts), 'utf8');

test('event schema and API retain canonical timezone data and a resolved UTC start instant', () => {
  const server = read('server.js');
  assert.match(server, /event_timezone\s+TEXT/);
  assert.match(server, /starts_at_utc\s+TEXT/);
  assert.match(server, /function resolveEventStartUtc\(date, time, eventTimezone\)/);
  assert.match(server, /const \{ name, description, event_type, date, time, event_timezone, location, virtual_link \} = req\.body;/);
  assert.match(server, /const startsAtUtc = resolveEventStartUtc\(date, time, eventTimezone\)/);
  assert.match(server, /INSERT INTO events \(id, name, description, event_type, date, time, event_timezone, starts_at_utc, location, virtual_link\)/);
  assert.match(server, /SET name = \?, description = \?, event_type = \?, date = \?, time = \?, event_timezone = \?, starts_at_utc = \?, location = \?, virtual_link = \?/);
});

test('admin and event-detail UIs expose timezone selection and localized event-time copy', () => {
  const adminHtml = read('public', 'admin.html');
  const eventHtml = read('public', 'event.html');
  const buildHtml = read('public', 'build.html');
  const voteHtml = read('public', 'vote.html');

  assert.match(adminHtml, /id="e-timezone"/);
  assert.match(eventHtml, /id="editEventTimezone"/);
  assert.match(eventHtml, /function formatEventDateSummary\(ev\)/);
  assert.match(eventHtml, /function formatLocalizedViewerTime\(ev\)/);
  assert.match(buildHtml, /function getEventStartDate\(ev\) \{[\s\S]*starts_at_utc/);
  assert.match(voteHtml, /function formatStaticEventDate\(ev\) \{[\s\S]*starts_at_utc/);
});

test('calendar link uses canonical UTC instants without pinning Google Calendar to the creator timezone', () => {
  const eventHtml = read('public', 'event.html');
  assert.match(eventHtml, /const compactUtc = \(date\) => date\.toISOString\(\)\.replace\(\/\[-:\]\/g, ''\)\.replace\(\/\\\.\\d\{3\}Z\$\/, 'Z'\)/);
  assert.match(eventHtml, /dates=\$\{start\}\/\$\{end\}/);
  assert.doesNotMatch(eventHtml, /&ctz=\$\{encodeURIComponent\(ev\.event_timezone \|\| 'UTC'\)\}/);
});
