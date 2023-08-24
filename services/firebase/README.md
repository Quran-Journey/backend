# Firebase

Primarily used for authentication, we connect to a firebase account and use `firebase-admin` to verify user credentials.
The `auth.js` file contains the `FireBaseAuthService` which stores constants and methods for authentication.
`serviceAccountKey.json` is used to allow the db to sign in and is required for `auth.js` to work.
