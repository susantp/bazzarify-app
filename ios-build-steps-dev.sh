#!/usr/bin/env sh
set -e

APP_NAME="Bazzarify"          # scheme/workspace name
CONFIG="Debug"
DERIVED_DATA="ios/build"      # change if you like

# Prebuild native iOS project (will run CocoaPods)
npx expo prebuild --clean --platform ios

# For dev builds, keep Metro running instead of embedding bundle.
# To embed a dev bundle (no Metro), uncomment:
# npx expo export:embed --platform ios --dev true

cd ios

# Optional clean:
# xcodebuild clean \
#   -workspace "${APP_NAME}.xcworkspace" \
#   -scheme "${APP_NAME}" \
#   -configuration "${CONFIG}"

# Build Debug for Simulator
xcodebuild \
  -workspace "${APP_NAME}.xcworkspace" \
  -scheme "${APP_NAME}" \
  -configuration "${CONFIG}" \
  -sdk iphonesimulator \
  -derivedDataPath "${DERIVED_DATA}" \
  build

cd ..

echo "Simulator .app output:"
echo "ios/build/Build/Products/${CONFIG}-iphonesimulator/${APP_NAME}.app"
