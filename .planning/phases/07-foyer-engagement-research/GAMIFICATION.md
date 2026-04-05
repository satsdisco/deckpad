# Gamification and Engagement Research: The Foyer

**Context:** LunarPad is an internal BuildInPublic platform for a Bitcoin builder community. Initial scale is 10-50 active users. Existing infrastructure includes upvotes, Lightning zaps, badges, and a leaderboard. This research informs what engagement mechanics to add or avoid in The Foyer and across the platform.

---

## 1. Reputation Systems

### How they work on major platforms

**Stack Overflow:** Points from upvotes unlock capabilities (comment at 50, vote at 15, close questions at 3000). Reputation is visible on every post. High-rep users have observable social authority that new users don't.

**GitHub:** Contribution graphs, stars, follower counts, and org membership signals are all passive reputation markers. No explicit points system, but activity visibility creates implicit status.

**Discord:** Server-specific levels via bots (MEE6, etc.) grant roles that unlock channels or permissions. Tied to message volume, which rewards noise.

**What works:**
- Reputation tied to specific, observable actions (not just time spent)
- Reputation that unlocks genuine capabilities, not just cosmetic rewards
- Public scores that others can verify (you can check anyone's Stack Overflow rep)
- Specialised reputation (reputation in "Python" vs global rep) avoids all-or-nothing dynamics

**What backfires:**
- Points awarded for volume (Discord message counts) rewards spam
- Reputation decay mechanics feel punitive and drive anxiety
- Global leaderboards at small scale: if 3 people dominate the top spots permanently, everyone else disengages
- Reputation that can't be earned by newcomers fast enough to feel meaningful

### Relevance to LunarPad

| Aspect | Assessment |
|---|---|
| Scale fit | Reputation works at small scale only if it unlocks real things, not just cosmetic badges |
| Implementation complexity | Simple: extend existing badges system with point totals |
| Recommendation | Reputation as capability gate (e.g. voting on project quality at X points) is worth it; reputation as pure social score is not at this scale |

LunarPad already has badges. The gap is that badges don't unlock anything. Making them gate real features (posting bounties, converting ideas to projects, nominating demo day speakers) would make them meaningful.

---

## 2. Streak Mechanics

### How they work on major platforms

**Duolingo:** Daily streak counter, streak freeze power-ups, email reminders. Streak loss triggers aggressive re-engagement. Heavily studied: streaks drive daily active users more than any other mechanic.

**GitHub contribution graph:** Continuous streak is implicit and visual. The green squares create FOMO for the gap. Not enforced, but psychologically sticky for developers who already have a public profile.

**Snapchat:** Bilateral streaks (both parties must engage). Creates obligation, not just habit. High anxiety when streaks break.

**What works:**
- Streaks with low activation energy (Duolingo: 1 lesson = maintained)
- Visual representations that show momentum (GitHub graph as evidence of sustained work)
- Optional, not required: users who opt in feel ownership

**What backfires:**
- Streaks that punish absence (vacations, illness) turn engagement into anxiety
- Bilateral streaks (Snapchat model) create social obligation and resentment
- Streaks tied to low-value actions inflate the metric

### Relevance to LunarPad

| Aspect | Assessment |
|---|---|
| Scale fit | Poor at 10-50 users. Streaks need daily interaction to sustain; a small community may not generate enough content to justify daily visits |
| Implementation complexity | Simple: track last_active per user, show streak on profile |
| Recommendation | Skip streaks for now. At this scale they'll feel hollow. Revisit at 100+ active users with daily content volume to justify them |

The GitHub contribution graph model (passive visual of activity over time, no obligation) is worth considering as a low-pressure alternative. A builder activity heatmap on profiles costs little and signals dedication without punishing gaps.

---

## 3. Leaderboards

### How they work on major platforms

**Stack Overflow:** All-time rep leaderboard. Weekly and monthly variants. Segmented by tag (top Python answerers). The all-time list is effectively frozen once early adopters establish dominance.

**Hacker News:** Implicit karma leaderboard, not surfaced prominently. Karma visible on profiles but no ranking page.

**Twitch:** Real-time subscriber counts and Bits leaderboard on channel pages. Rolling 30-day donor boards. Creates immediate FOMO and competition.

**Product Hunt:** Daily/weekly top products. Resets encourage repeat participation.

**What motivates:**
- Rolling time windows (past 30 days) let newcomers compete with established users
- Category segmentation (most helpful vs most active vs top builder) avoids one person winning everything
- Opt-in or opt-out: not everyone wants to be ranked

**What discourages:**
- All-time boards freeze quickly at small scale. Top 3 positions go to whoever joined first.
- Single-dimension boards (most posts) reward quantity over quality
- Visible last-place positions humiliate, especially in a small community where everyone knows each other

### LunarPad already has a leaderboard

The existing `/leaderboard` sorts by earners, zappers, projects, and active. This is the right multi-category approach.

| Leaderboard type | Recommendation |
|---|---|
| All-time earners | Keep, sats earned is verifiable and hard to game |
| All-time zappers | Keep, it signals generosity and is Bitcoin-native |
| Most active | Change to rolling 30 days, not all-time |
| Top builder | Define clearly (projects converted from ideas? demo day appearances?) |
| Foyer-specific: most zapped ideas | Worth adding to The Foyer page as a signal of idea quality |

**Key constraint at small scale:** Never show rank numbers below top 5. Showing someone is ranked 47th out of 50 is discouraging with no upside.

---

## 4. Progression Systems

### How they work on major platforms

**Reddit:** Karma milestones unlock posting in certain subreddits. Not communicated well, but exists.

**Stack Overflow:** The clearest example. Capabilities unlock at specific rep thresholds. 15 rep to upvote, 50 to comment, 125 to downvote, 2000 to edit posts. Each milestone feels earned because it reflects demonstrated participation.

**Discord servers:** Role progression via message count (MEE6) or manual admin grants. Roles unlock hidden channels.

**HackerNews:** Karma gates (500+ to flag posts, 10,000+ to see vote totals). Gates are not well publicized, which makes them feel arbitrary.

**What works:**
- Gates tied to demonstrated behaviour, not just time served
- Small number of tiers (3-5) with meaningful capability difference between each
- Transparent criteria: tell people what they're working toward

**What backfires:**
- Too many tiers feel like busywork
- Opaque gates (you hit a wall with no explanation)
- Gates that lock out legitimate new users who have valuable contributions

### Relevance to LunarPad

LunarPad has badges but no capability gates. The platform would benefit from 3 tiers:

| Tier | Name | Criteria | Unlocks |
|---|---|---|---|
| 0 | New builder | Just joined | Post ideas, vote, comment |
| 1 | Builder | 5+ sats received OR 3+ projects submitted | Convert ideas to projects, nominate demo day speakers |
| 2 | Core builder | 1000+ sats received OR 10+ projects | Post bounties, set idea conversion terms, featured profile slot |

Implementation complexity: Medium. Requires checking tier on relevant actions. Can be computed from existing data (sats received, project count).

At 10-50 users, tiers matter for legitimacy more than gatekeeping: "Core builder" as a title carries social weight in a small community.

---

## 5. Social Proof Signals

### How they work on major platforms

**Product Hunt:** "X people are upvoting this right now" creates real-time momentum. Comment count spikes signal activity.

**Kickstarter:** Progress bars with backer counts and time remaining. Velocity ("funded in 2 hours") signals credibility.

**Twitter/X:** "Trending in your network" surfaces content with social momentum in your specific graph.

**Booking.com:** "12 people looking at this hotel right now" and "Last booked 3 hours ago" are documented dark patterns. They work, but they also erode trust.

**What works:**
- Recent activity signals ("3 builders joined this idea today") feel informative, not manipulative
- Velocity over absolute numbers: 5 votes in an hour is more interesting than 100 votes total
- Social graph proximity: "Alice and Bob voted on this" is more compelling than "2 people voted"

**What backfires:**
- Fake or inflated signals (Booking.com model). Small communities see through this fast.
- Anxiety-inducing signals ("Only 2 spots left on this team") create artificial scarcity in a community context, which feels off.
- Showing engagement on low-activity days: "0 views in the past week" is demoralizing.

### Relevance to LunarPad

| Signal type | Recommendation |
|---|---|
| "X builders joined this idea in the past 7 days" | Yes. Honest signal of recent momentum |
| "Most zapped idea this week" | Yes. Featured badge on The Foyer list |
| Real-time viewer counts | No. At this scale, it'll show 0 or 1 most of the time |
| "Alice, Bob, and 2 others upvoted this" | Yes. Named social proof hits harder in small communities |
| Activity timestamps ("last comment 2 days ago") | Yes. Shows ideas that are alive vs dormant |

The named social proof mechanic is particularly strong at small scale because every name is recognizable. "Satoshi_dev and 3 others are on this team" means more than an anonymous count.

Implementation complexity: Simple. These are display-layer changes on existing vote/team data.

---

## 6. Bounty and Reward Mechanics

### How they work on major platforms

**Gitcoin:** Bounties for open source issues. Monetary. Works for well-defined technical tasks. Attracts contributors who might not otherwise engage but also attracts drive-by work.

**Stack Overflow Bounties:** Rep-based (not money), put up by question asker. Creates urgency and signals value. The asker loses rep whether or not the bounty is awarded.

**HackerNews:** No monetary rewards. Pure intrinsic motivation. Sustained by strong signal-to-noise reputation.

**Open Collective / GitHub Sponsors:** Recurring monetary support. More about sustainability than task completion.

**The crowding out problem:** Research (Deci, Ryan, Lepper et al.) consistently shows that introducing monetary rewards for intrinsically motivated activities can reduce intrinsic motivation after the reward is removed. This is the "overjustification effect." It is most pronounced when:
- The reward is contingent on performance (not just participation)
- The person already cares about the activity for its own sake
- The reward feels controlling rather than affirming

**What works in this context:**
- Sats as signal, not salary. A 500 sat zap on an idea means "I believe in this." It is a vote with economic weight.
- Bounties for specific, defined work (fix this bug, implement this feature) work well because the task has an end state. The monetary incentive does not crowd out intrinsic motivation because the intrinsic motivation was always instrumental.
- Matching mechanics: "Idea has 5000 sats pooled; company will match 2x when it reaches project status" creates momentum without replacing intrinsic motivation.

**What backfires:**
- Paying people to post ideas. You'll get garbage ideas optimised for payout, not quality.
- Competitive bounties with a single winner. Losers feel cheated. Works for external competitions, corrosive for internal community.
- Retroactive monetary rewards for community contribution (moderating, helping others). Once established, removing them destroys trust.

### Relevance to LunarPad

LunarPad's existing sats pool on ideas is well-designed. Sats accumulate on ideas before conversion, meaning the pool is attached to the problem and the future team, not to the person who posted the idea. This avoids the crowding-out problem.

| Mechanic | Recommendation |
|---|---|
| Sats pool on ideas (existing) | Keep. Correct design. |
| Bounties for specific tasks within ideas | Worth adding as The Foyer matures |
| Company sats match for high-voted ideas | Strong mechanic. Low cost, high signal of institutional backing |
| Paying for idea posts | Never. Kills quality immediately |
| Leaderboard for sats earned | Keep (already exists). Sats earned reflects actual delivery, not gaming |

Implementation complexity: Company match mechanic is Medium (requires admin-settable match multipliers). Everything else is existing infrastructure.

---

## 7. Anti-Patterns

### Gamification that backfires

**Quantity-over-quality rewards**
Awarding points for post count, comment count, or login streak creates spam. Stack Overflow has this problem with low-quality answers posted to accumulate rep. For a small builder community, this is fatal: 10 garbage ideas drown out 1 good one.

*How to avoid:* Weight rewards by received upvotes and zaps, not by submission count. A post that nobody engages with should earn nothing.

**Toxic competition**
Leaderboards and bounties that pit community members against each other for zero-sum prizes. "Only one person can win this bounty" works for external hackathons but damages internal trust. People stop helping each other when they're competing for the same prize.

*How to avoid:* Make most rewards cumulative (sats pooled for the whole team, not one winner) and most recognition non-competitive (featured ideas, builder spotlights).

**Manufactured FOMO**
"Only 2 hours left to vote on this idea." Artificial urgency in a community context reads as manipulation. Community members talk to each other. They will notice.

*How to avoid:* Use natural deadlines only (demo day submission cutoffs are real, artificial countdown timers are not).

**Public shaming through visibility**
Showing low engagement metrics prominently: "0 upvotes, 0 comments, 0 team members." In a small community where the author is identifiable, this is embarrassing. Nobody will post risky or early-stage ideas if failure is this visible.

*How to avoid:* Show positive engagement metrics when present; omit or minimise zeros. Only show "no team yet" as an invitation ("Be the first to join"), not as evidence of failure.

**Streak anxiety**
Mechanics that punish absence. Duolingo has documented that streaks create anxiety and that users who lose streaks often churn entirely. For a builder community that competes for time with actual building work, this is counterproductive.

*How to avoid:* Do not build streak mechanics. If you track activity history, make it celebratory (what you've done) not punitive (what you've missed).

**Opaque rules**
Badge criteria hidden, tier thresholds undocumented, leaderboard formula unclear. Small communities build trust through transparency. If the rules seem rigged or arbitrary, people disengage and distrust the platform.

*How to avoid:* Publish all criteria. If someone asks "how do I earn the Core Builder badge?" the answer should be one click away.

**Gamifying intrinsic community behaviour**
Adding points for helping other builders, answering questions, or giving feedback on ideas. This can shift the perceived motive of helpful behaviour from "genuine interest" to "point farming," which damages community trust even if the helpfulness continues.

*How to avoid:* Recognize helpful behaviour with non-point mechanisms: featured profiles, spotlights, admin-granted roles. Keep the points system tied to build output, not social behaviour.

---

## Summary Table

| Mechanic | Relevance at 10-50 users | Complexity | Recommendation |
|---|---|---|---|
| Reputation points with capability gates | High, if gates are real | Medium | Yes, 3-tier system |
| Badges (existing) | Medium | Done | Extend to unlock capabilities |
| Streaks | Low | Simple | Skip for now |
| Activity heatmap on profile | Medium | Simple | Worth adding |
| Rolling leaderboard (30-day) | High | Simple | Yes, replace all-time "most active" |
| Category leaderboards | High | Done (exists) | Keep, extend for Foyer |
| Social proof: named upvoters | High | Simple | Yes |
| Social proof: recent team joins | High | Simple | Yes |
| Real-time viewer counts | Low | Simple | No, shows 0 too often |
| Sats pool on ideas | High | Done | Keep, well-designed |
| Company sats match | High | Medium | Strong mechanic, worth building |
| Bounties for specific tasks | Medium | Exists for projects | Extend to Foyer when ready |
| Streak mechanics | Low | Simple | Do not build |
| Single-winner competitive bounties | Negative | N/A | Never for internal community |
| Points for posting or commenting | Negative | Simple | Never |

---

## Key Principles for LunarPad Specifically

1. **Sats are the honest signal.** Everything else can be gamed. Sats received for real work is the one metric that is hard to fake and Bitcoin-native.

2. **Small community = high transparency.** Everyone knows everyone. Opaque rules, hidden criteria, and manipulative patterns will be spotted and damage trust permanently.

3. **Recognition over competition.** At this scale, builder spotlights, featured ideas, and named social proof work better than zero-sum rankings.

4. **Gates should unlock real capabilities.** Badges that unlock nothing are decoration. Tiers that unlock posting bounties or converting ideas are meaningful.

5. **Design for the ideal end state.** The engagement system should look right at 500 users, then scope the MVP. Do not build mechanics that only work at 10 users and will need to be ripped out at 100.

---

*Research compiled: 2026-04-05. Applies to Foyer engagement design (Phase 07) and broader LunarPad platform.*
