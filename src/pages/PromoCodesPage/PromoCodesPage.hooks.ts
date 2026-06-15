import { useCallback, useState } from "react";
import { useDisclosure } from "@kalortech/shared-logic";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

import {
  LOGS_QUERY_KEYS,
  PROMO_CODES_QUERY_KEYS,
  createPromoCode,
  deletePromoCode,
  getPromoCodes,
  updatePromoCode,
} from "~services";
import type { PromoCode, PromoCodeInsert, PromoCodeUpdate } from "~services";

export const usePromoCodesApi = () => {
  const queryClient = useQueryClient();
  const drawerDisclosure = useDisclosure();
  const deleteModalDisclosure = useDisclosure();
  const { onOpenHandler: onOpenDrawer, onCloseHandler: onCloseDrawer } = drawerDisclosure;
  const { onOpenHandler: onOpenDeleteModal, onCloseHandler: onCloseDeleteModal } = deleteModalDisclosure;
  const [selectedPromoCode, setSelectedPromoCode] = useState<PromoCode | null>(null);

  const { data: promoCodes, isLoading } = useQuery({
    queryKey: PROMO_CODES_QUERY_KEYS.list(),
    queryFn: getPromoCodes,
    refetchOnWindowFocus: false,
  });

  const invalidatePromoCodes = useCallback(() => {
    void queryClient.invalidateQueries({ queryKey: PROMO_CODES_QUERY_KEYS.all });
    void queryClient.invalidateQueries({ queryKey: LOGS_QUERY_KEYS.all });
  }, [queryClient]);

  const { mutateAsync: createPromoCodeAsync, isPending: isCreating } = useMutation({
    mutationFn: (payload: PromoCodeInsert) => createPromoCode(payload),
    onSuccess: () => {
      invalidatePromoCodes();
      void message.success("Promo code created");
      onCloseDrawer();
    },
    onError: (error: Error) => void message.error(error.message),
  });

  const { mutateAsync: updatePromoCodeAsync, isPending: isUpdating } = useMutation({
    mutationFn: (options: { id: string; payload: PromoCodeUpdate }) =>
      updatePromoCode(options),
    onSuccess: () => {
      invalidatePromoCodes();
      void message.success("Promo code updated");
      onCloseDrawer();
    },
    onError: (error: Error) => void message.error(error.message),
  });

  const { mutateAsync: deletePromoCodeAsync, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => deletePromoCode(id),
    onSuccess: () => {
      invalidatePromoCodes();
      void message.success("Promo code deleted");
      onCloseDeleteModal();
      setSelectedPromoCode(null);
    },
    onError: (error: Error) => void message.error(error.message),
  });

  const onAddHandler = useCallback(() => {
    setSelectedPromoCode(null);
    onOpenDrawer();
  }, [onOpenDrawer]);

  const onEditHandler = useCallback(
    (promoCode: PromoCode) => {
      setSelectedPromoCode(promoCode);
      onOpenDrawer();
    },
    [onOpenDrawer],
  );

  const onDeleteHandler = useCallback(
    (promoCode: PromoCode) => {
      setSelectedPromoCode(promoCode);
      onOpenDeleteModal();
    },
    [onOpenDeleteModal],
  );

  const onDrawerSubmitHandler = useCallback(
    async (values: PromoCodeInsert) => {
      if (selectedPromoCode) {
        await updatePromoCodeAsync({
          id: selectedPromoCode.id,
          payload: values,
        });
      } else {
        await createPromoCodeAsync(values);
      }
    },
    [selectedPromoCode, createPromoCodeAsync, updatePromoCodeAsync],
  );

  const onDeleteConfirmHandler = useCallback(async () => {
    if (selectedPromoCode) {
      await deletePromoCodeAsync(selectedPromoCode.id);
    }
  }, [selectedPromoCode, deletePromoCodeAsync]);

  return {
    promoCodes,
    isLoading,
    selectedPromoCode,
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
