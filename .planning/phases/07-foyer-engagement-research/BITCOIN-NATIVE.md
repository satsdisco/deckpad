# Bitcoin-Native Community Engagement Research
# Phase 07: Foyer Engagement Research

**Purpose:** Research Bitcoin-native engagement patterns to inform Foyer feature design beyond v1.
**Use this file when:** Designing gamification, zap mechanics, reputation, or community features for The Foyer.
**Scope:** Focuses on mechanics that work at 10-50 active users. Distinguishes proven from experimental.

---

## 1. Sats as Social Signal

### The core shift from free engagement

Free upvotes are zero-cost signals. A vote costs nothing, so it signals nothing beyond momentary attention. Sats-based engagement changes the calculus: every zap is a revealed preference, not a stated one.

The psychology is often described as "putting money where your mouth is," but the mechanism is more specific: micropayments create a Schelling point around genuine conviction. When zapping costs 100 sats (~$0.05 at typical rates), users filter out noise automatically. They zap things they genuinely believe in, not things they passively like.

**Proven at scale:**
- Stacker News: sats-weighted ranking demonstrably surfaces different content than upvote-only systems. Low-effort posts get fewer sats even when they attract upvotes. The correlation between zap volume and content quality is observable across the community.
- Nostr zaps (via NIP-57): zaps function as both payment and social proof. A post with 10,000 sats in zaps from 20 people signals something different from 10,000 sats from 2 people. Both dimensions are visible.

**The value-for-value (V4V) model:**
V4V, popularised by Adam Curry and Dave Jones via Podcasting 2.0, is the principle that creators receive value proportional to the value they provide. No subscriptions, no ads, no gatekeepers. Key properties:
- Payment is voluntary, not paywalled. The content is free; payment is an expression of appreciation.
- Payment is direct. Creator receives sats without a platform taking a cut (beyond routing fees).
- Payment is immediate. Lightning settles in seconds, globally.
- Payment is granular. Users can stream sats per minute (Fountain) or send a single zap.

For a builder platform, V4V reframes sats pooling on ideas: contributors to an idea signal conviction by funding it before it ships. The pool is not a payment to the author; it's a collective bet that the idea is worth building.

### How Nostr zaps work

NIP-57 defines Lightning zaps on Nostr:
1. Sender requests a zap invoice from the recipient's Lightning address.
2. Sender pays the invoice via Lightning.
3. The recipient's Lightning wallet sends a "zap receipt" event (kind 9735) back to the Nostr network.
4. Clients display the zap receipt, showing the amount and the sender's public key.

What this reveals about engagement:
- Zaps are public by default. The social signal is intentional.
- Zap amounts vary widely (1 sat to tens of thousands) and the distribution matters. A few large zaps vs many small ones tells different stories.
- Zap notes (an optional message attached to the zap) are common. They combine micropayment with commentary, collapsing the gap between "liking" and "reacting."
- Sender identity is visible (pubkey). This creates accountability absent from anonymous upvotes.

**For LunarPad:** The existing zap implementation captures the payment side. The social signal side (who zapped, how much, with what note) is the layer that drives engagement. Displaying this prominently on idea cards is higher leverage than the payment mechanics themselves.

---

## 2. Lightning-Powered Gamification

### Stacker News: proven sats-based content ranking

Stacker News (stacker.news) is the most directly relevant proof of concept. Key mechanics:

**Cowboy credits (internal sats):** New users receive free credits to reduce onboarding friction. This is a proven pattern for bootstrapping activity at small scale without requiring everyone to have Lightning first.

**Tipping as ranking signal:** Post scores are weighted by sats received, not just upvote count. A post with 500 sats from 5 people ranks higher than one with 50 upvotes from 50 people. This creates a two-dimensional ranking: breadth (votes) vs depth (sats).

**Muted minimalism:** Stacker News does not gamify loudly. No badges, no streaks, no progress bars. The leaderboard is sats earned, full stop. This matches Bitcoin community values (substance over aesthetics) and works at small scale where over-gamification feels hollow.

