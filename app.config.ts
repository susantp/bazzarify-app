module.exports = {
  name: "Bazarify",
  slug: "bazzarify",
  version: "v0.0.2",
  orientation: "portrait",
  icon: "./assets/images/launcher.png",
  scheme: "bazzarify",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.techbizz.bazzarify",
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: {
    edgeToEdgeEnabled: true,
    adaptiveIcon: {
      foregroundImage: "./assets/images/launcher.png",
    },
    package: "com.techbizz.bazzarify",
    permissions: [
      "android.permission.ACCESS_COARSE_LOCATION",
      "android.permission.ACCESS_FINE_LOCATION",
    ],
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    [
      "expo-location",
      {
        locationAlwaysAndWhenInUsePermission:
          "Allow $(PRODUCT_NAME) to use your location.",
      },
    ],
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
      },
    ],
    "expo-asset",
    [
      "expo-secure-store",
      {
        configureAndroidBackup: true,
        faceIDPermission:
          "Allow $(PRODUCT_NAME) to access your Face ID biometric data.",
      },
    ],
    [
      "@sentry/react-native/expo",
      {
        organization: "techbizz-nepal-pvt-ltd",
        project: "react-native",
        url: "https://sentry.io/",
      },
    ],
    "expo-web-browser",
    "expo-font",
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: "32e3cd11-e03a-424c-8a11-110085048593",
    },
  },
  runtimeVersion: {
    policy: "appVersion",
  },
  updates: {
    url: "https://u.expo.dev/32e3cd11-e03a-424c-8a11-110085048593",
  },
  owner: "techbizz",
};
