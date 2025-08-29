#!/usr/bin/env sh
set -e

# Prebuild native Android project
npx expo prebuild --clean --platform android

# For development builds, use a Debug variant and do not embed a production bundle.
# If you need to test without Metro, you can export with --dev true, but for typical
# dev client workflow keep Metro running with `yarn start` (port 8082 per package.json).
# npx expo export:embed --platform android --dev true

cd ./android
# ./gradlew clean
./gradlew :app:assembleDebug
cd ..