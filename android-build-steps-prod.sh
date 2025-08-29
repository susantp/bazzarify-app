bunx expo prebuild --clean --bun --platform android && \
bunx expo export:embed --eager --platform android --production false && \
cd ./android && \
#./gradlew clean && \
./gradlew :app:assembleRelease && \
cd ..