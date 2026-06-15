import { useQuery } from "@tanstack/react-query";

import {
  CATEGORIES_QUERY_KEYS,
  DISCOUNTS_QUERY_KEYS,
  PROMO_CODES_QUERY_KEYS,
  PRODUCTS_QUERY_KEYS,
  getCategories,
  getDiscounts,
  getProducts,
  getPromoCodes,
} from "~services";

export const useDashboardStats = () => {
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useQuery({
    queryKey: CATEGORIES_QUERY_KEYS.list(),
    queryFn: getCategories,
    refetchOnWindowFocus: false,
  });

  const {
    data: productsResponse,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useQuery({
    queryKey: PRODUCTS_QUERY_KEYS.list({}),
    queryFn: () => getProducts({ limit: 1 }),
    refetchOnWindowFocus: false,
  });

  const {
    data: discounts,
    isLoading: isDiscountsLoading,
    isError: isDiscountsError,
  } = useQuery({
    queryKey: DISCOUNTS_QUERY_KEYS.list(),
    queryFn: getDiscounts,
    refetchOnWindowFocus: false,
  });

  const {
    data: promoCodes,
    isLoading: isPromoCodesLoading,
    isError: isPromoCodesError,
  } = useQuery({
    queryKey: PROMO_CODES_QUERY_KEYS.list(),
    queryFn: getPromoCodes,
    refetchOnWindowFocus: false,
  });

  return {
    categoriesCount: categories?.length,
    isCategoriesLoading,
    isCategoriesError,

    productsTotal: productsResponse?.total,
    isProductsLoading,
    isProductsError,

    activeDiscountsCount: discounts?.filter((d) => d.isActive).length,
    isDiscountsLoading,
    isDiscountsError,

    activePromoCodesCount: promoCodes?.filter((p) => p.isActive).length,
    isPromoCodesLoading,
    isPromoCodesError,
  };
};
