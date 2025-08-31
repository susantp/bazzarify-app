## Troubleshoots

## Isn't exported by expo-modules-core.

If you see this error: This is because of the old build cache.

- Remove node_modules, android, ios

```shell
rm -rf node_modules android ios   
```

- Run the build.

```shell
bunx expo run:android
```

```shell
bunx expo run:ios
```

- Install the newly built app by dragging the apk file `./android/app/build/outputs/apk/debug/app-debug.apk` into the
  emulator.
- Start the app with a cleared cache.

```shell
bunx expo run:android
```


