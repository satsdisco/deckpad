# Lunar\Hangout Product Spec

**Status:** Proposed
**Owner:** LunarPad
**Date:** 2026-04-07

---

## 1. Summary

**Lunar\Hangout** is a live event layer for LunarPad.

It turns LunarPad from a place where builders post decks, projects, events, and bounties into a place where the community can **gather live**, watch builders present, vote, zap, and determine outcomes together.

The first mode under Lunar\Hangout is **Demo Day Live**.

Demo Day Live is not a replacement for video calling on day one. It is a **live event companion and stage layer** that sits on top of a Google Meet call.

### Core framing
- **Google Meet is the room**
- **LunarPad is the stage**

Meet handles voice/video.
LunarPad handles the live event mechanics:
- presenter queue
- live stage state
- deck display
- voting
- zaps
- timing
- payout flow
- recap/results artifact

---

## 2. Product Goal

Create a live event system that makes LunarPad feel like the natural place to run community demo days, bounty reviews, and builder hangouts.

### High-level goal
Make live events on LunarPad feel:
- structured
- participatory
- Bitcoin-native
- rewarding
- memorable after they end

### Why this matters
Today, live sessions mostly happen in external tools and LunarPad is adjacent to them.
Lunar\Hangout makes LunarPad the place where the meaningful event state lives.

That means:
- stronger product identity
- stronger reason to return
- tighter loop between **build → present → vote → earn → recap**
- a more durable content artifact after the event ends

---

## 3. Vision

Lunar\Hangout becomes the umbrella for live participation on LunarPad.

Over time it should support:
- demo days
- office hours
- founder hot seats
- bounty review sessions
- community hangouts
- recurring live rooms

### First concrete mode
**Demo Day Live** is the first productized mode because it is:
- already close to current community behavior
- structured enough to design cleanly
- naturally compatible with voting and payouts
- a strong showcase for decks, projects, and sats-native interaction

---

## 4. Product Principles

### 4.1 Google Meet companion first
Do not build native audio/video first.
Ship a companion/stage layer first.

### 4.2 Live event state must be obvious
At any moment, users should be able to tell:
- what event this is
- whether it is live
- who is presenting now
- who is up next
- whether voting is open
- how much time is left
- whether the winner is decided
- whether payout is pending or complete

### 4.3 Presentation should be tied to real LunarPad objects
Presenters should connect to existing:
- user profile
- project
- deck
- event speaker slot

### 4.4 Recaps matter
Every live event should leave behind a useful artifact.
The session cannot vanish into nothing after the call ends.

### 4.5 Bitcoin-native, but not pay-to-win
Zaps should matter as live support and social proof.
But v1 should not make demo-day outcome feel like whoever spent the most money wins.

---

## 5. Target Users

### 5.1 Hosts / organizers
People running demo days, community calls, showcase events, or review sessions.

They need:
- event control
- presenter sequencing
- confidence that the audience understands what is happening
- a clean way to run winner selection and payout

### 5.2 Presenters / builders
People showing what they built.

They need:
- clear queue status
- smooth handoff to the stage
- their deck/project shown properly
- a fair chance to be voted on
- recognition and potentially payout

### 5.3 Audience / community
People watching, reacting, voting, zapping, and following the event.

They need:
- a clear stage
- a clear way to participate
- confidence that the process is legible and real
- satisfying event flow and results

---

## 6. Primary Use Cases

### 6.1 Demo Day Live
A recurring or one-off event where builders present in sequence and the audience votes.

### 6.2 Bounty Review Live
Builders present bounty submissions, sponsors/community evaluate them, and payout decisions happen with visibility.

### 6.3 Community Hangout / Office Hours
A lower-structure live room where builders rotate through a hot seat and get feedback.

---

## 7. Scope by Phase

## Phase 1 — Meet Companion
**Goal:** make LunarPad the event control and participation layer while Meet handles the call.

### Included
- event page gains a **Live Mode**
- event host controls
- presenter queue / lineup state
- current presenter spotlight
- stage deck / project display
- optional Meet link attached to the live event
- audience can follow the event in LunarPad while staying in Meet

### Explicitly not included
- native audio/video
- in-app livestreaming
- built-in voice chat rooms

---

## Phase 2 — Live Stage + Deck + Voting + Zaps
**Goal:** make the event page itself feel like the stage.

### Included
- presenter currently live
- active deck / project stage
- event timer
- voting state
- zaps tied to presenter/project during the session
- audience-facing current status states

### Success criteria
Users can follow the event from LunarPad without guessing what is happening.

---

## Phase 3 — Manual Host-Confirmed Payout
**Goal:** make winner selection and payout trustworthy.

### Included
- host sees vote/zap results clearly
- winner recommendation shown by system
- host manually confirms payout
- payout status shown publicly after confirmation

### Why manual first
This avoids:
- accidental payout mistakes
- disputes caused by automation bugs
- over-complicated trust logic in v1

---

## Phase 4 — Post-Event Recap / Results Page
**Goal:** turn a live event into durable content.

### Included
- winner
- presenter ranking / results summary
- total votes
- total sats zapped
- presenters and linked decks/projects
- event recap/result page

### Why it matters
This closes the loop and gives the event a shelf life.

---

## Phase 5 — Recurring Hangouts / Office Hours
**Goal:** expand beyond structured demo day into a broader live community layer.

### Included
- recurring hangout format
- hot-seat queue
- lower-ceremony participation flow
- reusable room patterns

---

## 8. Demo Day Live v1 Requirements

## 8.1 Host controls
The host needs a dedicated control surface.

