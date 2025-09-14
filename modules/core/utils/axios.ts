import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";
import { app } from "@/modules/core/configs/app";

const defaultConfig: CreateAxiosDefaults = {
  baseURL: app.publicConsumerUrl,
  headers: {
    "User-Agent": "BazzarifyConsumer",
    "Content-Type": "application/json",
    "X-APP-Key": app.publicAppKey,
  },
};

const axiosInstance: AxiosInstance = axios.create(defaultConfig);

export default axiosInstance;

// export const authAxiosInstance = async () => {
//   const payload: JWTPayload | null = await getSessionPayload();
//   if (!payload) {
//     redirect("/login");
//   }
//   const token = payload.token;
//   const instance = axios.create({
//     ...defaultConfig,
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   instance.interceptors.response.use((response) => {
//     if (response.data?.metaData?.errorCode === 401) {
//       deleteSession();
//       redirect("/login");
//     }
//     return response;
//   });
//   return instance;
// };
