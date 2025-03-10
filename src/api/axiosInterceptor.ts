import { AxiosError, AxiosRequestConfig } from "axios";
import Axios from "./axiosInstance";
import { getAuth } from "firebase/auth";

interface ICustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const auth = getAuth();

const rememberMe: boolean = JSON.parse(
  localStorage.getItem("rememberMe") as string
);

Axios.interceptors.response.use(
  (response) => response,

  async (
    error: AxiosError<
      { success: boolean; message: string; action: string },
      ICustomAxiosRequestConfig
    >
  ) => {

    if (!error.config) return Promise.reject(error);

    const originalRequest: ICustomAxiosRequestConfig = error.config;

    originalRequest._retry = false;
  

    if (
      error.response?.status === 401 &&
      error.response?.data?.action === "refresh" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const user = auth.currentUser;
        if (!user) throw new Error("No User logged in!");

        const newToken = await user.getIdToken(true);

        await Axios.post(
          "/user/refresh-token",
          { rememberMe },
          {
            headers: {
              Authorization: `Bearer ${newToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        return Axios(originalRequest);
      } catch (refreshError) {

        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
