# Progress log: where we stopped

_Last updated: 2026-10-14_

## ⏸️ Current step (NOT finished): Step 10, "See phase 2 on the phone"

**Situation:** the phase 2 code is pushed (commit `130ea50`, "Phase 2: upcoming Žalgiris EuroLeague
games with 2 h reminders"). The user's PC **has it** (`git log` confirmed `130ea50` at the top).
But the phone **still showed the old "hello" screen**. Most likely Expo Go connected to an old dev
server session, or Metro served a cached bundle.

**What we asked the user to do (not yet confirmed):**
1. Fully close Expo Go on the phone (swipe it away in recent apps).
2. Double-click `Start app.cmd` in `C:\Users\karol\Projects\Sportsreminderapp` (this has **not been tested yet**).
3. Scan the **new** QR code (not "Recently opened").
4. If it's still "hello": in PowerShell run `cd $HOME\Projects\Sportsreminderapp`, then
   `npx expo start --tunnel --clear`, and scan again.

**Then confirm that:**
- [ ] `Start app.cmd` works (download → install → QR code)
- [ ] The phone shows "Žalgiris: upcoming games" (next 10 EuroLeague games, Vilnius time)
- [ ] The notification permission prompt was allowed
- [ ] "Send a test reminder (10 s)" shows a notification while the app is in the background
- [ ] "Remind me 2 h before" works on a game

**When you resume:** start by asking the user what the phone shows now. Then continue from the list above.

## ✅ Done so far
- Step 1: Node.js v24.21.0 (needed `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` for npm)
- Step 2: VS Code 1.141.2
- Step 3: Git 2.56.0 (VS Code as editor, default branch `main`)
- Step 4: Git user.name / user.email set
- Step 5: Expo account (`karolisrepliva`) logged in on the PC (`eas login`) and in Expo Go on the phone
- Phone: **work-managed Samsung Galaxy S23**, **APK installs not allowed**, so the app runs in **Expo Go** (installed from the Play Store)
- Steps 6–7: API-Sports tested and **rejected**: the free plan has no current season (2022–2024 only).
  New data sources were chosen (see PLAN.md → Data sources): EuroLeague feed, ESPN feed, TheSportsDB for LKL
- Step 8: Repo cloned to `C:\Users\karol\Projects\Sportsreminderapp`, `npm install` OK
- Step 9: **Phase 1 done.** The hello screen showed on the phone via `npx expo start --tunnel`
  (fix needed: `@expo/ngrok` as a project devDependency, because the global install isn't found on Windows)
- Phase 2 code written: `src/providers/euroleague.ts`, `src/notifications.ts`, `src/time.ts`, `src/types.ts`, `App.tsx`, plus `Start app.cmd`

## ⏭️ After step 10
Phase 3 ("Following"): save followed competitions, teams and games on the phone (they don't survive a restart yet),
add the ESPN provider (NBA, Champions League, football leagues) and the TheSportsDB provider (LKL, next game only).
Every feature must work inside Expo Go (no custom native modules).
