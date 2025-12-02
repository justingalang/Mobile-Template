# Mobile template

Expo + React Native starter wired for Firebase, intended to be cloned and customized. It ships with a minimal screen to verify your Firebase wiring and a callable Cloud Function template.

## Repo layout
- `mobile/`: Expo app that reads Firebase config from `.env` and lets you smoke-test Firestore and a callable function.
- `functions/`: Firebase Functions scaffold (CLI-style) with a placeholder `getSecret` callable that reads a secret named `TEMPLATE_SECRET`.

## Requirements
- Node.js 18+ and npm
- iOS development: Xcode + Command Line Tools
- Device testing: Expo Go installed; phone and computer on the same network

## Firebase console prep (required)
1) Create a Firebase project.
2) Add a **Web app (</>)** in Project settings → General. Skip hosting if you want, then copy the SDK config values.
3) Firestore: create a database (test mode is fine for local dev).
4) Authentication: enable the provider(s) you plan to use. To try the sample callable function as-is, enable **Anonymous** sign-in.
5) Secret Manager (optional but needed for the sample function): create a secret named `TEMPLATE_SECRET` with any value (or set it via the CLI later).

## Mobile app setup
```bash
cd mobile
npm install
cp .env.example .env      # paste the Firebase Web config from step 2
npm run start             # starts the Expo dev server
# Press i for iOS simulator or scan the QR code with Expo Go
```
- The home screen shows Firebase status. **Send test ping to Firestore** writes a document to the `pings` collection; use it only to confirm connectivity, then replace with your own logic.
- **Fetch masked secret** calls the callable function `getSecret` and displays the masked value from Secret Manager; update/remove this once you add real backend logic.

## Cloud Functions template
- Code lives at `functions/functions/getSecret/index.js`, exported via `functions/functions/index.js`. It expects a Secret Manager entry named `TEMPLATE_SECRET`; rename both in code/console as you customize.
- Install deps and deploy (requires Firebase CLI and a selected project):
```bash
npm --prefix functions/functions install
firebase functions:secrets:set TEMPLATE_SECRET "example-value" --config functions/firebase.json
firebase deploy --config functions/firebase.json --only functions:getSecret
```
- The provided mobile client uses anonymous auth to call the function; switch to your preferred auth flow or update the UI accordingly.

## Configuration notes
- `mobile/app.config.js` injects `.env` values into `expo.extra.firebase`; `mobile/firebaseConfig.js` reads from there.
- Keep `.env` files out of git. Duplicate `.env.example` for each environment and fill with the correct Firebase project values.
- Replace the sample Firestore write/function call with your app features once you confirm Firebase wiring.
