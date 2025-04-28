import axios, { AxiosInstance } from "axios";

const remoteConfig = {
  remote: "https://consumer.bazzarify.com/api/v1", // remove android:usesCleartextTraffic="true" after ssl activated for the domain
  xAppKey: process.env.EXPO_PUBLIC_APP_KEY,
};
const axiosInstance: AxiosInstance = axios.create({
  baseURL: remoteConfig.remote,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-APP-KEY": remoteConfig.xAppKey,
  },
  validateStatus: (status) => status < 500,
});
export default axiosInstance;
