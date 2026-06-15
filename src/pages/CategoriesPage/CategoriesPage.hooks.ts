import { useCallback, useState } from "react";
import { useDisclosure } from "@kalortech/shared-logic";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

import {
  CATEGORIES_QUERY_KEYS,
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "~services";
import type { Category, CategoryInsert, CategoryUpdate } from "~services";

export const useCategoriesApi = () => {
  const queryClient = useQueryClient();
  const {
    isOpen: isDrawerOpen,
    onOpenHandler: onOpenDrawer,
    onCloseHandler: onCloseDrawer,
  } = useDisclosure();
  const {
    isOpen: isDeleteModalOpen,
    onOpenHandler: onOpenDeleteModal,
    onCloseHandler: onCloseDeleteModal,
  } = useDisclosure();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const { data: categories, isLoading } = useQuery({
    queryKey: CATEGORIES_QUERY_KEYS.list(),
    queryFn: getCategories,
    refetchOnWindowFocus: false,
  });

  const invalidateCategories = useCallback(() => {
    void queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEYS.all });
  }, [queryClient]);

  const { mutateAsync: createCategoryAsync, isPending: isCreating } = useMutation({
    mutationFn: (payload: CategoryInsert) => createCategory(payload),
    onSuccess: () => {
      invalidateCategories();
      void message.success("Category created");
      onCloseDrawer();
    },
    onError: (error: Error) => void message.error(error.message),
  });

  const { mutateAsync: updateCategoryAsync, isPending: isUpdating } = useMutation({
    mutationFn: (options: { id: string; payload: CategoryUpdate }) =>
      updateCategory(options),
    onSuccess: () => {
      invalidateCategories();
      void message.success("Category updated");
      onCloseDrawer();
    },
    onError: (error: Error) => void message.error(error.message),
  });

  const { mutateAsync: deleteCategoryAsync, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: () => {
      invalidateCategories();
      void message.success("Category deleted");
      onCloseDeleteModal();
      setSelectedCategory(null);
    },
    onError: (error: Error) => void message.error(error.message),
  });

  const onAddHandler = useCallback(() => {
    setSelectedCategory(null);
    onOpenDrawer();
  }, [onOpenDrawer]);

  const onEditHandler = useCallback(
    (category: Category) => {
      setSelectedCategory(category);
      onOpenDrawer();
    },
    [onOpenDrawer],
  );

  const onDeleteHandler = useCallback(
    (category: Category) => {
      setSelectedCategory(category);
      onOpenDeleteModal();
    },
    [onOpenDeleteModal],
  );

  const onDrawerSubmitHandler = useCallback(
    async (values: CategoryInsert) => {
      if (selectedCategory) {
        await updateCategoryAsync({
          id: selectedCategory.id,
          payload: values,
        });
      } else {
        await createCategoryAsync(values);
      }
    },
    [selectedCategory, createCategoryAsync, updateCategoryAsync],
  );

  const onDeleteConfirmHandler = useCallback(async () => {
    if (selectedCategory) {
      await deleteCategoryAsync(selectedCategory.id);
    }
  }, [selectedCategory, deleteCategoryAsync]);

  return {
    categories,
    isLoading,
    selectedCategory,
    isDrawerOpen,
    onCloseDrawer,
    isDeleteModalOpen,
    onCloseDeleteModal,
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
