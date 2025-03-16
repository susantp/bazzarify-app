import axios, { AxiosInstance } from "axios";

const remoteData = {
  remote: "https://local-ne.bazzarify.com/api/v1", // remove android:usesCleartextTraffic="true" after ssl activated for the domain
  local: "http://192.168.1.64/api/v1",
  xAppKey: process.env.EXPO_PUBLIC_APP_KEY,
};
const axiosInstance: AxiosInstance = axios.create({
  baseURL: remoteData.local,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-APP-KEY": remoteData.xAppKey,
  },
  validateStatus: (status) => status < 500,
});
export default axiosInstance;
