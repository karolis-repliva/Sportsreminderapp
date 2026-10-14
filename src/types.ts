// types.ts: the shapes of data shared across the app.
//
// Every data source ("provider") converts its own format into a `Game`, so the
// rest of the app never needs to know where a game came from.

/** One upcoming game. Deliberately has NO score fields (spoiler-free app). */
export interface Game {
  /** Unique across all providers, e.g. "euroleague:E2026_12". */
  id: string;
  sport: 'basketball' | 'football';
  /** Human-readable competition name, e.g. "EuroLeague". */
  competition: string;
  homeTeam: string;
  awayTeam: string;
  /** Start time as an ISO string in UTC, e.g. "2026-10-16T17:00:00Z". */
  startUtc: string;
  /** False if the organiser hasn't fixed the exact start time yet. */
  timeConfirmed: boolean;
}