**What works at 10-50 users:**
- Sats leaderboard (total earned, sorted weekly/monthly/all-time). Even at 20 active users, a leaderboard creates mild competition.
- Zap count visible on all content cards. Simple, high-signal.
- "Top zappers" recognition. Highlights generous community members, not just high earners.

### Fountain: sats for podcast engagement

Fountain (fountain.fm) demonstrates streaming sats via Podcasting 2.0:
- Listeners stream sats per minute while listening. The longer they listen, the more the creator earns.
- Boosts (one-time larger payments) with a message function as timestamped feedback.
- Community rankings show who boosts most. Top boosters get recognition.

**Relevant mechanics for LunarPad:**
- Time-weighted engagement: if ideas had a "reading time" or "exploration depth" metric, streaming sats while engaging (viewing a linked deck, reading comments) could signal depth of interest. Experimental, not proven at this scale.
- Boost-with-message: Fountain's boost UI (pay + attach text) is exactly what a "zap with comment" on an idea would look like. This collapses zapping and commenting into one action.

### Zap wars

Zap wars are informal competitions on Nostr where users compete to zap a post the most, often triggered by a challenge or bet. They are organic, not designed. Characteristics:
- Short duration (minutes to hours)
- High energy, low stakes
- Usually triggered by a provocation ("I bet this post gets 1M sats")
- Winner is whoever zaps most in the window

**For LunarPad at small scale:** Engineered zap wars are unlikely to emerge spontaneously with 10-50 users. However, a "most zapped this week" callout or a time-boxed "idea of the week" spotlight could channel similar energy. Proven: weekly or bi-weekly idea spotlights with a collective zap goal work in small communities. Experimental: fully gamified zap war mechanics.

---

## 3. Skin in the Game Mechanics

### Prediction markets for ideas

Prediction markets let users stake sats on outcomes (e.g., "will this idea get built within 3 months?"). The closest Bitcoin-native implementation is Nostr-based prediction markets (experimental, not widely adopted at small scale).

**Proven precedent:** Augur and Polymarket demonstrate that prediction markets create strong engagement signals. Users who stake on an outcome have ongoing interest in tracking it.

**For LunarPad:** A lightweight version is feasible without a full prediction market:
- When an idea is posted, users can "back it" with sats (the existing pool mechanic).
- If the idea converts to a project and ships, backers receive recognition (not financial return, since that creates securities issues).
- The pool balance on an unconverted idea is effectively a community bet that it's worth building.

This is closer to Kickstarter-style commitment than a prediction market, but the psychological mechanism is similar: sats staked means skin in the game.

**Status: Partially proven** (commitment pooling is proven; prediction market payouts are experimental and legally complex).

### Staking sats to show commitment

Separate from pooling sats toward a team, staking mechanics let individuals signal commitment to a specific idea or outcome:
- "I'll stake 5,000 sats that I'll submit a working prototype within 30 days." If they do, they get the stake back. If not, it goes to the pool.
- Used on Lightning-based platforms like Ligess and some Nostr bets.

**Status: Experimental** at the scale LunarPad operates. Requires trust in the arbitration mechanism and creates dropout risk (users who lose stakes may disengage). Not recommended for v1 or v2.

### Bounty pooling dynamics

LunarPad already has bounties. The Foyer extends this: idea sats pools function as pre-bounties. Key dynamics observed across bounty platforms:

**Matching incentives:** Pools grow faster when there is a lead contributor who sets the initial stake. On Nostr bounties and GitHub-based bounty platforms (Gitcoin, Bountysource), the presence of an anchor contribution (even small) significantly increases participation.

**Visibility of contributors:** Showing who contributed and how much drives more contributions. Anonymity reduces pooling behavior.

**Expiry risk:** Pools without a conversion path or deadline see contributions drop off. The Foyer's conversion mechanic (idea to project) is the correct answer to this. Users need to see a plausible path from "idea with sats" to "project with bounty."

**Status: Proven** that visible, anchor-seeded pools with a clear conversion path outperform hidden or deadline-less pools.

