import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";
import { app } from "@/modules/core/configs/app";
import { router } from "expo-router";
import { setAuthRedirect } from "@/modules/core/utils/authRedirect";
import {
  clearAuthSession,
  requireReauthSession,
} from "@/modules/auth/session/sessionController";
import { isAuthEntryPath } from "@/modules/auth/utils/routePolicy";

interface IAuthAxiosInstanceParams {
  token: string | undefined;
  modulePath: string;
}
type RouteState = {
  routes?: RouteState[];
  index?: number;
  path?: string;
  state?: RouteState;
};
const defaultConfig: CreateAxiosDefaults = {
  baseURL: app.publicConsumerUrl,
  headers: {
    "User-Agent": "BazzarifyConsumer",
    "Content-Type": "application/json",
    "X-APP-Key": app.publicAppKey,
  },
};
const defaultConfigWithToken = ({
  token,
  modulePath,
}: IAuthAxiosInstanceParams) => {
  return {
    ...defaultConfig,
    baseURL: [app.publicRootUrl, modulePath].join("/"),
    headers: {
      ...defaultConfig.headers,
      "x-api-token": token,
      "X-APP-Key": app.publicAppKey,
    },
  };
};

export const axiosInstance: AxiosInstance = axios.create(defaultConfig);

const getActivePath = () => {
  const state = (
    router as unknown as {
      getState?: () => { routes?: RouteState[]; index?: number };
    }
  ).getState?.();
  if (!state?.routes?.length) {
    return null;
  }
  let route: RouteState | undefined =
    state.routes[state.index ?? state.routes.length - 1];
  while (route?.state?.routes?.length) {
    const nested = route.state as RouteState;
    const nestedRoutes = nested.routes;
    if (!nestedRoutes?.length) {
      break;
    }
    route = nestedRoutes[nested.index ?? nestedRoutes.length - 1];
  }
  const path = route?.path;
  if (typeof path === "string" && path.includes("/")) {
    return path.startsWith("/") ? path : `/${path}`;
  }
  return null;
};

const stashRedirectIntent = async () => {
  const path = getActivePath();
  if (path && !isAuthEntryPath(path)) {
    await setAuthRedirect(path);
  }
};

export const authAxiosInstance = async ({
  token,
  modulePath,
}: IAuthAxiosInstanceParams) => {
  if (!token) {
    await stashRedirectIntent();
    await clearAuthSession();
    return;
  }
  const config = defaultConfigWithToken({ token, modulePath });
  const instance = axios.create(config);
  instance.interceptors.response.use(
    async (response) => {
      const errorCode =
        response.data?.errorCode ?? response.data?.metaData?.errorCode;
      if (errorCode === 401) {
        await stashRedirectIntent();
        await requireReauthSession();
      }
      return response;
    },
    async (error) => {
      if (error.response?.status === 401) {
        await stashRedirectIntent();
        await requireReauthSession();
      }
      return Promise.reject(error);
    },
  );
  return instance;
};
