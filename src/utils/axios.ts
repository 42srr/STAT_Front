// src/utils/axios.ts
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const instance = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = sessionStorage.getItem("accessToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  async (error: AxiosError): Promise<any> => {
    if (error.response?.status === 401) {
      // 토큰 갱신 로직
      try {
        const refreshToken = sessionStorage.getItem("refreshToken");
        const response = await axios.post("/api/refresh", { refreshToken });
        const { accessToken } = response.data;
        sessionStorage.setItem("accessToken", accessToken);

        if (error.config && error.config.headers) {
          error.config.headers.Authorization = `Bearer ${accessToken}`;
          return axios(error.config);
        }
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