---

## 4. Bitcoin-Native Identity

### How Bitcoin communities differ

Bitcoin communities are not tech communities that happen to use Bitcoin. The cultural substrate is distinct:

**Core values:**
- **Sovereignty:** Self-custody, running your own node, not trusting third parties. This manifests as skepticism toward any platform that holds funds or gates access.
- **Proof of work:** Respect is earned through demonstrated output, not credentials or titles. Bitcoin culture specifically valorises shipping, running infrastructure, and contributing code.
- **Open source by default:** Closed-source projects in Bitcoin communities attract skepticism. Transparency is a baseline expectation.
- **Long time preference:** Bitcoin culture is explicitly oriented toward long-term thinking. Short-term speculative behavior is associated with altcoins, not Bitcoin. This makes multi-month project commitment feel natural.
- **Verification over trust:** "Don't trust, verify" is a Bitcoin protocol property that has leaked into culture. Claims without proof are treated with skepticism.

**Social dynamics at the builder layer (vs general Bitcoin community):**
- Builders are less price-focused than retail. They care more about protocol development, use cases, and tooling.
- Builder communities are smaller, more collegial, and more willing to share work-in-progress.
- There is strong norm around crediting contributions. Attribution matters.

### Design implications for LunarPad features

**What resonates:**
- Lightning addresses as identity. A Lightning address is proof of custody. Displaying it on profiles signals seriousness.
- Open-source links. Ideas and projects that link to public repos get more respect than those that don't.
- Contribution history as reputation. What you have shipped matters more than what you claim.
- Pseudonymous participation. Bitcoin culture is comfortable with pseudonyms (inherited from cypherpunk culture). Requiring real names reduces participation.

**What does not resonate:**
- Gamification for its own sake. Badges with no functional meaning, streaks, achievement unlocks. Bitcoin builders find this condescending.
- Platform-controlled reputation scores with opaque algorithms. The community wants to see the inputs, not just the output.
- Engagement metrics that reward noise (post count, comment count without quality signal).

---

## 5. Value-for-Value in Practice

### What V4V platforms have learned

**Stacker News (most relevant):**
- Content with sats earned is shown prominently. Pure upvotes are secondary.
- Creator earns sats from both direct tips and a percentage of tips on replies to their content. This incentivises quality discussion, not just quality posts.
- Platform takes a small percentage (routing fee equivalent) to fund operations. This is acceptable because it's transparent.
- Works at small scale: even 20 active users generating consistent zaps sustains engagement because the signal is real even at low absolute amounts.

**Nostr ecosystem:**
- Zaps happen asynchronously. No expectation of immediate response.
- Zap receipts are on-chain (Nostr events), so they are permanent and verifiable.
- Multiple Lightning wallets (Wallet of Satoshi, Alby, Phoenix) support NIP-57. Low friction for users already in the ecosystem.
- Content quality and zap amount correlate better than content quality and like count. This is the core V4V insight.

**Podcasting 2.0 / Fountain:**
- Streaming sats works for passive consumption (podcasts) but is harder for active participation (reading, coding).
- The boost-with-message mechanic is the most transferable. It works for any content type.
- Creators see boost messages in real time, which creates a feedback loop that free engagement cannot replicate.

### Community governance via sats

**Stacker News territory system:** Communities (territories) pay sats to create and maintain. Territory founders earn a share of tips within their territory. This is a governance-by-skin-in-the-game model. Experimental at the territory level but proven at the post level.

**What works at 10-50 users:**
- Sats-weighted content ranking (proven, simple to implement).
- Prominent display of top contributors and top recipients (proven, works even at 10 users).
- Weekly sats summary email or notification (proven in newsletter-style V4V communities).
- Zap notes displayed alongside amounts (proven, adds qualitative signal to quantitative).

**What does not work at 10-50 users:**
- Complex governance (voting on platform changes with sats). Too few users for meaningful outcomes.
- Prediction markets with settlement. Requires liquidity and trust infrastructure that small communities lack.
- Automated content curation based on sats signals alone. Works at scale (Stacker News), but at 20 users, manual curation is better.

