#!/usr/bin/env bash
set -euo pipefail

# ---- Config ----
APP_NAME="Bazarify"                     # Expo-generated scheme/workspace name
CONFIG="${CONFIG:-Debug}"               # Debug by default
DERIVED_DATA="${DERIVED_DATA:-ios/build}"
BUNDLE_ID="${BUNDLE_ID:-}"             # optional (e.g., com.bazzarify.app) to auto-launch

echo ">> Prebuild iOS (pods included)"
# If cleaning every time is too slow, drop the --clean.
bunx expo prebuild --clean --platform ios

if [[ ! -d "ios/${APP_NAME}.xcworkspace" ]]; then
  echo "!! iOS workspace was not generated. Check the CocoaPods output above."
  exit 1
fi

echo ">> Detect booted simulator"
BOOTED_ID="$(xcrun simctl list devices booted | awk -F'[()]' '/Booted/ {print $2; exit}')"
if [[ -z "${BOOTED_ID}" ]]; then
  echo "!! No booted iOS Simulator found."
  echo "   Open one (e.g., 'open -a Simulator' then choose a device) and re-run."
  exit 1
fi

# (Optional) Show which device/OS is booted — purely informational
DEV_LINE="$(xcrun simctl list devices | grep "${BOOTED_ID}" || true)"
DEV_NAME="$(echo "${DEV_LINE}" | sed -E 's/^[[:space:]]*([^()]+) \(.*/\1/')"
DEV_OS="$(echo  "${DEV_LINE}" | sed -E 's/.*\(iOS ([0-9.]+).*/\1/')"
echo "   Using: ${DEV_NAME:-<unknown device>} (iOS ${DEV_OS:-?}) [${BOOTED_ID}]"

echo ">> Build ${CONFIG} for the booted simulator"
# NOTE: We DO NOT pass -sdk or OS version. We only target the booted device id.
xcodebuild \
  -workspace "ios/${APP_NAME}.xcworkspace" \
  -scheme "${APP_NAME}" \
  -configuration "${CONFIG}" \
  -destination "id=${BOOTED_ID}" \
  -derivedDataPath "${DERIVED_DATA}" \
  IPHONEOS_DEPLOYMENT_TARGET=16.4 \
  build

APP_PATH="${DERIVED_DATA}/Build/Products/${CONFIG}-iphonesimulator/${APP_NAME}.app"
echo
echo "✅ Build complete:"
echo "   ${APP_PATH}"

echo ">> Installing on simulator"
xcrun simctl install booted "${APP_PATH}" || echo "   (Install skipped/failed — check Simulator)"

if [[ -n "${BUNDLE_ID}" ]]; then
  echo ">> Launching ${BUNDLE_ID}"
  xcrun simctl launch booted "${BUNDLE_ID}" || echo "   (Launch failed — check BUNDLE_ID)"
else
  echo ">> Skipping launch (set BUNDLE_ID env var to auto-launch)"
fi

echo "All done."