### Required controls
- start live mode
- end live mode
- advance to next presenter
- mark presenter as live
- open voting
- close voting
- confirm winner
- confirm payout
- mark presenter as actually presented

### Nice later
- reorder queue live
- skip presenter
- pause timer
- reopen voting

---

## 8.2 Presenter queue
The event page must show queue state clearly.

### States
- scheduled
- up next
- live now
- presented
- skipped
- winner

### Required UX
- visible lineup rail/list
- current presenter emphasized strongly
- next presenter visible
- completed presenters visibly separated from upcoming ones

---

## 8.3 Stage layer
The current presenter should have a real stage presence in LunarPad.

### Required elements
- presenter identity
- linked project
- linked deck
- live stage panel
- current timer / time left
- event state label

### Stage copy examples
- Live now
- Up next
- Voting open
- Voting closed
- Winner pending
- Payout sent

---

## 8.4 Voting
### Recommendation for v1
Use **votes** to determine the winner.

### Why
- easiest to understand
- fairest social signal in v1
- lower friction than sats-only participation
- less pay-to-win energy

### v1 constraints
- signed-in users only
- one vote per user per presenter or one winner vote per event
- no anonymous voting

### Future possibilities
- weighted voting
- judge weighting
- audience + judge blend
- sponsor-only mode for bounty review

---

## 8.5 Zaps
### Role of zaps in v1
Zaps are a **conviction/support layer**, not the primary winner mechanic.

### Zaps should do
- visibly reward presenters/projects live
- create energy and feedback during presentations
- be shown next to votes on the live scoreboard
- appear in recap/results

### Zaps should not do in v1
- fully determine the winner
- create obvious rich-user domination dynamics

---

## 8.6 Winner determination
### v1 recommendation
**Most votes wins**

### Display recommendation
Show:
- votes
- sats zapped
- recommended winner

Host confirms the winner manually.

### Future options
- hybrid votes + zaps formula
- sponsor/judge override
- category-based awards
- separate “community favorite” vs “most zapped”

---

## 8.7 Payout flow
### v1 recommendation
Manual host-confirmed payout.

### Flow
1. voting closes
2. system shows winner recommendation
3. host confirms winner
4. host confirms payout
5. public UI updates to payout complete / winner confirmed

### Why
- safer operationally
- easier to audit socially
- less damaging if event logic changes later

---

## 9. UX Flow

## 9.1 Host flow
1. Host creates or opens event
2. Host enters Live Mode
3. Meet link is available if used
4. First presenter goes live
5. Audience follows stage in LunarPad
6. Host opens/closes voting at the right time
7. Host advances queue
8. Event ends
9. Host confirms winner and payout
10. Results page is generated

## 9.2 Presenter flow
1. Presenter signs up / is scheduled
2. Presenter gets queue position
3. Presenter becomes up next
4. Presenter goes live
5. Their deck/project is shown in LunarPad
6. Audience votes/zaps
7. Presenter becomes presented/winner/non-winner

## 9.3 Audience flow
1. Join event page
2. Optionally join Meet
3. See who is live now
4. Follow deck/project in LunarPad
5. Vote when voting opens
6. Zap if desired
7. See results and payout outcome
8. Read recap later

---

## 10. Core Screens / Surfaces

### 10.1 Event detail page with Live Mode
This becomes the main live surface.

### 10.2 Host control panel
Likely visible only to admin/host roles.

### 10.3 Presenter queue rail
Visible to everyone.

### 10.4 Stage panel
Main audience focus area.

### 10.5 Live scoreboard
Votes + zaps + statuses.

### 10.6 Results / recap page
Persistent post-event artifact.

---

## 11. Data / State Model Requirements

The system will need explicit event-participation state.

### Important presenter/event states
- signed_up
- scheduled
- live
- presented
- winner
- paid

### Important warning
Do not treat “signed up” as “presented.”
This is the same class of mistake as awarding presenter identity too early.

The product must distinguish between:
- booked to present
- actually presented
- won
- got paid

---

## 12. Success Metrics

### Initial product metrics
- % of demo day participants who use LunarPad during the live event
- % of presenters with linked deck/project shown on stage
- audience votes per event
- sats zapped per event
- time from event end to published results page
- repeat usage for next live event

### Quality metrics
- hosts can run a session without confusion
- audience understands the event state at a glance
- presenters feel fairly represented
- recap/result artifact is useful after the event

---

## 13. Risks

### 13.1 Vote abuse
Need sign-in gating and simple anti-abuse rules.

### 13.2 Host overload
Too many controls will make live hosting stressful.

### 13.3 Presenter friction
If “go live” is awkward, presenters will just ignore LunarPad and screen share in Meet.

### 13.4 Payout disputes
Never auto-pay too early.
Manual confirmation first.

### 13.5 Scope creep into full conferencing
Do not slide into building Zoom before the event layer is excellent.

---

## 14. Non-Goals for v1

- native video conferencing
- browser-based audio rooms
- livestream encoding
- full live chat system
- complicated moderation system
- advanced judge scoring models
- multi-room breakout architecture

---

## 15. Roadmap Placement

### New umbrella initiative
**Lunar\Hangout** — live event layer for LunarPad

### First roadmap deliverable
**Demo Day Live**

### Recommended shipping order
1. Meet companion
2. Live stage + deck + voting + zaps
3. Manual host-confirmed payout
4. Post-event recap / results page
5. Expand into recurring hangouts / office hours

---

## 16. Recommendation

Ship Lunar\Hangout as a **Meet companion first**, not as a native conferencing product.

That gives LunarPad a strong live-event identity quickly, with lower technical risk and much higher odds of something people actually use.

The first thing to build is **Demo Day Live** as a structured, Bitcoin-native event stage.
