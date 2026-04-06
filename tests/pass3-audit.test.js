const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const read = (...parts) => fs.readFileSync(path.join(ROOT, ...parts), 'utf8');
const uiRules = require(path.join(ROOT, 'public/js/ui-rules.js'));

test('ui rules expose pass-3 helpers', () => {
  assert.equal(typeof uiRules.getLeaderboardWonDisplay, 'function');
  assert.equal(typeof uiRules.getProjectStatusTone, 'function');
  assert.equal(typeof uiRules.getProfileBannerPresets, 'function');
});

test('leaderboard hides zero wins behind a softer dash state', () => {
  assert.equal(uiRules.getLeaderboardWonDisplay(0), '—');
  assert.equal(uiRules.getLeaderboardWonDisplay(3), '3 won');
});

test('project status tone maps building and shipped states distinctly', () => {
  assert.equal(uiRules.getProjectStatusTone('building'), 'building');
  assert.equal(uiRules.getProjectStatusTone('shipped'), 'shipped');
  assert.equal(uiRules.getProjectStatusTone('weird'), 'building');
});

test('banner presets are defined for profile customization', () => {
  const presets = uiRules.getProfileBannerPresets();
  assert.ok(Array.isArray(presets) && presets.length >= 3);
  assert.ok(presets.every((preset) => preset.id && preset.label));
});

test('homepage hero can render attendee avatar stack', () => {
  const html = read('public', 'build.html');
  assert.match(html, /hero-attendees/);
  assert.match(html, /renderHeroAttendeeStack/);
});

test('leaderboard uses softer zero-win display', () => {
  const html = read('public', 'build.html');
  assert.match(html, /getLeaderboardWonDisplay/);
});

test('project cards use stronger status treatment', () => {
  const html = read('public', 'build.html');
  const profile = read('public', 'profile.html');
  assert.match(html, /project-status-pill/);
  assert.match(profile, /project-status-pill/);
});

test('profile page exposes banner preset controls and badge progress', () => {
  const html = read('public', 'profile.html');
  assert.match(html, /bannerPresetPicker/);
  assert.match(html, /badge-progress-bar/);
});

test('decks search includes an explicit search affordance', () => {
  const html = read('public', 'index.html');
  assert.match(html, /search-box-icon/);
  assert.match(html, /Search decks and presentations/);
});

test('footer is expanded beyond the minimal launch line', () => {
  const html = read('public', 'index.html');
  assert.match(html, /Privacy/);
  assert.match(html, /Docs/);
  assert.match(html, /Changelog/);
});
