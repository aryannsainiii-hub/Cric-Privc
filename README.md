# Cric Privé — Phase 1 Frontend

**"The Private Intelligence of IPL"**

A premium, dark-luxury frontend for an IPL cricket intelligence platform. This is
**Phase 1: frontend only** — every prediction, stat, and insight is generated from
structured mock data via a service layer designed to be swapped for real APIs
without touching a single component.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (default `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## The full clickable flow

Home → Matches → Match Setup → Playing XI → AI Analysis (cinematic loader) →
Prediction Dashboard → Pitch Intelligence / Weather Intelligence / Player
Battles / Toss Impact / What-If Simulator / Live Match Prediction → Tournament
→ Winner Prediction → AI Analyst chatbot → Profile.

All 16 pages are reachable via the navbar, the Analytics hub, and in-page
"Analyze Match" / module buttons.

## Architecture

```
src/
├── components/    layout, common, match, analytics, prediction — all reusable
├── pages/         one file per route, composed from the components above
├── context/       MatchContext holds the selected teams/venue/XI across pages
├── data/          centralized structured mock data (teams, players, venues,
│                  weather, matches, predictions, tournament)
├── services/      the API abstraction layer — every function returns a
│                  Promise, so swapping mock data for real fetch() calls in
│                  Phase 2 requires no changes to any page or component
└── types/         shared TypeScript interfaces
```

### Why a service layer?

Every page reads data through `src/services/*`, never directly from
`src/data/*`. Each service function (e.g. `getPrediction`, `getWeatherData`,
`getPointsTable`) already returns a `Promise`, matching what a real
`fetch()`/axios call will return. In Phase 2 you replace the function body —
the page code doesn't change.

## What's next

- **Phase 2** — FastAPI backend + PostgreSQL, replacing `services/*` mock
  bodies with real HTTP calls.
- **Phase 3** — Historical IPL ball-by-ball data pipeline feeding
  `data/venues.ts`, `data/players.ts`, etc.
- **Phase 4** — Machine learning model replacing the deterministic scoring
  logic in `data/predictions.ts` (`computeWinProbability`,
  `buildMatchPrediction`).

## Notes

- All player names, match fixtures, and statistics are illustrative
  demonstration data for Phase 1 and are not live or verified statistics.
- No real backend, database, or ML model is connected in this phase.
