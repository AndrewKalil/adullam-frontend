import { createContext } from "react";

import type { AuthContextValue } from "./AuthProvider.types";

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  accessToken: null,
  isLoading: true,
  onLoginHandler: () => undefined,
  signOut: async () => undefined,
});