---

## 6. Anti-Patterns in Bitcoin Communities

### Toxic maximalism

Bitcoin maximalism ("only Bitcoin matters, everything else is a scam") is a spectrum. At the healthy end, it means focusing on Bitcoin and not being distracted. At the toxic end, it means hostility toward anyone who has touched an altcoin or doesn't meet purity standards.

**How it manifests in builder communities:**
- Gatekeeping based on technical depth ("you don't know what multisig is, so your opinion doesn't count").
- Hostility toward newcomers who ask basic questions.
- Dismissal of non-Bitcoin technical contributions ("your Rails experience doesn't apply here").

**How to design against it:**
- Celebrate learning, not just shipping. Recognition for first post, first idea, first zap.
- Avoid language that implies a hierarchy of "real" Bitcoiners.
- Make the community rules explicit and enforce them. Even small communities need norms written down.
- Design features that welcome partial knowledge. Upvotes (no sats required) give newcomers a way to participate before they have Lightning set up.

### Overemphasis on price

Bitcoin price discussion dominates general Bitcoin social media. Builder communities tend to suppress this, but it leaks in:
- Price milestones ("at $100K, we should...") as decision triggers rather than product merit.
- Evaluating project ideas by speculative value rather than utility.
- Sats-denominated rewards feeling larger or smaller depending on current price, creating inconsistent incentive signals.

**Mitigation:**
- Frame all sats amounts in sats, not fiat equivalents, in all UI.
- Avoid referencing price in community norms or product copy.
- Judge ideas by problem/solution fit, not by potential token value.

### Excluding newcomers

The tension between maintaining culture and growing the community is real. Over-indexing on insider culture creates a community that shrinks over time.

**Proven patterns that help:**
- Explicit "how to contribute" onboarding. Even a one-page guide reduces friction.
- Low-barrier first actions. Post an idea (no sats required), comment, upvote. Reserve sats mechanics for deeper engagement.
- Visible newcomer recognition. "First idea" recognition signals that new participants are noticed.
- No minimum sats required for core participation. Zapping should amplify engagement, not gate it.

---

## 7. Unique Opportunities for a Bitcoin-Native Builder Platform

### What fiat platforms cannot do

**Instant global micropayments:**
- A $0.01 contribution is economically viable on Lightning. It is not viable via Stripe or PayPal (fees exceed the value).
- This enables genuine micro-signaling: 1 sat zaps, streaming sats, fractional bounty contributions.
- It enables global participation without currency conversion or banking friction. A builder in Lagos and one in London can contribute to the same idea pool with equal ease.

**Pseudonymous contributions:**
- Contributions can be attributed to a Lightning address or Nostr pubkey without requiring legal identity.
- This is meaningful for contributors in jurisdictions where Bitcoin activity attracts unwanted attention.
- Pseudonymous reputation (pubkey-based) is transferable across platforms that read the same Nostr identity.

**Proof-of-work credentials:**
- On-chain Bitcoin transaction history and Lightning payment history are verifiable without trusting the platform.
- A builder who has funded 10 ideas with sats has a verifiable track record. This is different from a platform-internal badge.
- In the future, this could connect to Nostr-based reputation systems where LunarPad contributions are visible across the ecosystem.

**Permissionless bounty creation:**
- Anyone can create a bounty and fund it without platform approval.
- No KYC required to receive a bounty payout.
- International payouts settle in seconds.

**Non-custodial option:**
- Platforms that hold user funds require trust. A platform that facilitates Lightning payments without holding funds (users pay directly to builder Lightning addresses) is architecturally more aligned with Bitcoin values.
- LunarPad already does this via LNURL forwarding. This is a genuine differentiator worth communicating.

### Lightning-powered reputation

