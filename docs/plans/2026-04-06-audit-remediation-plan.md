# LunarPad Audit Remediation Plan

> **For Hermes:** Use `subagent-driven-development` for implementation if execution is delegated later.

**Goal:** Tackle the current audit issues without thrashing the product: fix credibility/security problems first, then remove UX dead ends, then ship higher-leverage polish and growth surfaces.

**Architecture:** LunarPad is currently a mostly server-rendered/static HTML app with inline client-side rendering logic in `public/*.html` and route/API logic in `server.js`. The cleanest path is to make small vertical slices: each slice touches the minimal HTML/JS/API pieces needed, ships behind existing route structure, and avoids a large redesign branch.

**Tech Stack:** Node.js, Express, SQLite (`node:sqlite`), static HTML pages in `public/`, shared CSS in `public/css/style.css`, inline JS renderers inside page templates.

---

## What the codebase says right now

### Core routes
- `server.js:778-823`
  - `/` → authenticated Build page (`public/build.html`)
  - `/decks` → authenticated Decks page (`public/index.html`)
  - `/foyer` → authenticated Foyer page (`public/foyer.html`)
  - `/event/:id`, `/bounty/:id`, `/profile/:id`, etc. are also auth-gated

### Key UI files tied to the audit
- `public/build.html`
  - featured event hero
  - secondary event cards
  - countdowns
  - past events section
  - leaderboard view
  - project cards
- `public/event.html`
  - real RSVP toggle behavior already exists here
- `public/bounty.html`
  - admin winner approval panel is conditionally rendered client-side
- `public/foyer.html`
  - bubble visualization + sparse empty/low-content state
- `public/foyer-detail.html`
  - Convert to Project CTA exists but is low-emphasis
- `public/profile.html`
  - badge UI, banner rendering, availability field
- `public/index.html`
  - Decks page title/search/footer
- `server.js`
  - auth gates
  - availability persistence
  - badge logic
  - idea/project conversion APIs
  - leaderboard data shaping

### Important product constraint
The app currently sends unauthenticated users to auth-gated routes. A public marketing page is not just a content task — it requires a root-route/auth-flow decision in `server.js`.

---

## Guiding principles

1. **Fix trust leaks first.** Anything that makes the product look fake, broken, or insecure comes before polish.
2. **Prefer small shippable slices.** No giant “audit fixes” branch.
3. **Use existing flows where possible.** Example: homepage RSVP should likely reuse `event.html` RSVP behavior/API rather than invent a second RSVP backend.
4. **Do not redesign everything at once.** For launch, clear > clever.
5. **Ship visible wins every pass.** Each pass should noticeably improve the site.

---

## Recommended rollout: 4 graceful passes

## Pass 1 — Launch blockers / credibility / permissions

**Target issues:**
- #15 Bounty admin controls visible to all logged-in users
- #14 Demo User exposed in leaderboard
- #12 View Recap leads to empty state
- #18 Profile availability defaults to `Hours/week: 0`
- #17 Decks page wrong title

**Why first:**
These are the highest-trust problems and lowest-risk fixes. They tighten permissions, remove obviously fake data, and eliminate embarrassing dead ends.

### Task 1.1: Lock admin-only bounty controls to admin-only rendering

**Objective:** Ensure non-admin users never see admin winner/payment controls.

**Files:**
- Modify: `public/bounty.html` around the admin section render (`~315-351`)
- Verify: `server.js` admin-only endpoints for bounty actions remain protected

**Implementation notes:**
- Keep backend authorization as the real source of truth.
- Add a QA check for three states:
  - anonymous user
  - logged-in non-admin
  - admin

**Acceptance criteria:**
- Only admins see “Approve Winner” / payout controls.
- Non-admin users see no admin affordance at all.

### Task 1.2: Remove demo/test accounts from public leaderboard output

**Objective:** Prevent obvious seed/test users from appearing publicly.

**Files:**
- Modify: leaderboard query/serialization in `server.js` (search around leaderboard handlers referenced from `public/build.html`)
- Verify: `public/build.html` leaderboard renderer does not depend on demo rows existing

**Implementation notes:**
- Best immediate fix: filter known demo/test accounts server-side.
- Better follow-up: add a durable hidden/test flag for users, but only if needed.

**Acceptance criteria:**
- “Demo User” no longer appears in production leaderboard data.

### Task 1.3: Fix past-event recap dead ends

**Objective:** Stop showing recap CTAs that lead to empty pages.

**Files:**
- Modify: `public/build.html` past-events rendering near `View Recap` (`~649-650`)
- Modify: optional event-page empty-state copy in `public/event.html`
- Modify: `server.js` event payloads if recap availability needs explicit data

**Implementation notes:**
- Fastest safe fix: only render “View Recap” when recap content actually exists.
- If recap content model does not exist yet, replace CTA with neutral label like “No recap yet”.

**Acceptance criteria:**
- No past event advertises a recap unless there is meaningful recap content.

### Task 1.4: Treat unset availability as unset, not zero

**Objective:** Make profile availability feel intentional.

**Files:**
- Modify: `public/profile.html` availability rendering around `~596-599`
- Modify: `server.js:741-746` only if null/zero handling needs cleanup

