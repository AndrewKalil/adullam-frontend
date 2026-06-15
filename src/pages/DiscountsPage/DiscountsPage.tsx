import { useEffect } from "react";
import { useToolbar } from "@kalortech/shared-components";
import { Spin } from "antd";
import { Plus } from "lucide-react";

import { DeleteDiscountModal } from "./DeleteDiscountModal";
import { DiscountCard } from "./DiscountCard";
import { DiscountDrawer } from "./DiscountDrawer";
import { useDiscountsApi } from "./DiscountsPage.hooks";
import styles from "./DiscountsPage.module.scss";

export const DiscountsPage = () => {
  const { setToolbarItems } = useToolbar();

  const {
    discounts,
    isLoading,
    categories,
    products,
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
  } = useDiscountsApi();

  useEffect(() => {
    setToolbarItems([
      {
        key: "add-discount",
        label: "Add Discount",
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
      {discounts && discounts.length > 0 ? (
        <div className={styles.cardGrid}>
          {discounts.map((discount) => (
            <DiscountCard
              key={discount.id}
              discount={discount}
              onEdit={onEditHandler}
              onDelete={onDeleteHandler}
            />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p>No discounts yet. Click "Add Discount" to create one.</p>
        </div>
      )}

      <DiscountDrawer
        isOpen={drawerDisclosure.isOpen}
        onClose={drawerDisclosure.onCloseHandler}
        onSubmit={onDrawerSubmitHandler}
        isSubmitting={isCreating || isUpdating}
        initialValues={selectedDiscount ?? undefined}
        categories={categories}
        products={products}
      />

      <DeleteDiscountModal
        discount={selectedDiscount}
        isOpen={deleteModalDisclosure.isOpen}
        onClose={deleteModalDisclosure.onCloseHandler}
        onConfirm={onDeleteConfirmHandler}
        isDeleting={isDeleting}
      />
    </div>
  );
};
