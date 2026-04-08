# Projects + Bounties Polish Batch Implementation Plan

> **For Hermes:** Execute this as one focused remediation pass, keeping the diff scoped to the already-touched issue files.

**Goal:** Ship a small, high-confidence polish batch that closes several open UX bugs on Projects, Bounties, and Events without mixing in the larger live-event work.

**Architecture:** Reuse the existing in-progress workspace changes in `public/build.html`, `public/bounty.html`, `public/project.html`, and shared CSS, then verify them with the existing remediation regression test file. Keep this pass presentation/UI focused and avoid touching unrelated live-event/server work.

**Tech Stack:** Vanilla HTML/CSS/JS, Node test runner, GitHub issues, LunarPad staging branch.

---

## Recommended batch

### Ship together now
- **#59** Projects: explicit empty state for empty Presentations tab
- **#60** Bounties: suppress Boost on completed bounties
- **#61** Bounties: deduplicate Recent Contributors
- **#62** Bounties: improve inactive stepper contrast
- **#64** Bounties: strengthen `+ Create Bounty` CTA
- **#65** Events: visually group carousel controls with event cards

### Hold for later pass
- **#63** Bounties deadline / expiration clarity
- **#74** Countdown timers target exact scheduled start time
- **#54** Project banner ownership restriction
- **#55–58** Remaining Projects-page affordance/content issues

Reason: the first group is already clustered in a tiny UI-only diff and can be verified quickly with one regression file.

---

## Execution steps

### Task 1: Verify the intended scoped diff
**Objective:** Confirm the current batch only touches the intended polish surfaces.

**Files:**
- Inspect: `public/build.html`
- Inspect: `public/bounty.html`
- Inspect: `public/project.html`
- Inspect: `public/style.css`
- Inspect: `tests/remediation-batch4.test.js`

**Steps:**
1. Review `git diff -- public/build.html public/bounty.html public/project.html public/style.css tests/remediation-batch4.test.js`
2. Confirm the diff maps cleanly to issues `#59 #60 #61 #62 #64 #65`
3. Do **not** pull unrelated live-event/server changes into this pass

### Task 2: Verify remediation test coverage
**Objective:** Make sure the regression file asserts the shipped behaviors.

**Files:**
- Test: `tests/remediation-batch4.test.js`

**Checks:**
- carousel toolbar grouping assertions for `#65`
- completed-bounty boost suppression for `#60`
- contributor dedupe assertions for `#61`
- presentations empty state assertions for `#59`
- stronger inactive timeline + CTA assertions for `#62` and `#64`

### Task 3: Run targeted validation
**Objective:** Prove the batch works before commit.

**Commands:**
```bash
node --test tests/remediation-batch4.test.js
```
Expected: pass

```bash
node --check server.js
```
Expected: no syntax errors

### Task 4: Commit as one remediation pass
**Objective:** Keep the commit legible and issue-oriented.

**Suggested commit message:**
```bash
git commit -m "fix: polish projects bounties and events remediation batch"
```

### Task 5: Push to staging and close shipped issues
**Objective:** Keep the tracker honest once the pass is live.

**Commands:**
```bash
git push origin staging
```

Then close:
- `#59`
- `#60`
- `#61`
- `#62`
- `#64`
- `#65`

With a short comment noting the remediation batch shipped to staging.

---

## Notes
- The repo currently has unrelated uncommitted work. Keep this batch scoped and avoid accidental inclusion.
- `#63` and `#74` are real follow-ups, but they should be their own pass because they involve date/time correctness and likely broader testing.
- If the user wants the fastest visible momentum, this batch is the right one to ship first.
