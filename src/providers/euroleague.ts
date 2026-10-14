// euroleague.ts: fetches games from the official EuroLeague data feed.
//
// The feed is public (no API key) but undocumented, so it may change without
// notice. If it breaks, this is the only file that needs fixing.
// We only read schedule fields here and never scores.

import { Game } from '../types';

const BASE_URL = 'https://api-live.euroleague.net/v2/competitions/E/seasons';

/**
 * EuroLeague seasons are named after the year they start in, e.g. "E2026"
 * for 2026-27. A new season starts in late summer, so from August onwards we
 * use the current year, and before that the previous year.
 */
export function currentSeasonCode(now: Date = new Date()): string {
  const year = now.getMonth() >= 7 ? now.getFullYear() : now.getFullYear() - 1;
  return `E${year}`;
}

/** The parts of the feed's game record that we use. */
interface FeedGame {
  identifier: string;
  utcDate: string;
  confirmedHour: boolean;
  played: boolean;
  local: { club: { code: string; name: string } };
  road: { club: { code: string; name: string } };
}

/**
 * Returns the upcoming games of one team, sorted by start time.
 * @param teamCode EuroLeague's 3-letter club code, e.g. "ZAL" for Žalgiris Kaunas.
 */
export async function fetchUpcomingTeamGames(teamCode: string): Promise<Game[]> {
  const response = await fetch(`${BASE_URL}/${currentSeasonCode()}/games`);
  if (!response.ok) {
    throw new Error(`EuroLeague feed returned HTTP ${response.status}`);
  }
  const body: { data: FeedGame[] } = await response.json();
  const now = Date.now();

  return body.data
    .filter((g) => g.local.club.code === teamCode || g.road.club.code === teamCode)
    .filter((g) => !g.played && new Date(g.utcDate).getTime() > now)
    .map(
      (g): Game => ({
        id: `euroleague:${g.identifier}`,
        sport: 'basketball',
        competition: 'EuroLeague',
        homeTeam: g.local.club.name,
        awayTeam: g.road.club.name,
        startUtc: g.utcDate,
        timeConfirmed: g.confirmedHour,
      }),
    )
    .sort((a, b) => a.startUtc.localeCompare(b.startUtc));
}
