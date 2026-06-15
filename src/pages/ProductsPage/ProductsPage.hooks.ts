import { useCallback, useState } from "react";
import { useDebounce, useDisclosure } from "@kalortech/shared-logic";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

import {
  CATEGORIES_QUERY_KEYS,
  LOGS_QUERY_KEYS,
  PRODUCTS_QUERY_KEYS,
  createProduct,
  deleteProduct,
  getCategories,
  getProducts,
  updateProduct,
} from "~services";
import type { Product, ProductFilters, ProductInsert, ProductUpdate } from "~services";

import { PRODUCTS_PAGE_SIZE } from "./ProductsPage.constants";

export const useProductsApi = () => {
  const queryClient = useQueryClient();
  const drawerDisclosure = useDisclosure();
  const filtersDrawerDisclosure = useDisclosure();
  const deleteModalDisclosure = useDisclosure();

  const { onOpenHandler: onOpenDrawer, onCloseHandler: onCloseDrawer } = drawerDisclosure;
  const { onOpenHandler: onOpenDeleteModal, onCloseHandler: onCloseDeleteModal } = deleteModalDisclosure;

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<ProductFilters>({});
  const debouncedName = useDebounce(filters.name, 400);

  const activeFilters: ProductFilters = {
    ...filters,
    name: debouncedName,
    limit: PRODUCTS_PAGE_SIZE,
    offset: (page - 1) * PRODUCTS_PAGE_SIZE,
  };

  const { data: productsResponse, isLoading: isProductsLoading } = useQuery({
    queryKey: PRODUCTS_QUERY_KEYS.list(activeFilters as Record<string, unknown>),
    queryFn: () => getProducts(activeFilters),
    refetchOnWindowFocus: false,
  });

  const { data: categories } = useQuery({
    queryKey: CATEGORIES_QUERY_KEYS.list(),
    queryFn: getCategories,
    refetchOnWindowFocus: false,
  });

  const invalidateProducts = useCallback(() => {
    void queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEYS.all });
    void queryClient.invalidateQueries({ queryKey: LOGS_QUERY_KEYS.all });
  }, [queryClient]);

  const { mutateAsync: createProductAsync, isPending: isCreating } = useMutation({
    mutationFn: (payload: ProductInsert) => createProduct(payload),
    onSuccess: () => {
      invalidateProducts();
      void message.success("Product created");
      onCloseDrawer();
    },
    onError: (error: Error) => void message.error(error.message),
  });

  const { mutateAsync: updateProductAsync, isPending: isUpdating } = useMutation({
    mutationFn: (options: { id: string; payload: ProductUpdate }) => updateProduct(options),
    onSuccess: () => {
      invalidateProducts();
      void message.success("Product updated");
      onCloseDrawer();
    },
    onError: (error: Error) => void message.error(error.message),
  });

  const { mutateAsync: deleteProductAsync, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      invalidateProducts();
      void message.success("Product deleted");
      onCloseDeleteModal();
      setSelectedProduct(null);
    },
    onError: (error: Error) => void message.error(error.message),
  });

  const onAddHandler = useCallback(() => {
    setSelectedProduct(null);
    onOpenDrawer();
  }, [onOpenDrawer]);

  const onEditHandler = useCallback(
    (product: Product) => {
      setSelectedProduct(product);
      onOpenDrawer();
    },
    [onOpenDrawer],
  );

  const onDeleteHandler = useCallback(
    (product: Product) => {
      setSelectedProduct(product);
      onOpenDeleteModal();
    },
    [onOpenDeleteModal],
  );

  const onDrawerSubmitHandler = useCallback(
    async (values: ProductInsert) => {
      if (selectedProduct) {
        await updateProductAsync({
          id: selectedProduct.id,
          payload: values,
        });
      } else {
        await createProductAsync(values);
      }
    },
    [selectedProduct, createProductAsync, updateProductAsync],
  );

  const onDeleteConfirmHandler = useCallback(async () => {
    if (selectedProduct) {
      await deleteProductAsync(selectedProduct.id);
    }
  }, [selectedProduct, deleteProductAsync]);

  const onFiltersApplyHandler = useCallback((newFilters: ProductFilters) => {
    setFilters(newFilters);
    setPage(1);
  }, []);

  const onPageChangeHandler = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const hasActiveFilters = Object.keys(filters).some(
    (key) => filters[key as keyof ProductFilters] !== undefined,
  );

  return {
    products: productsResponse?.data,
    productsTotal: productsResponse?.total ?? 0,
    isProductsLoading,
    categories: categories ?? [],
    page,
    filters,
    hasActiveFilters,
    selectedProduct,
    drawerDisclosure,
    filtersDrawerDisclosure,
    deleteModalDisclosure,
    isCreating,
    isUpdating,
    isDeleting,
    onAddHandler,
    onEditHandler,
    onDeleteHandler,
    onDrawerSubmitHandler,
    onDeleteConfirmHandler,
    onFiltersApplyHandler,
    onPageChangeHandler,
  };
};
