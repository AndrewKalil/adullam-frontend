import { LayoutDashboard, Package, Percent, Tag } from "lucide-react";

import { useDashboardStats } from "./DashboardPage.hooks";
import styles from "./DashboardPage.module.scss";
import { StatCard } from "./StatCard";

export const DashboardPage = () => {
  const {
    categoriesCount,
    isCategoriesLoading,
    isCategoriesError,
    productsTotal,
    isProductsLoading,
    isProductsError,
    activeDiscountsCount,
    isDiscountsLoading,
    isDiscountsError,
    activePromoCodesCount,
    isPromoCodesLoading,
    isPromoCodesError,
  } = useDashboardStats();

  return (
    <div className={styles.root}>
      <div className={styles.statsGrid}>
        <StatCard
          label="Total Products"
          count={productsTotal}
          icon={Package}
          isLoading={isProductsLoading}
          isError={isProductsError}
        />
        <StatCard
          label="Total Categories"
          count={categoriesCount}
          icon={Tag}
          isLoading={isCategoriesLoading}
          isError={isCategoriesError}
        />
        <StatCard
          label="Active Discounts"
          count={activeDiscountsCount}
          icon={Percent}
          isLoading={isDiscountsLoading}
          isError={isDiscountsError}
        />
        <StatCard
          label="Active Promo Codes"
          count={activePromoCodesCount}
          icon={LayoutDashboard}
          isLoading={isPromoCodesLoading}
          isError={isPromoCodesError}
        />
      </div>
    </div>
  );
};
