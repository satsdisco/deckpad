# Foyer Engagement Research: Synthesis

**Date:** 2026-04-05
**Sources:** GAMIFICATION.md, TOWN-HALL.md, BUILDER-PLATFORMS.md, BITCOIN-NATIVE.md

## The Big Picture

The Foyer should feel like walking into a buzzing hackathon lobby. Not a static board of ideas, but a living space where you can see who's here, what's hot, and where to jump in. The research converges on five themes that matter at our scale (10-50 users).

## Five Themes That Matter

### 1. Sats as the Primary Signal (not votes)

Every research strand agrees: sats-weighted ranking surfaces different, better content than free upvotes alone. Stacker News proves this works at small scale. The existing sats pool on ideas is well-designed (sats attach to the problem, not the poster). What's missing:

**Build next:**
- Sats-weighted sort option ("Most Backed" showing total sats, not just votes)
- Zap notes: optional message attached to a zap ("I'd use this for cross-border payments")
- Contributor visibility on idea cards: show who zapped and count of contributors, not just total amount
- Weekly "top zappers" callout to reward generosity

### 2. Ambient Activity (the empty room problem)

The biggest risk for a small community: The Foyer feels empty. Research shows that honest activity signals solve this without faking it.

**Build next:**
- Activity ticker at the top: "Alice joined the Lightning Wallet team 2h ago", "Bob zapped Idea X 100 sats"
- "Viewed by X people today" on idea bubbles (only show when > 0)
- Recent activity section: last 10 actions across The Foyer
- "Builder online" indicator when an idea's author is currently on the platform

### 3. Event-Driven Energy (tie to demo days)

Product Hunt's 24-hour window is the mechanic that creates event energy. LunarPad already has demo days. The Foyer should amplify pre-event and post-event engagement.

**Build next:**
- Demo day countdown on The Foyer (next event banner)
- "Pitch your idea at Demo Day" CTA on idea cards
- Post-event recap: "These ideas were discussed at Demo Day #5" with linked recordings
- Time-boxed voting windows during events (vote surge period)

### 4. Team Formation as Marketplace ("looking for" signals)

At 10-50 people, algorithmic matching is wrong. What works: visible signals.

**Build next:**
- "Looking for" tags on idea cards: "Need: designer", "Need: Lightning dev"
- Builder availability cards: "I have 5 hours/week, skills: React, Node"
- Named team members on bubbles (not just count): "Alice, Bob +2"
- Notification when someone joins your idea's team

### 5. Weekly Rhythm (not daily streaks)

Streaks don't work at this scale (not enough daily content). Weekly themes do.

**Build next:**
- Weekly spotlight: auto-selected "Idea of the Week" based on engagement
- Weekly themes tied to Lunar Rails product areas (Payments Week, Treasury Week)
- Weekly digest email/notification: "This week in The Foyer: 3 new ideas, 500 sats pooled"

## What NOT to Build

| Skip | Why |
|------|-----|
| Streak mechanics | Not enough daily content; breaks cause churn |
| Real-time viewer counts | Shows 0 too often at small scale |
| Points for posting/commenting | Kills signal-to-noise immediately |
| Follower counts on profiles | Resist status-signaling (HN principle) |
| Algorithmic matching | Too few people; visible signals work better |
| Complex role-based teams | Overhead without value at this scale |
| Nostr identity integration | Experimental, high effort, defer until more users |

## Priority Stack (what to build first)

| Priority | Feature | Source | Effort |
|----------|---------|--------|--------|
| 1 | Activity ticker / recent activity feed | Town Hall | Medium |
| 2 | Zap notes (message with zap) | Bitcoin-Native | Simple |
| 3 | Sats-weighted sort ("Most Backed") | Bitcoin-Native, Gamification | Simple |
| 4 | "Looking for" tags on ideas | Town Hall, Builder Platforms | Medium |
| 5 | Weekly spotlight / Idea of the Week | Gamification, Town Hall | Simple |
| 6 | Contributor visibility (who zapped) | Bitcoin-Native | Simple |
| 7 | Demo day integration (countdown, CTA) | Builder Platforms | Medium |
| 8 | Named team on bubbles | Town Hall | Simple |
| 9 | Builder availability profiles | Town Hall | Medium |
| 10 | Weekly digest notification | Gamification | Medium |

## Recommended Next Phases

Phase 5 and 6 (comments and conversion) should still be built. After that:

- **Phase 7:** Activity feed + ambient signals (ticker, view counts, builder online)
- **Phase 8:** Zap enhancements (zap notes, contributor display, sats-weighted sort)
- **Phase 9:** Marketplace signals (looking-for tags, builder availability)
- **Phase 10:** Event integration (demo day countdown, weekly spotlight)

---
*Synthesized: 2026-04-05 from 4 research documents (1,111 lines total)*
