Bazzarify App – Development Guidelines

Scope

- This document captures project-specific practices for building, configuring, testing, and contributing to the
  Bazzarify Expo/React Native codebase. It assumes advanced familiarity with Expo, React Native, Jest, and EAS.

Build and Configuration

1) Runtime and Package Manager

- Expo SDK: 52 (expo ~52.x) with React Native 0.76.x.
- Package manager: Yarn classic is the canonical package manager (package.json sets "packageManager" to yarn@1.22.22).
  npm and pnpm can work locally, but CI/CD and scripts may assume yarn availability. Prefer yarn when possible.

2) Local development

- Start dev server on the dedicated port used by this repo:
    - yarn start (or npm run start) launches expo start --port 8082.
    - yarn android / yarn ios / yarn web map to the same port and platform flags.
- Ports and scripts:
    - The dev server uses port 8082 (adjusted from Expo default). If changing ports, update scripts in package.json
      accordingly.
- Optional helper script: ./start.sh
    - Checks for a local "consumer" service on port 3000 before starting. If present, runs bun start. This is a
      convenience for local setups where a dependent service is expected.

3) Environment configuration

- Environment variables consumed by the app are namespaced via EXPO_PUBLIC_* so they’re available on the client:
    - EXPO_PUBLIC_CONSUMER_URL: Base API endpoint for axios. Defaults to https://consumer.bazzarify.com/api/v1/consumers if
      unset.
    - EXPO_PUBLIC_APP_KEY: App key forwarded as X-APP-Key header by axios.
- Axios instance (modules/core/utils/axios.ts):
    - Sets baseURL from EXPO_PUBLIC_API_URL and applies headers:
        - User-Agent: BazzarifyConsumer
        - Content-Type: application/json
        - X-APP-Key: EXPO_PUBLIC_APP_KEY
- Provide .env values via Expo’s env loading (e.g., .env, .env.local). For EAS, configure in Project Settings →
  Environment variables or eas.json profiles.

4) Bundler and transforms

- babel.config.js:
    - Uses babel-preset-expo with jsxImportSource set to nativewind.
    - Includes nativewind/babel for Tailwind class support.
- metro.config.js:
    - Wrapped with withNativeWind and Sentry’s getSentryExpoConfig. If you change entry CSS (global.css), update the
      input path here.
- Module aliasing:
    - tsconfig.json defines path alias @/* → ./* so imports like @/modules/... are valid. Babel respects TS path mapping
      via Expo’s defaults.

5) Styling

- Tailwind via nativewind (nativewind v4). Keep className usage consistent and avoid dynamic className concatenations
  that nativewind can’t statically analyze.
- Prettier + Tailwind plugin:
    - Use yarn format:write before commits. ESLint enforces Prettier formatting.

6) EAS build profiles (eas.json)

- development (internal distribution):
    - bun 1.2.15 is available in the build environment (relevant for scripts that invoke bun).
    - developmentClient: true for dev builds. Android buildType: apk; iOS builds for simulator.
- preview and production profiles available; production has autoIncrement enabled.
- Local Android build helper (android-build-steps-dev.sh):
    - npx expo prebuild --no-install --platform android
    - npx expo export:embed --eager --platform android --dev false
    - ./android/gradlew :app:assembleRelease
    - Use this only if you need a local release APK outside EAS; otherwise prefer EAS.

Testing

1) Test stack

- Jest with jest-expo preset (configured inline in package.json) and @testing-library/react-native for component tests.
- Scripts: yarn test runs jest --watchAll.
- If yarn isn’t available on your machine, npx jest works as well.

2) Running tests

- Run the whole suite:
    - yarn test
    - Or: npx jest
- Running a specific test file (recommended when RN routing components are in the tree):
    - npx jest path/to/file.test.tsx --runInBand

3) Adding new tests

- Place unit tests next to components (e.g., components/__tests__) or in a top-level tests directory. Jest will
  discover *.test.ts and *.test.tsx by default.
- Keep React Native and Expo Router concerns in mind:
    - Components that use expo-router (router.push, router.canGoBack) require mocking during tests, because routing
      context isn’t available in Jest.
    - Minimal mock example to include at the top of tests that indirectly render router-aware components:
        - jest.mock('expo-router', () => ({
          router: {
          push: jest.fn(),
          back: jest.fn(),
          canGoBack: jest.fn(() => false),
          },
          }));
    - Alternatively, add a Jest setup file with setupFilesAfterEnv and put the mock there for global availability. If
      you do this, add a jest field in package.json or a jest.config.js to reference the setup file.
- Components using react-native-reanimated may also require the recommended mocks from react-native-testing-library docs
  if you test animations.

4) Example: verified simple test

- A simple sanity test was validated locally with npx jest tests/smoke.test.ts (testing arithmetic). Because an existing
  component test (components/__tests__/UnitTest/Header-test.tsx) depends on expo-router, running the entire suite
  without mocks leads to errors like "Cannot read properties of undefined (reading 'isReady')". This is expected without
  a router mock.
- To create a passing example in your environment:
    - Create tests/smoke.test.ts with:
        - describe("smoke", () => {
          it("adds numbers", () => {
          expect(1 + 1).toBe(2);
          });
          });
    - Run: npx jest tests/smoke.test.ts --runInBand
    - Remove the file afterwards if it’s only for demonstration.

5) Troubleshooting

- Expo Router in tests: mock as shown above.
- Native modules: if tests error on unmocked native modules, consider jest-expo provided mocks or add specific jest.mock
  calls for the offending modules.
- Watch mode in certain terminals may require --runInBand to avoid concurrency issues with RN mocks.

Additional Development Notes

1) Network layer

- axios instance centralizes baseURL and headers. Keep API contracts consistent with server responses used throughout
  modules/product/services. For example, in getFlashDealProducts, API response structure is assumed as
  data.data.payload.flashDeals; metaData.error presence is checked. If the backend changes shape, update services
  accordingly and extend typings.

2) Error handling patterns

- Many services return null on AxiosError and log to console. In UI, handle null/undefined defensively to avoid crashes.
  Consider normalizing error objects or returning Result types for richer error flows.

3) Code style and linting

- ESLint (flat config) extends expo and prettier; rules enforce Prettier formatting via eslint-plugin-prettier. Run:
    - yarn lint
    - yarn format:check / yarn format:write
- Keep imports using @/ alias for internal modules per tsconfig paths.

4) Performance and UX

- nativewind is configured; avoid run-time string building for className that nativewind can’t track. Prefer fixed class
  lists and conditional merges with clsx when necessary.
- Large lists should use appropriate virtualization strategies.

5) Sentry/Instrumentation

- metro.config.js integrates @sentry/react-native/metro. If you enable Sentry in runtime, ensure DSN and environment are
  configured via env vars and the native projects are properly initialized.

6) Web support

- react-native-web is present; most components should be compatible, but verify any platform-specific APIs (e.g.,
  Haptics, SecureStore) are guarded behind Platform checks.

7) Ports and conflicts

- The dev server is pinned to 8082 across scripts to avoid conflicts with other local services. If you run multiple Expo
  apps, adjust ports to avoid clashes.

How to extend this file

- When you add new infrastructure (e.g., Detox e2e tests, CI workflows, additional env vars), expand the relevant
  sections with concrete commands, path conventions, and pitfalls specific to this repo.
