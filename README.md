# Watch Reminder

A personal, spoiler-free Android app that reminds you to **watch** games you care about and shows
where to watch them in Lithuania. It has no scores, no live alerts and no news.

See [PLAN.md](PLAN.md) for the phases and the decisions made so far.

## How to run it (Windows + Expo Go)

1. Install Node.js, Git and VS Code (see PLAN.md).
2. In PowerShell, inside this folder, run `npm install` (first time only).
3. Run `npx expo start --tunnel` and scan the QR code with the **Expo Go** app on the phone.

## Project structure

| Path | What it is |
|------|------------|
| `App.tsx` | The app's first screen (currently a "hello" screen). |
| `index.ts` | Starts the app. You won't need to touch it. |
| `app.json` | App settings: name, icon, Android options. |
| `assets/` | Icons and splash image. |
| `PLAN.md` | Plan, decisions and constraints. |

The structure will grow as phases are built. This table is kept up to date.

## Technology

- Expo (React Native) with TypeScript, running inside **Expo Go**. No custom native code, because
  the phone can't install APK files.
- Data is stored on the phone only. There's no backend in version 1.
