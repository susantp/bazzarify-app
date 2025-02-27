import axios from "axios";

const remoteData = {
  remote: "http://bazzarify.com/api/v1", // remove android:usesCleartextTraffic="true" after ssl activated for the domain
  local: "http://192.168.1.64/api/v1",
  xAppKey: "K@thmandu#1522",
};
const axiosInstance = axios.create({
  baseURL: remoteData.remote,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-APP-KEY": remoteData.xAppKey,
  },
});
export default axiosInstance;
