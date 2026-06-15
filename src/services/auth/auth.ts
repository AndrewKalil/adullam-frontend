import { ApiEndpoint } from "~constants";
import { apiClient } from "~integrations";

import type { AuthTokens, LoginResponse } from "./auth.types";

export const login = (email: string, password: string): Promise<LoginResponse> =>
  apiClient.post<LoginResponse>(ApiEndpoint.AuthLogin, { email, password });

export const refreshTokens = (refreshToken: string): Promise<AuthTokens> =>
  apiClient.post<AuthTokens>(ApiEndpoint.AuthRefresh, { refreshToken });

export const logout = (): Promise<void> =>
  apiClient.post<void>(ApiEndpoint.AuthLogout, {});