**Implementation notes:**
- Render blank/unset state as `—` or `Set hours`.
- Preserve `0` only if the user explicitly saved zero on purpose.

**Acceptance criteria:**
- Fresh/unset profiles do not show `Hours/week: 0` by default.

### Task 1.5: Fix page-title hygiene immediately

**Objective:** Give pages correct titles before broader SEO work.

**Files:**
- Modify: `public/index.html`
- Audit: `public/*.html`

**Implementation notes:**
- Change Decks title to `Decks — LunarPad`.
- Do a quick pass for any other obviously wrong/reused titles.

**Acceptance criteria:**
- Decks tab title is route-specific.

---

## Pass 2 — Broken primary journeys

**Target issues:**
- #9 Homepage RSVP duplicates View Event
- #10 Secondary event cards not clickable
- #11 Countdown clipping on rightmost event card
- #13 Past events has no more/pagination
- #16 Foyer bubble visualization lacks onboarding/instructions
- #34 Convert to Project CTA buried

**Why second:**
These are product-journey fixes. They remove friction from the most important browsing/conversion flows.

### Task 2.1: Reuse real RSVP behavior from the event page on the homepage hero

**Objective:** Make homepage RSVP feel like an action, not a duplicate link.

**Files:**
- Modify: `public/build.html` hero CTA block around `~720-723`
- Reference: `public/event.html` RSVP logic around `~201-202` and `~470-485`
- Modify: `server.js` only if current API/auth payloads are insufficient for homepage RSVP state

**Implementation notes:**
- Best path: make the homepage hero button call the same RSVP endpoint used by `event.html`.
- If auth/session details make that awkward, use a lightweight modal or inline confirmation state — not another redirect disguised as RSVP.

**Acceptance criteria:**
- Homepage RSVP performs a real RSVP flow or clearly indicates why not.
- “View Event” remains the navigation CTA.

### Task 2.2: Make all secondary event cards properly clickable and keyboard-accessible

**Objective:** Remove discoverability failure in the upcoming-events row.

**Files:**
- Modify: `public/build.html` event card renderer around `~733-771`
- Modify: supporting card styles in `public/css/style.css` if focus/hover states are missing

**Implementation notes:**
- Cards already have `onclick`; verify actual rendered row structure and keyboard behavior.
- If some cards are not clickable in practice, convert to semantic anchors or add overlay links.

**Acceptance criteria:**
- Every upcoming event card visibly behaves like a link.
- Keyboard users can open event cards.

### Task 2.3: Fix event-row overflow/countdown clipping

**Objective:** Ensure countdown chips fit at normal widths.

**Files:**
- Modify: `public/build.html` event card/countdown markup around `~764-768`
- Modify: shared CSS in `public/css/style.css`

**Implementation notes:**
- Inspect chip min-width, card width, gap, and carousel overflow.
- Prefer resilient layout fixes over one-off width hacks.

**Acceptance criteria:**
- Rightmost card does not clip the `Sec` column on standard desktop widths.

### Task 2.4: Add a visible path to more past events

**Objective:** Prevent historical content from disappearing silently.

**Files:**
- Modify: `public/build.html` past-events section
- Modify: `server.js` if additional paging/archive endpoint is needed

**Implementation notes:**
- Graceful launch version: add `View all past events` or `Load more`.
- Full version: support paginated historical event feed.

**Acceptance criteria:**
- Users can clearly discover more than the first past event.

### Task 2.5: Give the Foyer a low-content onboarding state

**Objective:** Make the bubble visualization self-explanatory.

**Files:**
- Modify: `public/foyer.html` header and bubble-container surrounding copy
- Modify: `public/css/style.css` if helper/tooltip styles are needed

**Implementation notes:**
- Add a one-line explainer above the visualization.
- Add interaction hint: “Click a bubble to explore an idea, join a team, or back it with sats.”
- Special-case sparse content so two bubbles does not feel like a broken graph.

**Acceptance criteria:**
- First-time users can understand what they are seeing within one glance.

### Task 2.6: Promote “Convert to Project” to a true primary CTA

**Objective:** Surface one of the strongest product actions.

**Files:**
- Modify: `public/foyer-detail.html` action row around `~99-108`
- Modify: `public/css/style.css` for stronger CTA styling

**Implementation notes:**
- This should become the visual hero action when conversion is available.
- Do not overcomplicate; stronger hierarchy is enough.

**Acceptance criteria:**
- Eligible idea pages clearly emphasize conversion to project.

---

## Pass 3 — Social proof, profile quality, and UX polish

**Target issues:**
- #29 Event hero should show attendee avatars
- #30 Leaderboard zero-state rows feel demoralizing
- #31 Project status badges need stronger prominence
- #32 Profile banners / presets
- #33 Visual badge progress
- #38 Decks search affordance
- #36 Footer needs real navigation

**Why third:**
These are valuable, but they are polish rather than blockers. They should land after the obviously broken bits are gone.

### Task 3.1: Add attendee-avatar stack to featured events

**Files:**
- Modify: `public/build.html`
- Reference: RSVP data availability in `server.js` and `public/event.html`

