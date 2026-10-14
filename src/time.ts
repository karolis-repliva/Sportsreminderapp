// time.ts: helpers for showing times in the user's time zone.

/** All times in the app are shown in this time zone. */
export const HOME_TIME_ZONE = 'Europe/Vilnius';

/** Formats a UTC ISO time as e.g. "Fri 16 Oct, 20:00" in Vilnius time. */
export function formatLocal(utcIso: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: HOME_TIME_ZONE,
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(utcIso));
}
