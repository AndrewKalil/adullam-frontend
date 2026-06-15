import type { ReactNode } from "react";

import type { AuthTokens, AuthUser } from "~services";

export interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextValue {
  user: AuthUser | null;
  accessToken: string | null;
  isLoading: boolean;
  onLoginHandler: (tokens: AuthTokens, user: AuthUser) => void;
  signOut: () => Promise<void>;
}
