// eslint-disable-next-line expo/no-env-var-destructuring
const {
  EXPO_PUBLIC_CONSUMER_URL,
  EXPO_PUBLIC_AUTH_URL,
  EXPO_PUBLIC_ROOT_URL,
  APP_KEY,
} = process.env;
export const app = {
  tempHost: "http://192.168.11.65:3000",
  publicRootUrl: EXPO_PUBLIC_ROOT_URL || "https://consumer.larashops.com",
  publicAuthUrl:
    EXPO_PUBLIC_AUTH_URL || "https://consumer.larashops.com/api/v1/auth",
  publicConsumerUrl:
    EXPO_PUBLIC_CONSUMER_URL ||
    "https://consumer.larashops.com/api/v1/consumers",
  publicAppKey: APP_KEY || "",
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
