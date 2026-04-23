const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const read = (...parts) => fs.readFileSync(path.join(ROOT, ...parts), 'utf8');

test('server stores bounty submission file attachment metadata and migration columns', () => {
  const server = read('server.js');
  assert.match(server, /attachment_name TEXT/);
  assert.match(server, /attachment_path TEXT/);
  assert.match(server, /attachment_mime TEXT/);
  assert.match(server, /attachment_size\s+INTEGER DEFAULT 0/);
  assert.match(server, /v027_bounty_submission_files/);
  assert.match(server, /v028_bounty_submission_backfill/);
  assert.match(server, /INSERT INTO bounty_submissions \([\s\S]*FROM projects p[\s\S]*JOIN bounties b ON b.id = p.bounty_id/);
});

test('server exposes file-upload and project-backed bounty submission flows', () => {
  const server = read('server.js');
  assert.match(server, /const submissionUpload = multer\(/);
  assert.match(server, /Only \.ppt, \.pptx, \.md, or \.pdf files are accepted/);
  assert.match(server, /app\.post\('\/api\/bounties\/:id\/submissions\/file', requireAuth, submissionUpload\.single\('file'\)/);
  assert.match(server, /attachment_name, attachment_path, attachment_mime, attachment_size, status/);
  assert.match(server, /const submissionFileUrl = `\/submission-files\/\$\{submissionId\}\/\$\{safeAttachmentName\}`/);
  assert.match(server, /endsWith\(ext\)/);
  assert.match(server, /if \(bounty_id\) \{[\s\S]*INSERT INTO bounty_submissions \([\s\S]*submission_type, title, summary, project_id, deck_id, status/);
});

test('bounty page offers upload file or upload project choices', () => {
  const bountyHtml = read('public', 'bounty.html');
  assert.match(bountyHtml, /Upload File/);
  assert.match(bountyHtml, /Upload Project/);
  assert.match(bountyHtml, /accept="\.ppt,\.pptx,\.md,\.pdf"/);
  assert.match(bountyHtml, /submitFileSolution\(/);
  assert.match(bountyHtml, /submitProjectSolution\(/);
  assert.match(bountyHtml, /Choose how to submit your solution/);
});

test('build page admin copy still approves winners from submitted solutions', () => {
  const buildHtml = read('public', 'build.html');
  assert.match(buildHtml, /Only submitted solutions can win/);
  assert.match(buildHtml, /Select submitted solution/);
  assert.match(buildHtml, /submission_id: selectedSubmissionId/);
});
