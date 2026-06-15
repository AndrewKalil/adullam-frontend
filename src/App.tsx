import { QueryProvider } from "@kalortech/shared-components";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { ProtectedRoute } from "~components";
import { AppRoute } from "~constants";
import { AppShell, CategoriesPage, DashboardPage, DiscountsPage, LoginPage, ProductsPage, PromoCodesPage } from "~pages";
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
              <Route path={AppRoute.Products} element={<ProductsPage />} />
              <Route path={AppRoute.Categories} element={<CategoriesPage />} />
              <Route path={AppRoute.Discounts} element={<DiscountsPage />} />
              <Route path={AppRoute.PromoCodes} element={<PromoCodesPage />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to={AppRoute.Dashboard} replace />} />
        </Routes>
      </AuthProvider>
    </QueryProvider>
  </BrowserRouter>
);
