import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";
import { app } from "@/modules/core/configs/app";
import { deleteStorage } from "@/modules/core/utils/secureStore";
import { router } from "expo-router";
import { AUTH_TOKEN_KEY } from "@/modules/auth/config";

interface IAuthAxiosInstanceParams {
  token: string | undefined;
  modulePath: string;
}
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

export const authAxiosInstance = async ({
  token,
  modulePath,
}: IAuthAxiosInstanceParams) => {
  if (!token) {
    router.replace("/(tabs)/guest/guestAccountIndex");
    return;
  }
  const config = defaultConfigWithToken({ token, modulePath });
  const instance = axios.create(config);
  instance.interceptors.response.use(
    (response) => {
      // The proxy exposes failures at the top level; retain backend-envelope compatibility.
      const errorCode =
        response.data?.errorCode ?? response.data?.metaData?.errorCode;
      if (errorCode === 401) {
        deleteStorage(AUTH_TOKEN_KEY);
        router.replace("/(tabs)/guest/guestAccountIndex");
      }
      return response;
    },
    (error) => {
      // Handle HTTP error responses (401, 403, 500, etc.)
      if (error.response?.status === 401) {
        deleteStorage(AUTH_TOKEN_KEY);
        router.replace("/(tabs)/guest/guestAccountIndex");
      }
      // Re-throw the error so it can be handled by the calling code
      return Promise.reject(error);
    },
  );
  return instance;
};
