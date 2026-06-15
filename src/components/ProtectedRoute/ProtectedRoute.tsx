import { Spin } from "antd";
import { Navigate, Outlet } from "react-router-dom";

import { AppRoute } from "~constants";
import { useAuth } from "~providers";

import styles from "./ProtectedRoute.module.scss";

export const ProtectedRoute = () => {
  const { accessToken, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Spin size="large" />
      </div>
    );
  }

  return !accessToken ? <Navigate to={AppRoute.Login} replace /> : <Outlet />;
};
