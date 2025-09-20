import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";
import { app } from "@/modules/core/configs/app";
import { deleteStorage } from "@/modules/core/utils/secureStore";
import { router } from "expo-router";
import { AUTH_TOKEN_KEY } from "@/modules/auth/config";

const defaultConfig: CreateAxiosDefaults = {
  baseURL: app.publicConsumerUrl,
  headers: {
    "User-Agent": "BazzarifyConsumer",
    "Content-Type": "application/json",
    "X-APP-Key": app.publicAppKey,
  },
};
const defaultConfigWithToken = (token: string) => {
  return {
    ...defaultConfig,
    baseURL: app.publicAuthUrl,
    headers: { ...defaultConfig.headers, "x-api-token": token },
  };
};

export const axiosInstance: AxiosInstance = axios.create(defaultConfig);

export const authAxiosInstance = async (token: string | undefined) => {
  if (!token) {
    router.replace("/(tabs)/guest/guestAccountIndex");
    return;
  }
  const config = defaultConfigWithToken(token);
  const instance = axios.create(config);
  instance.interceptors.response.use((response) => {
    if (response.data?.metaData?.errorCode === 401) {
      deleteStorage(AUTH_TOKEN_KEY);
      router.replace("/(tabs)/guest/guestAccountIndex");
    }
    return response;
  });
  return instance;
};
