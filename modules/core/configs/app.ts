import { Platform } from "react-native";

export const app = {
  tempHost:
    Platform.OS === "ios" ? "http://192.168.1.66:3000" : "http://10.0.2.2:3000",
  publicAuthUrl:
    process.env.EXPO_PUBLIC_AUTH_URL ||
    "https://consumer.bazzarify.com/api/v1/auth",
  publicConsumerUrl:
    process.env.EXPO_PUBLIC_CONSUMER_URL ||
    "https://consumer.bazzarify.com/api/v1/consumers",
  publicAppKey: process.env.EXPO_PUBLIC_APP_KEY || "",
  modules: {
    auth: {
      path: "/api/v1/auth",
    },
    consumers: {
      path: "/api/v1/consumers",
    },
  },
  remotePaths: {
    auth: {
      redirect: {
        path: "/redirect?provider=:provider",
      },
    },
    consumer: {
      getHomeCategories: {
        path: "/consumers/home/getHomeCategories",
      },
    },
  },
};