A Lightning address on a user profile is currently display-only. Its potential is higher:
- **Payment history as reputation signal:** Total sats received (already tracked in `total_sats_received` on decks/projects) is a verifiable output metric.
- **Zapper reputation:** Users who consistently zap quality content are valuable community members. A "top zapper" recognition is about generosity and taste, not just output.
- **Cross-platform reputation:** If LunarPad publishes a Nostr event for each idea posted or zap received, the reputation is portable. Builder contributions become part of their Nostr identity, readable by any Nostr client.

### Concrete feature ideas combining Bitcoin mechanics with community engagement

These are ordered by implementation complexity and relevance to current roadmap.

**Tier 1: Low complexity, high fit (implementable in Foyer v1 or v2)**

| Feature | Mechanic | Precedent | Status |
|---------|----------|-----------|--------|
| Zap notes on idea zaps | Attach optional text to a sats contribution | Nostr NIP-57, Fountain boosts | Proven |
| Sats pool visibility | Show total pooled sats and contributor count on idea card | Stacker News, GitHub Sponsors | Proven |
| Top zappers this week | Sidebar or banner recognising top contributors by sats sent | Stacker News, Fountain | Proven |
| Sats-weighted idea ranking | Sort ideas by sats received (separate from upvote sort) | Stacker News | Proven |
| "First idea" recognition | Subtle badge or callout for a user's first Foyer post | Onboarding best practice | Proven |

**Tier 2: Medium complexity, experimental for this scale**

| Feature | Mechanic | Precedent | Status |
|---------|----------|-----------|--------|
| Weekly sats digest | Summary of top ideas by sats received, delivered as in-app notification | Stacker News weekly digest | Proven at scale, untested at 10-50 users |
| Idea spotlight with zap goal | "This week's featured idea, goal: 50,000 sats" with live progress | Kickstarter-style goal UI | Experimental at this scale |
| Boost-with-message (consolidate zap + comment) | Single action: pay sats and attach a comment | Fountain, Nostr zap notes | Experimental UX for this platform |
| Leaderboard: ideas by sats converted to projects | Track which community members' ideas have shipped | Custom to LunarPad | Novel |

**Tier 3: Future consideration, requires more infrastructure or scale**

| Feature | Mechanic | Precedent | Status |
|---------|----------|-----------|--------|
| Nostr event publishing for ideas/zaps | Publish idea posts and zap receipts as Nostr events, making contributions part of builder's Nostr identity | Nostr ecosystem | Experimental, high effort |
| Commitment staking | Builder stakes sats on shipping by a deadline, forfeits to pool if they miss | Lightning escrow services | Experimental, trust/arbitration complexity |
| Sats-funded governance | Voting on platform direction weighted by sats committed | Stacker News territories | Not recommended until 200+ active users |
| Streaming sats for reading | Sats streamed per minute while engaged with an idea/deck | Fountain, Podcasting 2.0 | Experimental, unclear UX for reading context |

---

## Summary: What to Prioritise for The Foyer

**Highest confidence, lowest risk:**
1. Display zap totals and contributor counts prominently on idea cards. This alone changes engagement behavior.
2. Sort by sats received as a first-class ranking option (alongside upvotes).
3. Recognise top zappers weekly. Creates a positive feedback loop without requiring complex infrastructure.
4. Allow optional zap notes. One field, high impact.

**Worth validating at launch:**
- Do users differentiate between "upvote" (free) and "zap" (sats) when evaluating ideas? If yes, keep both. If no, consider consolidating.
- Does sats-weighted ranking produce visibly different results from upvote ranking at 20-30 active users? If not, it adds complexity without signal.

**Avoid for now:**
- Staking mechanics with financial consequences.
- Prediction markets.
- Nostr identity integration (high effort, low urgency).
- Any mechanic that gates participation behind holding sats. Upvotes must remain free.

---

*Research basis: Stacker News, Fountain, Nostr NIP-57, Podcasting 2.0 value4value spec, Gitcoin bounty dynamics, Lightning community observation 2023-2025.*
*Confidence levels noted per section. Experimental = limited evidence at this scale. Proven = multiple platforms demonstrate the mechanic works.*
*Last updated: 2026-04-05*
