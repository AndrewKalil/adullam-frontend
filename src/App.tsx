import { QueryProvider } from "@kalortech/shared-components";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { ProtectedRoute } from "~components";
import { AppRoute } from "~constants";
import { AppShell, CategoriesPage, DashboardPage, LoginPage } from "~pages";
import { AuthProvider } from "~providers";

export const App = () => (
  <BrowserRouter>
    <QueryProvider>
      <AuthProvider>
        <Routes>
          <Route path={AppRoute.Login} element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<AppShell />}>
              <Route path={AppRoute.Dashboard} element={<DashboardPage />} />
              <Route path={AppRoute.Products} element={<div className="p-6">Products</div>} />
              <Route path={AppRoute.Categories} element={<CategoriesPage />} />
              <Route path={AppRoute.Discounts} element={<div className="p-6">Discounts</div>} />
              <Route path={AppRoute.PromoCodes} element={<div className="p-6">Promo Codes</div>} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to={AppRoute.Dashboard} replace />} />
        </Routes>
      </AuthProvider>
    </QueryProvider>
  </BrowserRouter>
);
