import { useCallback, useEffect, useMemo, useState } from "react";

import { ACCESS_TOKEN_KEY, AUTH_USER_KEY, REFRESH_TOKEN_KEY } from "~constants";
import { setLogoutCallback } from "~integrations";
import { logout } from "~services";
import type { AuthTokens, AuthUser } from "~services";

import { AuthContext } from "./AuthProvider.constants";
import type { AuthProviderProps } from "./AuthProvider.types";

export const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props;
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    const storedUser = localStorage.getItem(AUTH_USER_KEY);
    if (storedToken && storedUser) {
      setAccessToken(storedToken);
      setUser(JSON.parse(storedUser) as AuthUser);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setLogoutCallback(() => {
      setAccessToken(null);
      setUser(null);
    });
    return () => setLogoutCallback(null);
  }, []);

  const onLoginHandler = useCallback((tokens: AuthTokens, authUser: AuthUser) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(authUser));
    setAccessToken(tokens.accessToken);
    setUser(authUser);
  }, []);

  const signOut = useCallback(async () => {
    try {
      await logout();
    } finally {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
      setAccessToken(null);
      setUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({ user, accessToken, isLoading, onLoginHandler, signOut }),
    [user, accessToken, isLoading, onLoginHandler, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
