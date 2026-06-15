import axios from "axios";
import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import {
  ACCESS_TOKEN_KEY,
  API_BASE_URL,
  ApiEndpoint,
  AUTH_USER_KEY,
  REFRESH_TOKEN_KEY,
  TENANT_SLUG,
} from "~constants";

import type { ApiErrorData, RefreshResponse } from "./api.types";

let logoutCallback: (() => void) | null = null;

export const setLogoutCallback = (callback: (() => void) | null) => {
  logoutCallback = callback;
};

const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers["x-tenant-slug"] = TENANT_SLUG;
  return config;
});

instance.interceptors.response.use(
  (response) => {
    if (response.status === 204) return undefined as unknown as AxiosResponse;
    return response.data as unknown as AxiosResponse;
  },
  async (error: AxiosError<ApiErrorData>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const storedRefreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

      if (storedRefreshToken) {
        try {
          const { data } = await axios.post<RefreshResponse>(
            `${API_BASE_URL}${ApiEndpoint.AuthRefresh}`,
            { refreshToken: storedRefreshToken },
          );
          localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
          localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return instance(originalRequest);
        } catch {
          localStorage.removeItem(ACCESS_TOKEN_KEY);
          localStorage.removeItem(REFRESH_TOKEN_KEY);
          localStorage.removeItem(AUTH_USER_KEY);
          logoutCallback?.();
          return Promise.reject(
            new Error("Session expired. Please log in again."),
          );
        }
      }
    }

    const message = error.response?.data?.message ?? error.message;
    return Promise.reject(new Error(message));
  },
);

/* eslint-disable max-params */
export const apiClient = {
  get: <T>(path: string, config?: Parameters<typeof instance.get>[1]) =>
    instance.get<T, T>(path, config),
  post: <T>(
    path: string,
    body?: unknown,
    config?: Parameters<typeof instance.post>[2],
  ) => instance.post<T, T>(path, body, config),
  patch: <T>(
    path: string,
    body?: unknown,
    config?: Parameters<typeof instance.patch>[2],
  ) => instance.patch<T, T>(path, body, config),
  delete: <T>(path: string, config?: Parameters<typeof instance.delete>[1]) =>
    instance.delete<T, T>(path, config),
};
/* eslint-enable max-params */
