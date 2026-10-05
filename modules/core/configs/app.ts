import Constants from "expo-constants";
import { Platform } from "react-native";
import { resolveApiEndpointUrls } from "./apiEndpoints";

const configuredUrls = {
  publicRootUrl:
    process.env.EXPO_PUBLIC_ROOT_URL || "http://consumer.larashops.com/api/v1",
  publicAuthUrl:
    process.env.EXPO_PUBLIC_AUTH_URL ||
    "https://consumer.larashops.com/api/v1/auth",
  publicConsumerUrl:
    process.env.EXPO_PUBLIC_CONSUMER_URL ||
    "https://consumer.larashops.com/api/v1/consumers",
};

const endpointResolution = resolveApiEndpointUrls({
  configuredUrls,
  isDevelopment: __DEV__,
  platform: Platform.OS,
  hostUri: Constants.expoConfig?.hostUri,
  developmentOrigin: process.env.EXPO_PUBLIC_DEV_API_ORIGIN,
});

if (endpointResolution.diagnostic) {
  const { platform, source, origin } = endpointResolution.diagnostic;
  console.info(
    `[DEV_API_ENDPOINT_RESOLVED] platform=${platform} source=${source} origin=${origin}`,
  );
}

export const app = {
  ...endpointResolution.urls,
  publicAppKey: process.env.APP_KEY || "",
  modules: {
    auth: {
      path: "/auth",
      name: "auth",
    },
    consumers: {
      path: "/api/v1/consumers",
    },
  },
  remotePaths: {
    auth: {
      redirect: {
        path: "redirect?provider=:provider",
      },
    },
    consumer: {
      getHomeCategories: {
        path: "/consumers/home/getHomeCategories",
      },
      getCategories: {
        path: "categories",
      },
    },
  },
};
