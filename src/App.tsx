import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { ProtectedRoute } from "~components";
import { AppRoute } from "~constants";
import { LoginPage } from "~pages";
import { AuthProvider } from "~providers";

export const App = () => (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path={AppRoute.Login} element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            {/* App shell + child routes added in Ticket 02 */}
            <Route path={AppRoute.Dashboard} element={<div>Dashboard placeholder</div>} />
          </Route>
          <Route path="*" element={<Navigate to={AppRoute.Dashboard} replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
