const { getSentryExpoConfig } = require("@sentry/react-native/metro");

const config = getSentryExpoConfig(__dirname);

// Jotai's ESM export contains import.meta expressions that Metro does not
// transform for the browser bundle. Resolve package main fields instead so
// the shared app can use the package's React Native-compatible CJS entry.
config.resolver = {
  ...config.resolver,
  unstable_enablePackageExports: false,
};

module.exports = config;
