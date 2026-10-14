# Instructions for Claude (read first in every new session)

Read **PROGRESS.md** before doing anything. It says exactly where we stopped and what the next step is.
Also read PLAN.md for decisions and README.md for the code structure. AGENTS.md has Expo rules
(check the Expo SDK version's docs, use `npx expo install`, run `npx tsc --noEmit` and `npx expo-doctor`).

## How the user wants to work
- The user is **not a programmer** and works on **Windows**. Explain in plain language.
- Give **exact copy-paste PowerShell commands**, run **one at a time**.
- Do **one step at a time** and **wait for the user to confirm** before moving on.
- When something fails, say exactly what to copy back (text or screenshot).
- **Everything must be free.** No paid services, plans or fees.
- Keep code simple and well commented. Keep README.md up to date. Use Git for every change.

## Workflow between Claude and the user
- Claude writes the code in the cloud, commits and **pushes to GitHub**
  (repo `karolis-repliva/Sportsreminderapp`, working branch `claude/wizardly-pasteur-4fmeen`, which is also the default branch).
- The user's PC clone is at `C:\Users\karol\Projects\Sportsreminderapp`.
- The user double-clicks **`Start app.cmd`**, which runs: `git pull`, `npm install`, `npx expo start --tunnel`.
  Then they scan the QR code with **Expo Go** on the phone.
- Claude cannot run the app on the phone from the cloud (an ngrok tunnel from the cloud container fails).
- When this session ends, update PROGRESS.md (where we stopped and the next step) and push.
