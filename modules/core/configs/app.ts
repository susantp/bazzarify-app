export const app = {
  publicRootUrl:
    process.env.EXPO_PUBLIC_ROOT_URL || "https://consumer.larashops.com",
  publicAuthUrl:
    process.env.EXPO_PUBLIC_AUTH_URL ||
    "https://consumer.larashops.com/api/v1/auth",
  publicConsumerUrl:
    process.env.EXPO_PUBLIC_CONSUMER_URL ||
    "https://consumer.larashops.com/api/v1/consumers",
  publicAppKey: process.env.APP_KEY || "",
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
      getCategories: {
        path: "categories",
      },
    },
  },
};
