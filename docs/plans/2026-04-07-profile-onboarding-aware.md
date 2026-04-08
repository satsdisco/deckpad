# Profile Onboarding-Aware Follow-up Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Make the profile page feel like an actual continuation of onboarding instead of a dead detour from `/build`.

**Architecture:** Reuse the existing `/build` onboarding state, but pass explicit handoff intent into `/profile` so the profile page can render a focused setup card, highlight the missing profile pieces, and send the user back into the build flow once setup is done. Keep it lightweight: query-param handoff, client-side checklist state, and existing profile editors rather than inventing a second onboarding system.

**Tech Stack:** Static HTML templates, existing client-side JS in `public/build.html` and `public/profile.html`, shared CSS in `public/css/style.css`, node test snapshots in `tests/*.test.js`.

---

## Scope

This plan covers the next pass after the simplified `/build` onboarding checklist shipped.

### Current problems
- Clicking **Open profile** from build onboarding drops the user onto a normal profile page with no context.
- The profile page has useful setup controls, but they are scattered and easy to miss.
- There is no strong “you are here to finish setup” framing.
- Returning to the build flow is possible, but not presented as a clear next step.

### Desired outcome
- `/profile` can render a contextual onboarding state when reached from build onboarding.
- The user sees one compact setup panel with clear missing items and direct actions.
- Profile edits feel like part of onboarding, not random account management.
- The page offers an obvious way back to `/build` once setup is complete.

---

## Task 1: Add onboarding handoff into profile

**Objective:** Make the build onboarding send explicit intent when routing to `/profile`.

**Files:**
- Modify: `public/build.html`
- Test: `tests/remediation-batch12.test.js`

**Step 1: Write failing test**
Add assertions that the build onboarding profile action routes to `/profile?onboarding=1` instead of bare `/profile`.

**Step 2: Run targeted test**
Run: `node --test tests/remediation-batch12.test.js`
Expected: FAIL because the profile handoff param is missing.

**Step 3: Implement minimal change**
In `handleOnboardingAction('profile')`, route to:
```js
window.location.href = '/profile?onboarding=1';
```

**Step 4: Re-run targeted test**
Run: `node --test tests/remediation-batch12.test.js`
Expected: PASS for this assertion.

**Step 5: Commit**
```bash
git add public/build.html tests/remediation-batch12.test.js
git commit -m "feat: pass onboarding intent into profile"
```

---

## Task 2: Render a profile setup callout when onboarding intent is present

**Objective:** Add a visible profile-only onboarding card near the top of the owner’s profile.

**Files:**
- Modify: `public/profile.html`
- Modify: `public/css/style.css`
- Test: `tests/remediation-batch12.test.js`

**Step 1: Write failing test**
Add assertions for:
- a profile onboarding card container
- onboarding-intent detection helper
- copy like “Finish your profile setup”
- a return-to-build CTA

**Step 2: Run targeted test**
Run: `node --test tests/remediation-batch12.test.js`
Expected: FAIL because none of these hooks exist yet.

**Step 3: Implement minimal HTML/JS**
Add client-side helpers in `public/profile.html`:
- `hasProfileOnboardingIntent()`
- `clearProfileOnboardingIntent()`
- `renderProfileOnboardingCard(user)`

Render the card only when:
- `isOwn === true`
- query param `onboarding=1` is present

The card should include:
- title: `Finish your profile setup`
- short copy explaining why this page matters
- compact missing-items summary
- CTA: `Back to Build` linking to `/build?showOnboarding=1#events`
- dismiss/continue behavior that clears the query param after setup or skip

**Step 4: Add base styles**
Add `.profile-onboarding-card`, `.profile-onboarding-steps`, `.profile-onboarding-step`, `.profile-onboarding-actions` rules near existing profile section styles.

**Step 5: Re-run targeted test**
Run: `node --test tests/remediation-batch12.test.js`
Expected: PASS for card presence/styling assertions.

**Step 6: Commit**
```bash
git add public/profile.html public/css/style.css tests/remediation-batch12.test.js
git commit -m "feat: add profile onboarding setup card"
```

---

