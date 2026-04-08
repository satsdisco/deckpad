const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const read = (...parts) => fs.readFileSync(path.join(ROOT, ...parts), 'utf8');

test('project and foyer detail comment headers share the same title-plus-count structure', () => {
  const projectHtml = read('public', 'project.html');
  const foyerHtml = read('public', 'foyer-detail.html');
  assert.match(projectHtml, /comments-title-label/);
  assert.match(projectHtml, /commentsCountProj/);
  assert.match(foyerHtml, /comments-title-label/);
  assert.match(foyerHtml, /ideaCommentsCount/);
});

test('comments header styles include a consistent count chip', () => {
  const css = read('public', 'css', 'style.css');
  assert.match(css, /\.comments-title-wrap/);
  assert.match(css, /\.comments-count/);
});

test('decks cards use consistent two-row metadata layout with stable stat classes', () => {
  const html = read('public', 'index.html');
  const css = read('public', 'css', 'style.css');
  assert.match(html, /card-meta-primary/);
  assert.match(html, /card-meta-secondary/);
  assert.match(css, /\.card-meta-primary/);
  assert.match(css, /\.card-meta-votes/);
});

test('bounty UI uses bounty-specific participant language', () => {
  const bountyHtml = read('public', 'bounty.html');
  const buildHtml = read('public', 'build.html');
  assert.match(bountyHtml, /# Hunters/);
  assert.match(bountyHtml, /hunters' : 'hunter'/);
  assert.match(buildHtml, /participantLabel = participantCount === 1 \? 'hunter' : 'hunters'/);
});

test('speaker avatar styling looks intentional beyond a plain letter circle', () => {
  const eventHtml = read('public', 'event.html');
  assert.match(eventHtml, /speakerAvatarColor/);
  assert.match(eventHtml, /box-shadow: inset 0 1px 0 rgba\(255,255,255,0\.12\), 0 8px 18px/);
  assert.match(eventHtml, /font-family: var\(--font-mono\); letter-spacing: \.04em/);
});
