import axios from "axios";

const hostPath = {
  remote: "http://bazzarify.com/api/v1", // remove android:usesCleartextTraffic="true" after ssl activated for the domain
  local: "http://192.168.1.64/api/v1",
};
const axiosInstance = axios.create({
  baseURL: hostPath.remote,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
export default axiosInstance;