**Notes:**
- If RSVP payload lacks avatars, start with initials/fallback circles.
- Do not block this on perfect profile-photo coverage.

### Task 3.2: Soften leaderboard zero-state presentation

**Files:**
- Modify: `public/build.html` leaderboard renderer
- Optional: `server.js` if shaping fields server-side makes rendering cleaner

**Notes:**
- Replace repeated zeroes with `—` or de-emphasize zero metrics.

### Task 3.3: Strengthen project status scanability

**Files:**
- Modify: `public/build.html` and `public/profile.html` project-card renderers
- Modify: `public/project.html` if consistency matters
- Modify: `public/css/style.css`

**Notes:**
- Use one status system consistently across all project surfaces.

### Task 3.4: Add profile banner upload or curated presets

**Files:**
- Modify: `public/profile.html`
- Modify: `server.js`
- Create if needed: banner upload endpoint/preset selection model

**Notes:**
- Start with curated presets if upload scope is too big for the first pass.
- Current profile already has avatar upload/crop machinery; reuse patterns where possible.

### Task 3.5: Expose badge progress visually

**Files:**
- Modify: `public/profile.html`
- Reference: existing badge model in `server.js:363-429`

**Notes:**
- Simple progress bar + earned/unearned grouping is enough for V1.
- Unlock animations are optional later.

### Task 3.6: Clarify Decks search affordance

**Files:**
- Modify: `public/index.html`
- Modify: `public/css/style.css`

**Notes:**
- Add search icon and/or stronger placeholder copy.
- Keep the aesthetic if desired, but clarity wins.

### Task 3.7: Replace the placeholder footer with a launch footer

**Files:**
- Modify: shared footer markup in relevant `public/*.html`
- Possibly extract a shared include strategy later; for now consistency matters more than abstraction

**Notes:**
- Add docs/privacy/terms/social/contact at minimum.
- If legal pages do not exist yet, create stub pages before linking them publicly.

---

## Pass 4 — Marketing/SEO/growth surfaces

**Target issues:**
- #35 Public landing page for unauthenticated visitors
- #37 Unique meta descriptions and OG tags

**Why fourth:**
This is strategically important, but it is broader and can sprawl. Do it after the app looks trustworthy enough to send people to.

### Task 4.1: Decide root-route strategy

**Objective:** Separate public acquisition from authenticated app usage.

**Files:**
- Modify: `server.js:778-823`
- Create: `public/landing.html` (or equivalent)

**Decision required:**
Pick one:
1. `/` becomes public landing page, authenticated users CTA into `/build`
2. `/` conditionally serves landing page to anonymous users and app to signed-in users

**Recommendation:**
Use conditional root behavior. Best of both worlds; preserves product muscle memory.

### Task 4.2: Ship a minimal but solid landing page

**Files:**
- Create: `public/landing.html`
- Modify: `public/css/style.css`

**Minimum scope:**
- hero
- what LunarPad is
- core loops: ideas → projects → demos → bounties → sats
- CTA to sign in / join
- supporting proof/examples

### Task 4.3: Add route-specific metadata and OG tags

**Files:**
- Modify: `public/*.html`
- Possibly modify dynamic pages (`event.html`, `project.html`, `foyer-detail.html`, etc.) to update metadata client-side

**Notes:**
- Static routes can get hardcoded metadata first.
- Dynamic detail pages may need client-side `document.title` + meta tag hydration, or server-side rendering later.

---

## Suggested execution order by issue number

### Must-fix before broad public push
- #15
- #14
- #12
- #18
- #17
- #9
- #11
- #16
- #35
- #36
- #37

### High-value next
- #10
- #13
- #34
- #31
- #30
- #29

### Nice-to-have / polish after that
- #32
- #33
- #38

---

## Recommended branch strategy

- `fix/admin-ui-gating-and-trust-surfaces`
- `fix/events-and-foyer-primary-journeys`
- `feat/social-proof-profile-polish`
- `feat/public-landing-and-seo`

Keep PRs small and theme-based. Do **not** mix landing-page work with bounty/admin fixes.

---

## QA checklist for every pass

- Test as anonymous user
- Test as logged-in non-admin user
- Test as admin user
- Test desktop width around 1280px
- Test one narrower laptop breakpoint
- Confirm no console errors on touched pages
- Confirm no broken auth redirects
- Confirm touched CTAs have a meaningful destination/action

---

## Recommendation

**Best option:** start with **Pass 1 + the homepage RSVP fix from Pass 2**.

That gives the fastest credibility win with minimal design churn:
- hides sloppy admin UI
- removes fake/demo trust killers
- kills empty recap dead ends
- fixes obvious metadata/profile weirdness
- fixes the misleading RSVP button

That is the graceful path: less chaos, immediate visible improvement, and no giant rewrite.

---

## Proposed first implementation slice

1. #15 admin gating
2. #14 demo user removal
3. #12 recap dead-end cleanup
4. #18 availability unset-state
5. #17 Decks title fix
6. #9 homepage RSVP action

If executed cleanly, this should noticeably de-risk the product before touching bigger IA/marketing work.
