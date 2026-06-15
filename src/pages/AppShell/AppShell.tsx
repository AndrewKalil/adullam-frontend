import { useCallback } from "react";
import { AppShellLayout } from "@kalortech/shared-components";
import { useNavigate } from "react-router-dom";

import { AppRoute } from "~constants";
import { useAuth } from "~providers";

import { NAV_ITEMS } from "./AppShell.constants";

export const AppShell = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const onSignOutHandler = useCallback(async () => {
    await signOut();
    void navigate(AppRoute.Login);
  }, [signOut, navigate]);

  return (
    <AppShellLayout
      navItems={NAV_ITEMS}
      userEmail={user?.email ?? ""}
      onSignOut={onSignOutHandler}
    />
  );
};
