import { useEffect } from "react";
import { useToolbar } from "@kalortech/shared-components";
import { Spin } from "antd";
import { Plus } from "lucide-react";

import { useCategoriesApi } from "./CategoriesPage.hooks";
import styles from "./CategoriesPage.module.scss";
import { CategoryCard } from "./CategoryCard";
import { CategoryDrawer } from "./CategoryDrawer";
import { DeleteCategoryModal } from "./DeleteCategoryModal";

export const CategoriesPage = () => {
  const { setToolbarItems } = useToolbar();

  const {
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
  } = useCategoriesApi();

  useEffect(() => {
    setToolbarItems([
      {
        key: "add-category",
        label: "Add Category",
        Icon: Plus,
        type: "primary",
        onClick: onAddHandler,
      },
    ]);
    return () => setToolbarItems([]);
  }, [setToolbarItems, onAddHandler]);

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className={styles.root}>
      {categories && categories.length > 0 ? (
        <div className={styles.cardsGrid}>
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onEdit={onEditHandler}
              onDelete={onDeleteHandler}
            />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p>No categories yet. Click &quot;Add Category&quot; to create one.</p>
        </div>
      )}

      <CategoryDrawer
        isOpen={isDrawerOpen}
        onClose={onCloseDrawer}
        onSubmit={onDrawerSubmitHandler}
        isSubmitting={isCreating || isUpdating}
        initialValues={selectedCategory ?? undefined}
      />

      <DeleteCategoryModal
        category={selectedCategory}
        isOpen={isDeleteModalOpen}
        onClose={onCloseDeleteModal}
        onConfirm={onDeleteConfirmHandler}
        isDeleting={isDeleting}
      />
    </div>
  );
};