## Task 3: Turn scattered profile editors into explicit onboarding actions

**Objective:** Let the onboarding card drive the user to the exact missing profile fields.

**Files:**
- Modify: `public/profile.html`
- Modify: `public/css/style.css`
- Test: `tests/remediation-batch12.test.js`

**Step 1: Write failing test**
Add assertions that the onboarding card includes explicit actions for:
- bio
- links
- lightning
- availability

**Step 2: Run targeted test**
Run: `node --test tests/remediation-batch12.test.js`
Expected: FAIL because focused setup actions do not exist yet.

**Step 3: Implement helpers**
Add small JS helpers:
- `focusBioSetup()` → opens bio editor and focuses textarea
- `focusLinksSetup()` → opens links editor and focuses website field
- `focusLightningSetup()` → opens lightning editor and focuses input
- `focusAvailabilitySetup()` → opens availability editor and focuses hours input

**Step 4: Build missing-item logic**
Use current user data to compute missing pieces:
- bio missing if blank
- links missing if both website and github blank
- lightning missing if blank
- availability missing if no skills and no available_hours

Show each item as:
- `Done` state when present
- action button when missing

**Step 5: Re-run targeted test**
Run: `node --test tests/remediation-batch12.test.js`
Expected: PASS.

**Step 6: Commit**
```bash
git add public/profile.html public/css/style.css tests/remediation-batch12.test.js
git commit -m "feat: add focused profile onboarding actions"
```

---

## Task 4: Reflect progress and clear onboarding intent sanely

**Objective:** Make the profile onboarding card respond to edits and stop lingering stupidly.

**Files:**
- Modify: `public/profile.html`
- Test: `tests/remediation-batch12.test.js`

**Step 1: Write failing test**
Add assertions for:
- progress/count text on the profile onboarding card
- logic to clear onboarding query param when profile setup is complete

**Step 2: Run targeted test**
Run: `node --test tests/remediation-batch12.test.js`
Expected: FAIL because no progress/cleanup exists yet.

**Step 3: Implement progress behavior**
Add a simple score like:
- 0–4 items complete

Update card copy to say things like:
- `2 of 4 profile basics done`

When all profile basics are complete:
- show a success state
- offer `Back to Build`
- clear the `onboarding=1` param via `history.replaceState`

**Step 4: Re-run targeted test**
Run: `node --test tests/remediation-batch12.test.js`
Expected: PASS.

**Step 5: Commit**
```bash
git add public/profile.html tests/remediation-batch12.test.js
git commit -m "feat: track profile onboarding progress"
```

---

## Task 5: End-to-end verification on local dev and staging

**Objective:** Verify the new profile onboarding handoff works in the browser, not just in snapshot tests.

**Files:**
- No new files required unless fixes are needed

**Step 1: Run full test suite**
```bash
npm test
node --check server.js
```
Expected: PASS.

**Step 2: Run local dev server with dev auth**
```bash
BASE_URL='' PORT=3118 node server.js
```

**Step 3: Verify profile handoff**
Manual/browser checks:
1. Open `/build?showOnboarding=1#events`
2. Click `Open profile`
3. Confirm `/profile?onboarding=1`
4. Confirm profile onboarding card is visible
5. Trigger each missing-item action and confirm the correct editor opens
6. Confirm `Back to Build` returns to `/build?showOnboarding=1#events`

**Step 4: Push to staging**
```bash
git push origin staging
```

**Step 5: Staging sanity check**
Verify the same flow on staging after deploy.

---

## Notes / guardrails
- Do not replace the profile page with a wizard. Keep all normal profile content visible.
- Do not create a second persistent onboarding state store if query param + current user data is enough.
- Prefer revealing existing editors over inventing new modals.
- If a field is already complete, show it as done instead of nagging.
- Keep mobile in mind: the onboarding card should stack cleanly and buttons should be full-width at narrow widths.

---

## Suggested first implementation slice
Start with **Task 1 + Task 2** together:
- route `/build` → `/profile?onboarding=1`
- render a profile onboarding card with a back-to-build CTA

That gives immediate visible continuity on staging before the more detailed focused actions pass.
