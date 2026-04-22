const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.join(__dirname, "..");
const buildHtml = fs.readFileSync(path.join(ROOT, "public", "build.html"), "utf8");

test("projects view exposes search, sort, quick filters, and summary UI", () => {
  assert.match(buildHtml, /id="projectSearch"/);
  assert.match(buildHtml, /id="projectSort"/);
  assert.match(buildHtml, /id="projectQuickFilters"/);
  assert.match(buildHtml, /id="projectResultsSummary"/);
  assert.match(buildHtml, /function resetProjectFilters\(\)/);
  assert.match(buildHtml, /id="projectTagBarWrap" style="display:none"/);
  assert.match(buildHtml, /id="projectTagOverflowHint" style="display:none"/);
});

test("projects filtering logic separates Lunar Rails and BTC discovery", () => {
  assert.match(buildHtml, /const PROJECT_LUNAR_KEYWORDS = \['lunar'\]/);
  assert.match(buildHtml, /const PROJECT_BITCOIN_KEYWORDS = \[/);
  assert.match(buildHtml, /function isLunarRailsProject\(project\)/);
  assert.match(buildHtml, /function isBitcoinProject\(project\)/);
  assert.match(buildHtml, /activeProjectQuickFilter === 'lunar_rails'/);
  assert.match(buildHtml, /activeProjectQuickFilter === 'btc'/);
});

test("default signal sorting prioritizes Lunar Rails projects first", () => {
  assert.match(buildHtml, /const lunarPriority = Number\(isLunarRailsProject\(b\)\) - Number\(isLunarRailsProject\(a\)\)/);
  assert.match(buildHtml, /return getProjectSignalScore\(b\) - getProjectSignalScore\(a\);/);
});

test("project cards render cleaner chip rows and stats for zaps and votes", () => {
  assert.match(buildHtml, /project-chip-row/);
  assert.match(buildHtml, /project-chip project-chip-category/);
  assert.match(buildHtml, /project-chip project-chip-tag/);
  assert.match(buildHtml, /project-card-stats/);
  assert.match(buildHtml, /Most zaps/);
  assert.match(buildHtml, /🌙 Lunar Rails/);
  assert.match(buildHtml, /₿ BTC/);
});
