# Builder Community Platforms: Engagement Research

Purpose: Inform The Foyer feature design by extracting what works across six builder platforms.
Use this file when: Designing the idea marketplace, contribution mechanics, habit loops, and community structure for The Foyer.

---

## 1. Product Hunt

### What it is
A daily-ranked directory of new products. Makers submit launches, hunters and the community upvote them. Top products gain significant distribution.

### Hook (why someone visits the first time)
Someone sees "check out my Product Hunt launch" in a tweet or Slack. They click, see a clean page with one product front and center, and understand the mechanic in seconds. The zero-friction read experience (no account required to browse) removes any barrier to that first visit.

### Habit loop (why they come back)
The daily reset is the core engine. Products compete for a 24-hour window. This creates a recurring news event: "what shipped today?" Subscribers get a morning digest. Makers return to watch their ranking change in real time. The leaderboard resets midnight PT, giving every day a fresh cast of winners and losers.

### Contribution (why they post, not lurk)
Three distinct motivations:
- **Makers**: distribution. A strong launch day can drive thousands of signups. The ROI on contribution is concrete and fast.
- **Hunters**: reputation. A hunter who discovers a product before it blows up gets credited. Early hunters on successful products build a visible track record.
- **Commenters**: access. Founders answer questions on launch day. Commenting creates a rare direct line to the maker. The asymmetry (founder attentive for exactly one day) creates urgency.

The "first comment" mechanic is notable. Founders often post a "Maker here!" top comment early. This signals the thread is live and sets a responsive tone that invites engagement.

### What drives launch day energy
- Real-time vote counter creates horse-race tension
- Community posts "congrats on your launch" style comments, social proof accumulates publicly
- Time pressure: 24-hour window means every vote in the first 4 hours matters disproportionately
- Notifications to followers create a coordinated moment
- Getting to #1 Product of the Day is a credible signal makers paste on their homepage

### Foyer adaptations
- **Demo Day as launch moment**: Give projects a fixed-window "live" period during demo events where votes count toward a visible leaderboard. Time pressure drives participation.
- **Maker presence signal**: Show when a builder is actively in the thread. "Builder online" indicator invites questions.
- **First-mover reward**: Small sat reward for the first substantive comment on a new project. Creates incentive to engage early.
- **Daily digest**: Surface "what shipped this week" for The Foyer. Bitcoin-native twist: show total sats earned by projects in the period.

---

## 2. Hacker News

### What it is
Y Combinator's link aggregator and comment forum. A single upvote, a chronological new page, and a "front page" ranked by a decay algorithm. Show HN is the subfeed for builders showing their work.

### Hook (why someone visits the first time)
Usually a direct link to a specific thread. The page is so minimal there is no cognitive load. The content density per scroll is extremely high. You read something interesting, check the domain, decide to explore more.

### Habit loop (why they come back)
The front page is genuinely unpredictable in a good way. You cannot predict what will be on it. The decay algorithm means yesterday's big story is gone. Unlike social feeds with algorithmic personalization, HN's surface area is the same for everyone, so "what is the community talking about today" is a shared experience. The points and comment counts give a fast signal of which threads are worth entering.

For builders specifically: checking if your Show HN made the front page is a compulsion. The first few hours after posting are high-anxiety and high-refresh.

### Why the simple upvote model works
- One action. No friction. No categories, no emoji reactions, no multi-axis ratings.
- Upvote means "I found this worth reading" not "I agree" or "this is technically correct." The ambiguity is a feature.
- No downvote on comments for non-power users reduces pile-on mechanics.
- The algorithm combines recency and score with a penalty for controversy. This means fresh good content can beat stale popular content, keeping the feed fluid.

### Show HN and builder identity
"Show HN: I built X" is a ritualized format. The community knows the pattern: builder posts, thanks HN, briefly explains what they built and why. The humility norm is enforced culturally. Showing off is acceptable; boasting is not.

Successful Show HNs get pointed technical questions, not marketing feedback. This filters for an audience that wants to go deep. A "Ask HN" or "Tell HN" that gets discussion is more valuable than views because the responders are high-signal.

### Comment culture
- Threads are long, nesting is deep, the best comments are often buried.
- Voting on comments surfaces quality but slowly. Newcomers often feel the system is opaque.
- There is no user follow mechanism. You cannot build a following. This keeps status-seeking low and content focus high.
- The "dead" comment system (shadowban for low-karma users) creates quality enforcement without visible moderation.

