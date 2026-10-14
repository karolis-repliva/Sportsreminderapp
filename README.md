# Watch Reminder

A personal, spoiler-free Android app that reminds you to **watch** games you care about and shows
where to watch them in Lithuania. It has no scores, no live alerts and no news.

See [PLAN.md](PLAN.md) for the phases and the decisions made so far.

## How to run it (Windows + Expo Go)

1. Install Node.js, Git and VS Code (see PLAN.md).
2. Double-click **`Start app.cmd`** in this folder. It downloads the latest code, installs what's
   needed and starts the app. (By hand: `git pull`, `npm install`, `npx expo start --tunnel`.)
3. Scan the QR code with the **Expo Go** app on the phone. Keep the window open while using the app.

## Project structure

| Path | What it is |
|------|------------|
| `App.tsx` | The main screen: upcoming Žalgiris EuroLeague games with a "remind me" button. |
| `src/types.ts` | Shared data shapes, e.g. `Game`. Has no score fields on purpose. |
| `src/providers/` | One file per data source. Each converts its feed into `Game` objects. |
| `src/providers/euroleague.ts` | EuroLeague feed (no API key). |
| `src/notifications.ts` | Local reminders: permission, Android channel, scheduling. |
| `src/time.ts` | Shows times in Europe/Vilnius. |
| `Start app.cmd` | Windows double-click launcher. |
| `index.ts` | Starts the app. You won't need to touch it. |
| `app.json` | App settings: name, icon, Android options. |
| `assets/` | Icons and splash image. |
| `PLAN.md` | Plan, decisions and constraints. |

The structure will grow as phases are built. This table is kept up to date.

## Technology

- Expo (React Native) with TypeScript, running inside **Expo Go**. No custom native code, because
  the phone can't install APK files.
- Data is stored on the phone only. There's no backend in version 1.
