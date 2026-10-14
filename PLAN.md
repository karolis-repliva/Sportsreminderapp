# Watch, Don't Track: build plan

A spoiler-free Android app that reminds you to **watch** games and tells you where to watch them.
No scores, no goal alerts, no news.

## Ground rule: everything must be free

Every tool, service and account in this project must cost nothing. If a step would cost money,
stop and find a free alternative first.

| Item | Cost | Notes |
|------|------|-------|
| Node.js, Git, VS Code | Free | |
| Expo account and EAS cloud builds | Free plan | Limited builds per month, which is plenty for one person. Free builds can wait in a queue. |
| API-Sports | Free plan | 100 requests/day. **Must confirm** that the free plan covers the *current* season; it has limited seasons in the past. Free fallbacks: football-data.org for football, TheSportsDB for basketball. |
| Running on my phone | Free | Through **Expo Go** from the Play Store (see "Phone constraint" below). |
| Google Play publishing | **Not free** | One-time developer fee. Only needed for a later public release, and that would be a separate decision. |
| Backend (later) | Free tier | For example Cloudflare Workers' free tier, when that time comes. |

## Phone constraint (decided)

The phone is a **work-managed Samsung Galaxy S23**, and APK files cannot be installed on it.
Play Store apps can be, and **Expo Go installed fine**. So:

- The app runs **inside Expo Go**. There is no APK and no EAS cloud build for now.
- Reminders are **local notifications** scheduled through Expo Go. They are stored by Android, so they fire even when the app is closed.
- **No background refresh** (Expo Go doesn't support it reliably). Fixtures refresh and reminders are rescheduled **each time the app is opened**, plus a manual "refresh" button.
- Still to solve: Expo Go normally loads the app from the PC. We'll check whether EAS Update (free plan) lets the phone open it without the PC running.
- Fallback / backup: also write games to the phone calendar (expo-calendar) so its alarms remind me.
- Every feature must work in Expo Go. Avoid libraries that need a custom native build.

## Phases

| # | Phase | What you get at the end |
|---|-------|-------------------------|
| 0 | **Setup** | Tools installed on Windows, accounts created, this project on your PC. |
| 1 | **Hello phone** | An empty Expo app running on your phone. |
| 2 | **Tiny real version** | A list of upcoming Žalgiris games from API-Sports, plus one reminder that fires on your phone (in Expo Go). |
| 3 | **Following** | Follow competitions, teams and single games. Everything is stored on the phone. |
| 4 | **Custom reminders** | Several reminder times per followed item. Single games can override them. |
| 5 | **Where to watch** | Add or edit the TV channel or stream for a game, and see it in the notification. |
| 6 | **Time rules** | Times shown in Europe/Vilnius, an "only if it starts before HH:MM" rule, and a "replay next morning" option. |
| 7 | **Refresh on open** | Opening the app (if the last refresh was over a few hours ago) re-fetches fixtures, reschedules moved games and keeps reminders topped up about 14 days ahead, within the 100 requests/day limit. |
| 8 | **Android polish** | Help with permissions (notifications, exact alarms, battery) and an in-app check screen. |
| later | Smart triggers, sharing, backend | The design leaves room for these, but they aren't built in version 1. |

## Tools to install (Windows)

1. Node.js (LTS version)
2. Git for Windows
3. VS Code
4. An Expo account (expo.dev), which also covers EAS cloud builds
5. An API-Sports account (dashboard.api-football.com)
6. On the phone: the Expo Go app from the Play Store (installed ✅)

## Before going public (Play Store)

- Move the API-Sports key off the phone and into a small backend or proxy. A key inside an app can be extracted.
- Check that the API-Sports plan or license allows a public app.
- Write a privacy policy and complete the Play Store data-safety form.
