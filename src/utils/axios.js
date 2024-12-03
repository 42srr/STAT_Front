// src/utils/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // 토큰 갱신 로직
      try {
        const refreshToken = sessionStorage.getItem("refreshToken");
        const response = await axios.post("/api/refresh", { refreshToken });
        const { accessToken } = response.data;
        sessionStorage.setItem("accessToken", accessToken);
        error.config.headers.Authorization = `Bearer ${accessToken}`;
        return axios(error.config);
      } catch (err) {
        // 리프레시 토큰도 만료된 경우
        sessionStorage.clear();
        window.location.href = "/";
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
