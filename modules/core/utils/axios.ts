import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

const remoteData: Record<string, string> = {
  apiUrl:
    process.env.EXPO_PUBLIC_API_URL ||
    "https://consumer.bazzarify.com/api/v1/consumers",
  appKey: process.env.EXPO_PUBLIC_APP_KEY || "",
};
const defaultConfig: CreateAxiosDefaults = {
  baseURL: remoteData.apiUrl,
  headers: {
    "User-Agent": "BazzarifyConsumer",
    "Content-Type": "application/json",
    "X-APP-Key": remoteData.appKey,
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
