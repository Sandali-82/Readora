# Readora

Readora is a book discovery app built with React Native (CLI) and TypeScript. Users sign in, search books from the Open Library API, open book details and save favourites.

> Status: work in progress (IN3210 Assignment 2). Features marked "planned" are not built yet.

**Assignment topic:** Books & Reading, with the Smart search twist (debounced search, filter chips and an empty state).

## Features

Done:

- Typed navigation: auth stack, bottom tabs (Home, Favourites) and a Home stack (Home, Search, Details)
- Validation rules for login and registration (Zod) with unit tests
- Secure token storage in the Android Keystore / iOS Keychain
- Redux Toolkit store with an auth slice
- Auth API service and thunks: login, register, logout and session restore
- Theme tokens (colors, spacing, radius, typography) in one place
- CI: lint, type check and tests on every push and pull request

Planned:

- Login and registration screens connected to the auth thunks
- Book list and details from Open Library
- Favourites that persist across app restarts
- Smart search: debounced input, filter chips and an empty state
- Screenshots and a demo video

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | React Native (CLI), TypeScript |
| Navigation | React Navigation (native stack and bottom tabs) |
| State | Redux Toolkit |
| Validation | Zod |
| Secure storage | react-native-keychain |
| Testing | Jest |
| Quality | ESLint, Prettier, GitHub Actions |
| APIs | DummyJSON (auth), Open Library (books) |

## Getting started

### Prerequisites

- Node.js 22
- The React Native Android environment from the [official guide](https://reactnative.dev/docs/set-up-your-environment)
- Android Studio with the Android SDK and NDK 27.1.12297006 (install it from the SDK Manager)
- An Android emulator, or a phone with USB debugging enabled

### Run the app

```sh
npm install
npm start
```

In a second terminal, with the emulator running or the phone connected:

```sh
adb reverse tcp:8081 tcp:8081
npm run android
```

The first Android build takes several minutes because Gradle downloads its dependencies.

### Troubleshooting

- `INSTALL_FAILED_USER_RESTRICTED` on a physical phone: turn on "Install via USB" (and "USB debugging (Security settings)" on some brands) in Developer options, then run `npm run android` again and accept the install prompt on the phone.
- "Unable to load script": run `adb reverse tcp:8081 tcp:8081` again and reload the app.

### Scripts

| Command | What it does |
| --- | --- |
| `npm start` | Starts the Metro bundler |
| `npm run android` | Builds and installs the app on a device or emulator |
| `npm run lint` | Runs ESLint |
| `npx tsc --noEmit` | Type checks the project |
| `npm test` | Runs the Jest tests |

## Project structure

The project is organised by feature. Each feature owns its screens, state and tests, and shared code lives in `shared/`. The `@/` import alias points to `src/`.

```
src/
├── app/               App entry, Redux store and typed hooks
├── features/
│   ├── auth/          Schemas, auth slice, thunks, token storage, login/register screens
│   ├── books/         Books screens (list, search, details)
│   └── favourites/    Favourites screen
├── navigation/        Navigators and typed param lists
├── shared/            Reusable components
└── theme/             Design tokens
```

More folders (API layer, hooks, storage) are added together with the features that need them.

## State management

The app uses Redux Toolkit, with `createAsyncThunk` for the auth flow. The store currently has one slice, `auth`, which holds `isAuthenticated` and `userName`. The access token is not part of the Redux state: it is stored in the Keychain / Keystore through `tokenStorage.ts`. `RootNavigator` reads `isAuthenticated` to choose between the auth stack and the main tabs.

## Navigation

Route params are typed in `src/navigation/types.ts`. The Details screen receives only a `workId` string, not the whole book object, so it can load its own data.

## Testing and CI

Tests are written with Jest and live next to the code they cover, in `__tests__` folders. GitHub Actions runs ESLint, the TypeScript check and the tests on every push to `main` and on every pull request. The `main` branch is protected and needs the CI check to pass before a pull request can be merged.

## Authentication note

Authentication uses [DummyJSON](https://dummyjson.com/docs/auth). Login needs a username (not an email) of an existing DummyJSON user, for example `emilys` / `emilyspass`. DummyJSON does not really save new users, so registration is simulated and sends the user back to the login screen.

## Known issues

- Access tokens expire after 60 minutes and token refresh is not implemented. If the stored token is rejected when the app starts, the user is signed out.

## Key decisions

### Decision 1: The auth token is stored in Keychain/Keystore, not in Redux

**What I decided:** I store the auth token only in the device's secure storage (Keychain on iOS, Keystore on Android) using `react-native-keychain`. I do not keep the token in the Redux store.

**Why:**
- The assignment brief says tokens must not be stored in AsyncStorage or MMKV. Secure storage is the required place for them.
- On Android, `react-native-keychain` encrypts the data with a key that is protected by the OS secure storage (Android Keystore). That key cannot be exported.
- Redux state is just JavaScript memory, and I will persist some of it (like favourites) to MMKV/AsyncStorage. If the token were in Redux, a persistence setup could save it to plain storage by mistake. Redux only holds non-sensitive session data, such as the user's name and the logged-in status.
- Logout removes the token from the Keychain, so nothing stays on the device after the user signs out.

**Alternatives I considered:**
- Keeping the token in Redux and excluding it from persistence. I did not choose this because it depends on me never making a configuration mistake. Keeping the token out of Redux is safer by default.
- AsyncStorage or MMKV. The brief does not allow them for tokens. Also, AsyncStorage is not encrypted, and MMKV is not encrypted by default (it only supports optional encryption).

### Decision 2: Thunks for authentication, RTK Query for books

**What I use:** I use `createAsyncThunk` for the auth flow (login, register, logout and restoring the session when the app starts). I plan to use RTK Query for the Open Library data (book list, search and book details).

**Why:**
- Login has several steps: call the DummyJSON API, save the token to Keychain, then save the user's name in Redux. A thunk lets me write these steps in order in one async function and handle errors in one place.
- Books are mostly "fetch and cache" data. RTK Query gives me caching, loading and error states, and it avoids sending the same request again and again.

**What would happen with only one approach:**
- If I used only thunks, I would need to write loading, error and caching logic by hand for every book request. That means more code and more chances for bugs.
- If I used only RTK Query, the login flow would still be possible with mutations, but a thunk is simpler to read for a multi-step flow like this.

### Decision 3: (add after the favourites or search feature)

## AI usage

See `AI_USAGE.md` (to be added).