### Foyer adaptations
- **No-follow builder profiles**: The Foyer should resist Twitter-style follower counts on the idea feed. Let ideas surface on merit, not author audience size.
- **Show Foyer format**: Standardized "I'm building X because Y" submission template reduces noise and creates a recognizable artifact. Builders know what to write.
- **Technical depth as signal**: Surface number of comments, not just votes, as a quality indicator. A 40-comment thread with no zaps may be more interesting than a 10-zap idea with 2 comments.
- **Decay algorithm for freshness**: Ideas should not permanently dominate the feed. Introduce a freshness decay so new ideas have a genuine shot at visibility.

---

## 3. Devpost / Hackathon Platforms

### What it is
Submission and judging infrastructure for hackathons. Builders create team pages, submit projects, attach demos and repos, and judges score them. Prize distribution is handled on-platform.

### Hook (why someone visits the first time)
The bounty. Prize money, prestige, or access to sponsors. The hook is entirely extrinsic on first contact. Builders evaluate: is the prize worth my weekend?

### Habit loop (why they come back)
Weaker than other platforms. Most participants are episodic. They come for a specific event, compete, and leave. The habit that does form is around "hackathon season" (recurring events, annual competitions). Builders who win once return to defend or improve their record.

The exception is builders who become embedded in a sponsor's ecosystem. Winning a Chainlink or Solana hackathon often becomes a pipeline to grants, jobs, and accelerator programs. The platform becomes an employment board in disguise.

### What drives hackathon engagement
- Team formation mechanics: browsing profiles looking for co-builders creates early social activation
- Submission countdown: deadline pressure is the most powerful motivator in hackathons
- Judging transparency: public scoring rubrics reduce anxiety and focus effort
- Social proof of prizes: visible past winners with dollar amounts and project descriptions give newcomers calibration
- Sponsor challenges: sub-prizes for using specific APIs/tools create focused mini-competitions within the larger event

### What breaks hackathon engagement
- Anonymous judging with no feedback. Builders put in significant effort; a "you didn't make the cut" with no explanation is demotivating.
- Team formation that happens too late in the event window. If teaming happens in hour 1 of a 48-hour event, the project suffers.
- Submission forms that are too long. Friction at the submission step causes drop-off.

### Foyer adaptations
- **Bounty as structured challenge**: The Foyer's bounty system maps directly to hackathon mechanics. Add a sub-bounty system: one main prize with sponsor-specific prizes for projects that integrate Lunar Rails infrastructure (payments API, Lightning, etc.).
- **Team formation as a feature**: Allow "looking for co-builder" status on Foyer profiles. This activates the social graph early.
- **Judge commentary required**: When a bounty winner is selected, require the selecting party to post a brief rationale. Losing participants see why they lost. This creates a learning loop that increases re-submission rates.
- **Submission as milestone, not gate**: Allow partial submissions that builders can update until deadline. Reduces the "I didn't finish so I won't submit" failure mode.

---

## 4. Indie Hackers

### What it is
A community for founders building internet businesses, typically bootstrapped. Core content: milestone posts ("$1k MRR"), revenue transparency ("showing my numbers"), and ask threads. Interview series with real revenue figures.

### Hook (why someone visits the first time)
The revenue numbers. "How I built a $20k/month business" titles are magnetic. The transparency norm means numbers are real, not hype. For aspiring builders, this is evidence that solo or small-team businesses can work.

### Habit loop (why they come back)
Progress posts. Builders post monthly or weekly updates. Regular readers follow specific builders and treat the feed as a serial. Knowing that @buildername posts every Sunday creates a recurring reason to check in.

