# Watch, Don't Track: build plan

A spoiler-free Android app that reminds you to **watch** games and tells you where to watch them.
No scores, no goal alerts, no news.

## Phases

| # | Phase | What you get at the end |
|---|-------|-------------------------|
| 0 | **Setup** | Tools installed on Windows, accounts created, this project on your PC. |
| 1 | **Hello phone** | An empty Expo app running on your phone. |
| 2 | **Tiny real version** | A list of upcoming Žalgiris games from API-Sports, plus one reminder that fires on your phone. Built as a development build (EAS), because reliable notifications need it. |
| 3 | **Following** | Follow competitions, teams and single games. Everything is stored on the phone. |
| 4 | **Custom reminders** | Several reminder times per followed item. Single games can override them. |
| 5 | **Where to watch** | Add or edit the TV channel or stream for a game, and see it in the notification. |
| 6 | **Time rules** | Times shown in Europe/Vilnius, an "only if it starts before HH:MM" rule, and a "replay next morning" option. |
| 7 | **Background refresh** | A daily fixture refresh that reschedules moved games and keeps reminders topped up about 14 days ahead, within the 100 requests/day limit. |
| 8 | **Android polish** | Help with permissions (notifications, exact alarms, battery) and an in-app check screen. |
| later | Smart triggers, sharing, backend | The design leaves room for these, but they aren't built in version 1. |

## Tools to install (Windows)

1. Node.js (LTS version)
2. Git for Windows
3. VS Code
4. An Expo account (expo.dev), which also covers EAS cloud builds
5. An API-Sports account (dashboard.api-football.com)
6. On the phone: the Expo Go app (only for phase 1)

## Before going public (Play Store)

- Move the API-Sports key off the phone and into a small backend or proxy. A key inside an app can be extracted.
- Check that the API-Sports plan or license allows a public app.
- Write a privacy policy and complete the Play Store data-safety form.
