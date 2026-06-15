export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ApiErrorData {
  message?: string;
}