The "products" directory (listing all IHers' products with revenue) is a reference artifact that gets rechecked as products grow or stall.

### Build in public culture
The norm is radical transparency: share your revenue, share your failures, share what you tried that didn't work. This norm emerged from Pieter Levels' early influence and became the platform's identity.

What makes it work:
- **Status from honesty, not success**: You get points for sharing struggles, not just wins. This lowers the bar to post.
- **Community investment in your success**: Regular updaters build an audience that roots for them. Emotional investment creates accountability.
- **Asymmetric information**: Sharing numbers that most founders never reveal is a genuine status signal. You are doing something most people won't.

### What drives long-term engagement vs one-time posts
Long-term engagement almost always traces to a regular update cadence. One-time posters get a spike of attention and leave. Builders who commit to a weekly or monthly format accumulate followers who check back specifically for their updates.

The discussion quality degrades when builders use IH primarily for distribution (posting product links) rather than genuine process sharing. The community tends to downvote promotional posts and upvote vulnerable or technically detailed posts.

### Foyer adaptations
- **Progress log as first-class feature**: Give every project a visible log. Updates are timestamped and ordered. Followers get notified on new log entries. This creates the serial-following behavior.
- **Revenue/traction transparency norm**: Normalize showing metrics in project cards. Total sats earned from bounties, number of demo day appearances, community zap total. Not vanity, but signal.
- **Milestone celebrations**: Auto-detect milestones (first bounty win, first zap over 10k sats, first 100 project votes) and surface them in a community feed. Creates shared celebration moments without requiring the builder to post.
- **Failure posts valued**: Explicitly reward posts about what didn't work. A "lessons learned" tag in The Foyer that gets extra visibility. Signals that the community is a safe place to share the full picture.

---

## 5. Discord Communities (Buildspace, etc.)

### What it is
Buildspace was a cohort-based program where builders shipped projects over 4-6 weeks with structured Discord channels, bot automation, and peer accountability. Now pivoted but the model influenced dozens of communities. Other examples: Replit, Solana Hacker House communities, On Deck.

### Hook (why someone visits the first time)
Invitation or cohort acceptance. These communities are typically gated. The hook is belonging to something curated, not open browsing. The Discord invite is a credential.

### Habit loop (why they come back)
Daily structures enforce return:
- Daily standups in a designated channel
- Ship-it channels where builders post completed work for reactions
- Weekly demo calls where builders present live
- Bot-enforced check-ins ("you haven't posted in 3 days, are you still building?")

The social layer is the key differentiator from async platforms. Seeing someone else's ship-it post at 11pm creates accountability pressure. The group is present in real time.

### How channels create structure
Channels force topic separation which forces intentional participation. You go to #ship-it to share work. You go to #ask-for-help to get unstuck. You go to #resources to find tools. This decomposition prevents the "everything and nothing" problem of undifferentiated feeds.

Role systems compound this. Earning a "shipped" role by completing a demo changes your visible identity in the community. Others with that role recognize you. Roles create micro-status ladders that are more achievable than macro-status (becoming famous).

### How bots and automation drive engagement
- Welcome bots that walk new members through channel structure
- Daily prompt bots: "What are you building today? Reply to check in"
- Milestone bots that announce when someone earns a role or completes a challenge
- Zap/tip bots that let members reward each other with small amounts in-chat

Automation reduces the need for active moderation and creates reliable recurring touchpoints without staff overhead.

### Ship-it challenges
Time-boxed challenges (build something in 7 days, ship a landing page in 48 hours) create a shared urgency that draws in passive members. Challenges give lurkers a reason to post for the first time. The low stakes (no prize required, just community recognition) make them accessible.

### Foyer adaptations
- **Weekly ship thread**: A structured feed section where builders post "shipped this week" updates. Simple format, community zaps as appreciation mechanism. Creates the ship-it channel dynamic in a web interface.
- **Bot-style nudges**: If a builder posted a project but hasn't updated in 30 days, surface a gentle prompt. Not spam, but a visible indicator on their project: "Last update: 34 days ago." Creates social pressure without a bot.
- **Micro-challenges with sats**: Run recurring small challenges (5-day challenges, weekend sprints) with small sat prizes. Entry barrier is intentionally low. These activate the long tail of builders who are watching but not yet contributing.
- **Role-equivalent badges**: LunarPad already has a badge system. Map badges to visible identity in The Foyer: builder who has won a bounty gets a visual marker on their bubble or profile. Creates the role-ladder mechanic.

---

## 6. GitHub Discussions / Sponsors

### What it is
GitHub Discussions is a structured forum attached to open source repos. GitHub Sponsors allows users to financially back maintainers and contributors directly through GitHub.

### Hook (why someone visits the first time)
Usually a search result or README link. You are trying to solve a problem, find a GitHub issue or Discussion that seems relevant, and land in the thread. The hook is utility, not community.

### Habit loop (why they come back)
For maintainers: issue triage and PR review. The responsibility of maintaining a project creates an involuntary habit loop. Notifications pull you back.

For contributors: watching repos and following releases. The activity feed shows "your dependency just released v2.0" and pulls you in.

For Sponsors: the relationship is the habit loop. Sponsors often receive private updates, early access, or a sponsor-only Discord channel. The financial relationship creates a commitment device.

### How open source communities coordinate
- **Issues for discrete problems, Discussions for open-ended questions**: The split in intent reduces noise. Feature requests in Discussions stay separate from bug reports in Issues.
- **Labels as navigation**: Well-labeled repos let newcomers find "good first issue" or "help wanted" without reading everything.
- **RFC process**: Major changes go through a public discussion period before implementation. This creates visible decision-making that builds community trust.
- **CODEOWNERS and maintainer signals**: Knowing who owns what lets contributors direct their effort efficiently.

### How sponsorship interacts with community contribution
The relationship is counterintuitive. Money does not straightforwardly increase contribution volume. Research on open source motivation consistently shows that intrinsic motivation (learning, building reputation, solving problems you care about) drives most contribution, and financial incentives can crowd out intrinsic motivation when poorly designed.

What works:
- Sponsors as patrons, not employers. The framing matters. "Thank you for making this possible" vs "you are paying for this feature." The former preserves intrinsic motivation.
- Small amounts from many sponsors signal broad community support better than large amounts from few sponsors. The number is the signal, not the total.
- Transparency about how funds are used. Open collectives that publish expense reports retain sponsor trust.

What breaks:
- "Pay for priority": Creating a queue where sponsors get issues addressed first breeds resentment in non-paying contributors and creates transactional dynamics that undermine community norms.
- Expecting financial contribution to substitute for code contribution. Sponsors who feel they are paying for something that is not delivered stop sponsoring.

### Foyer adaptations
- **Patron model for projects**: Allow community members to sponsor ongoing projects with recurring Lightning payments, framed as patronage, not payment for deliverables. Builder receives sats; sponsor gets visible credit and progress updates.
- **Open traction**: Surface total sats earned by a project transparently. This functions like GitHub Stars with monetary weight. It signals "the community backs this."
- **Bounty as RFC analog**: Before funding a bounty, run a discussion period where the community can propose approaches and vote on scope. This builds investment in the outcome before any sats change hands.
- **Contribution tracking on profiles**: Show a builder's history of comments, votes, and zaps given (not just received). Activity as a contribution signal, analogous to GitHub contribution graphs. Creates visible proof of community investment beyond just building.

---

## Comparison Table

| Dimension | Product Hunt | Hacker News | Devpost | Indie Hackers | Discord (Buildspace) | GitHub Sponsors |
|---|---|---|---|---|---|---|
| **Primary hook** | Launch distribution | Specific content link | Prize/bounty | Revenue transparency | Cohort invitation | Problem-solving search |
| **Habit frequency** | Daily (reset) | Multiple times daily | Episodic (events) | Weekly (updates) | Daily (standups/check-ins) | Notification-driven |
| **Contribution driver** | Distribution ROI | Technical reputation | Extrinsic prize | Status from honesty | Social accountability | Reputation + ownership |
| **Core mechanic** | Time-boxed vote window | Simple upvote + decay | Deadline + judging | Progress logs | Structured channels + bots | Issues + Discussions |
| **Community size dynamic** | Large, anonymous | Large, pseudonymous | Medium, episodic | Medium, identity-based | Small, cohort-gated | Variable, repo-scoped |
| **Money/reward role** | None direct | None | Central (prizes) | Indirect (revenue sharing) | Small (tips, challenges) | Central (sponsorship) |
| **Builder identity signal** | Launch history, hunter rank | Comment karma, karma gate | Project portfolio, wins | Revenue disclosed, update cadence | Roles, ship count | Stars, sponsors, contribution graph |
| **Key failure mode** | Gaming by coordinated voting | Newcomer opacity | No-feedback judging | Promotional posting | Channel sprawl | Transactional framing |
| **Best Foyer import** | Demo day as launch window | No-follow merit feed | Sub-bounties with sponsor prizes | Progress log + milestone feed | Weekly ship thread + nudges | Patron model for projects |

---

## Synthesis: Design Principles for The Foyer

These six platforms surface five durable principles worth encoding in The Foyer's design.

**1. Time pressure creates energy.** Product Hunt's launch window, hackathon deadlines, and Buildspace's ship-it challenges all use time constraints to convert passive interest into active participation. The Foyer's demo days and bounty deadlines are already this mechanic. Extend it to the idea feed: new ideas have a visibility boost in their first 72 hours, then decay to steady-state ranking.

**2. Builder presence is a signal.** The Product Hunt "maker here" comment and HN's Show HN thread both work because the builder is demonstrably present. The Foyer should surface when a builder is actively engaging with their bubble, show recent activity, and reward builders who respond to comments quickly.

**3. Transparency creates trust and contribution.** Indie Hackers' revenue sharing and GitHub Sponsors' expense transparency both demonstrate that showing real numbers invites community investment. The Foyer should default to visible: total sats earned, number of bounty wins, comment history. Builders who share more get more back.

**4. Small stakes activate the long tail.** Buildspace's low-bar challenges and HN's one-click upvote both serve the same function: giving lurkers a way to participate without full commitment. The Foyer needs equivalent low-friction entry points. A zap is one, a vote is one. A weekly micro-challenge with a 1,000-sat prize is another.

**5. Status ladders need multiple rungs.** GitHub's "good first issue" label, Discord's role system, and Product Hunt's hunter ranking all provide intermediate status that is achievable before becoming a top contributor. The Foyer's badge system should map visibly into The Foyer's bubble visualization, making status legible at a glance without requiring follower counts.
