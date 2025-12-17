bunx expo export:embed \
  --platform android \
  --bundle-output android/app/src/main/assets/index.android.bundle
bunx expo prebuild --clean --bun --platform android
pushd ./android || exit
#cd ./android && \
#./gradlew clean && \
./gradlew :app:assembleRelease
#cd ..
popd || exit