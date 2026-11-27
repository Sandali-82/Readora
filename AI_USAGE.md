# AI usage

I used an AI tool (Claude Sonnet 5.5) while building Readora. This file explains what I used it for, what I did myself, and where I had to correct or change its output.

## What I used AI for

- Planning: I decided the project structure myself by discussing it with AI. I also wanted a branch and pull request workflow and a pull request template, so that my commits stay organized, and AI helped me plan them. I decided to set up CI early to keep `main` tested and clean, and AI guided me through setting it up.
- First drafts of code (navigation, theme, auth service and thunks, forms, tests). I ran, read and changed these drafts.
- Debugging error messages from Metro, Gradle, Jest and TypeScript.
- Learning: how Redux Toolkit, Keychain, and RTK Query vs thunks work.

## What I did myself

- The Figma design and the colour palette.
- Running and testing every feature on my phone.
- All commits and pull requests.
- Choosing what to build and which AI suggestions to keep or drop.

## Cases where I corrected or changed AI output

### 1. Jest setup file inside `__tests__`

The AI put the Jest setup file in `__tests__/setupTests.ts`. Jest treats every file in `__tests__` as a test file, so it would fail. I moved it to `jest.setup.ts` in the project root.

### 2. Wrong Jest preset

The AI wrote `preset: 'react-native'` in `jest.config.js`. `npm test` failed with "should have jest-preset.js". I changed it to `@react-native/jest-preset`, which this React Native version uses.

### 3. StatusBar prop that does not exist

The AI used `backgroundColor` on `StatusBar`. TypeScript reported error 2769 because this React Native version does not have that prop (the status bar is edge-to-edge). I removed it.

### 4. Redux packages in Jest

After adding Redux Toolkit, Jest failed with "Unexpected token 'export'". The packages `immer` and `react-redux` ship ES module code. I added them (and the other Redux packages) to `transformIgnorePatterns`.

### 5. Feather icons in Jest

The first mock the AI gave, `() => 'Feather'`, failed when the login screen rendered icons ("Element type is invalid"). The package also loads a font file that Jest cannot parse. I replaced it with `{ __esModule: true, default: Text }` in `jest.setup.ts`.

### 6. Zod 4 and Metro

Metro could not bundle Zod 4 ("Export namespace should be first transformed by `@babel/plugin-transform-export-namespace-from`"), although the tests passed. I fixed it by adding the Babel plugin `@babel/plugin-transform-export-namespace-from`.

### 7. Incomplete edit

The AI's instructions for the login notice left out the line that defines `justRegistered`. TypeScript reported error 2304. I added `const justRegistered = route.params?.registered === true;`.

### 8. Timing of the security scanning workflow

I wanted to add a security workflow (CodeQL, npm audit and Gitleaks). The AI said that I could add it, but that it is better to add it at the end, because scans like `npm audit` and Gitleaks can fail on a new React Native project and turn the CI red. I accepted this advice. I started with only the lint, type check and test CI so that `main` stays clean, and I plan to add the security workflow at the end.

## How I checked the AI output

After each change I ran `npm run lint`, `npx tsc --noEmit` and `npm test`, and I tested the app on a device. I only kept code that I could read and explain.