import { useCallback, useState } from "react";
import { useDisclosure } from "@kalortech/shared-logic";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

import {
  CATEGORIES_QUERY_KEYS,
  DISCOUNTS_QUERY_KEYS,
  LOGS_QUERY_KEYS,
  PRODUCTS_QUERY_KEYS,
  createDiscount,
  deleteDiscount,
  getCategories,
  getDiscounts,
  getProducts,
  updateDiscount,
} from "~services";
import type { Discount, DiscountInsert, DiscountUpdate } from "~services";

export const useDiscountsApi = () => {
  const queryClient = useQueryClient();
  const drawerDisclosure = useDisclosure();
  const deleteModalDisclosure = useDisclosure();
  const { onOpenHandler: onOpenDrawer, onCloseHandler: onCloseDrawer } =
    drawerDisclosure;
  const {
    onOpenHandler: onOpenDeleteModal,
    onCloseHandler: onCloseDeleteModal,
  } = deleteModalDisclosure;
  const [selectedDiscount, setSelectedDiscount] = useState<Discount | null>(
    null,
  );

  const { data: discounts, isLoading } = useQuery({
    queryKey: DISCOUNTS_QUERY_KEYS.list(),
    queryFn: getDiscounts,
    refetchOnWindowFocus: false,
  });

  const { data: categories } = useQuery({
    queryKey: CATEGORIES_QUERY_KEYS.list(),
    queryFn: getCategories,
    refetchOnWindowFocus: false,
  });

  const { data: productsResponse } = useQuery({
    queryKey: PRODUCTS_QUERY_KEYS.list({ limit: 100 }),
    queryFn: () => getProducts({ limit: 100 }),
    refetchOnWindowFocus: false,
  });

  const invalidateDiscounts = useCallback(() => {
    void queryClient.invalidateQueries({ queryKey: DISCOUNTS_QUERY_KEYS.all });
    void queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEYS.all });
    void queryClient.invalidateQueries({ queryKey: LOGS_QUERY_KEYS.all });
  }, [queryClient]);

  const { mutateAsync: createDiscountAsync, isPending: isCreating } =
    useMutation({
      mutationFn: (payload: DiscountInsert) => createDiscount(payload),
      onSuccess: () => {
        invalidateDiscounts();
        void message.success("Discount created");
        onCloseDrawer();
      },
      onError: (error: Error) => void message.error(error.message),
    });

  const { mutateAsync: updateDiscountAsync, isPending: isUpdating } =
    useMutation({
      mutationFn: (options: { id: string; payload: DiscountUpdate }) =>
        updateDiscount(options),
      onSuccess: () => {
        invalidateDiscounts();
        void message.success("Discount updated");
        onCloseDrawer();
      },
      onError: (error: Error) => void message.error(error.message),
    });

  const { mutateAsync: deleteDiscountAsync, isPending: isDeleting } =
    useMutation({
      mutationFn: (id: string) => deleteDiscount(id),
      onSuccess: () => {
        invalidateDiscounts();
        void message.success("Discount deleted");
        onCloseDeleteModal();
        setSelectedDiscount(null);
      },
      onError: (error: Error) => void message.error(error.message),
    });

  const onAddHandler = useCallback(() => {
    setSelectedDiscount(null);
    onOpenDrawer();
  }, [onOpenDrawer]);

  const onEditHandler = useCallback(
    (discount: Discount) => {
      setSelectedDiscount(discount);
      onOpenDrawer();
    },
    [onOpenDrawer],
  );

  const onDeleteHandler = useCallback(
    (discount: Discount) => {
      setSelectedDiscount(discount);
      onOpenDeleteModal();
    },
    [onOpenDeleteModal],
  );

  const onDrawerSubmitHandler = useCallback(
    async (values: DiscountInsert) => {
      if (selectedDiscount) {
        await updateDiscountAsync({ id: selectedDiscount.id, payload: values });
      } else {
        await createDiscountAsync(values);
      }
    },
    [selectedDiscount, createDiscountAsync, updateDiscountAsync],
  );

  const onDeleteConfirmHandler = useCallback(async () => {
    if (selectedDiscount) {
      await deleteDiscountAsync(selectedDiscount.id);
    }
  }, [selectedDiscount, deleteDiscountAsync]);

  return {
    discounts,
    isLoading,
    categories: categories ?? [],
    products: productsResponse?.data ?? [],
    selectedDiscount,
    drawerDisclosure,
    deleteModalDisclosure,
    isCreating,
    isUpdating,
    isDeleting,
    onAddHandler,
    onEditHandler,
    onDeleteHandler,
    onDrawerSubmitHandler,
    onDeleteConfirmHandler,
  };
};
