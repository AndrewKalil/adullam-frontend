import { LayoutDashboard, Package, Percent, Tag, Ticket } from "lucide-react";
import type { AppShellNavItem } from "@kalortech/shared-components";

import { AppRoute } from "~constants";

export const NAV_ITEMS: AppShellNavItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: AppRoute.Dashboard,
    icon: LayoutDashboard,
  },
  {
    key: "products",
    label: "Products",
    path: AppRoute.Products,
    icon: Package,
  },
  {
    key: "categories",
    label: "Categories",
    path: AppRoute.Categories,
    icon: Tag,
  },
  {
    key: "discounts",
    label: "Discounts",
    path: AppRoute.Discounts,
    icon: Percent,
  },
  {
    key: "promo-codes",
    label: "Promo Codes",
    path: AppRoute.PromoCodes,
    icon: Ticket,
  },
];
