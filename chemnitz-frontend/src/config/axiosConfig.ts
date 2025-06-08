import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

interface ApiResponse {
  data: any;
}

interface ApiError {
  message: string;
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});


// axiosInstance.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   (error: AxiosError) => {
//     const requestUrl = error.config?.url || "";
//     if (
//       error.response?.status === 401 &&
//       requestUrl !== '/api/auth/login' // skip redirect on /login 401
//     ) {
//       if (typeof window !== "undefined") {
//         window.location.href = "http://localhost:3000/auth/login";
//       }
//     }
//     return Promise.reject(error);
//   }
// );


export default axiosInstance;

export type { ApiResponse, ApiError };
