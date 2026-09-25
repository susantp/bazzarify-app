#!/usr/bin/env sh
set -e

# Prebuild native Android project
bunx expo prebuild --clean --platform android

# For development builds, use a Debug variant and do not embed a production bundle.
# For the typical dev-client workflow, keep the Bun-managed Metro server running
# with `bun run start` (port 8082 per package.json). To test without Metro, use:
# bunx expo export:embed --platform android --dev true

cd ./android
# ./gradlew clean
./gradlew :app:assembleDebug
cd ..
