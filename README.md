# 🎭 DeckPad

**Your stage for HTML presentations.**

DeckPad is an open platform for uploading, browsing, and presenting HTML presentations. Think SlideShare, but for the modern web — reveal.js, Slidev, Marp, Impress.js, or any custom HTML deck.

## Features

- **Upload** — Drag & drop `.html` or `.zip` files (up to 50MB)
- **Gallery** — Beautiful dark-themed grid with search, tag filters, and sorting
- **Viewer** — Sandboxed iframe with fullscreen mode, embed codes, and direct links
- **Thumbnails** — Auto-generated screenshots of the first slide via Puppeteer
- **Voting** — Upvote presentations you like
- **Any framework** — Works with reveal.js, Slidev, Marp, Impress.js, Shower, DZSlides, Bespoke.js, or plain HTML

## Quick Start

```bash
git clone https://github.com/satsdisco/deckpad.git
cd deckpad
npm install
npm start
```

Open `http://localhost:3100` — three demo presentations are seeded on first run.

## Tech Stack

- **Node.js** + Express
- **SQLite** (via Node.js built-in `node:sqlite`)
- **Puppeteer** for thumbnail generation
- **Vanilla HTML/CSS/JS** frontend — no framework, no build step

## Requirements

- Node.js 22+ (uses built-in SQLite)
- Google Chrome or Chromium (for thumbnail generation)

## API

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Gallery page |
| GET | `/upload` | Upload page |
| GET | `/deck/:id` | Deck viewer |
| POST | `/api/upload` | Upload a presentation |
| GET | `/api/decks` | List decks (search, filter, sort, paginate) |
| GET | `/api/decks/:id` | Get deck metadata |
| DELETE | `/api/decks/:id` | Delete a deck |
| POST | `/api/decks/:id/vote` | Toggle upvote |
| GET | `/api/decks/:id/votes` | Get vote count |
| GET | `/api/decks/:id/download` | Download original file |
| GET | `/api/tags` | List all tags |
| GET | `/presentations/:id/*` | Serve presentation files (sandboxed) |

## Roadmap

- [ ] User accounts (email/username login)
- [ ] Comments on presentations
- [ ] Featured/trending section
- [ ] Zaps (V4V — value for value tipping)
- [ ] Custom domains
- [ ] Presentation analytics

## License

MIT
