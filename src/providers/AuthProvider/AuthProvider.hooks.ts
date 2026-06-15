import { useContext } from "react";

import { AuthContext } from "./AuthProvider.constants";

export const useAuth = () => useContext(AuthContext);
