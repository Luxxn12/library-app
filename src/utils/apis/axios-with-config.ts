import Cookies from "js-cookie";
import axios from "axios";

const axiosWithConfig = axios.create();
const token = Cookies.get("token") ?? "";

axiosWithConfig.interceptors.request.use((axiosConfig) => {
  axiosConfig.baseURL = "https://hells-kitchen.onrender.com/api/v1";

  if (token !== "") {
    axiosConfig.headers.Authorization = `Bearer ${token}`;
  }

  return axiosConfig;
});

export default axiosWithConfig;