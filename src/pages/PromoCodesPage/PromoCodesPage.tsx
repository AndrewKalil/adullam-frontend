import { useEffect } from "react";
import { useToolbar } from "@kalortech/shared-components";
import { Spin } from "antd";
import { Plus } from "lucide-react";

import { DeletePromoCodeModal } from "./DeletePromoCodeModal";
import { PromoCodeCard } from "./PromoCodeCard";
import { PromoCodeDrawer } from "./PromoCodeDrawer";
import { usePromoCodesApi } from "./PromoCodesPage.hooks";
import styles from "./PromoCodesPage.module.scss";

export const PromoCodesPage = () => {
  const { setToolbarItems } = useToolbar();

  const {
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
  } = usePromoCodesApi();

  useEffect(() => {
    setToolbarItems([
      {
        key: "add-promo-code",
        label: "Add Promo Code",
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
      {promoCodes && promoCodes.length > 0 ? (
        <div className={styles.cardGrid}>
          {promoCodes.map((promoCode) => (
            <PromoCodeCard
              key={promoCode.id}
              promoCode={promoCode}
              onEdit={onEditHandler}
              onDelete={onDeleteHandler}
            />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p>No promo codes yet. Click &quot;Add Promo Code&quot; to create one.</p>
        </div>
      )}

      <PromoCodeDrawer
        isOpen={drawerDisclosure.isOpen}
        onClose={drawerDisclosure.onCloseHandler}
        onSubmit={onDrawerSubmitHandler}
        isSubmitting={isCreating || isUpdating}
        initialValues={selectedPromoCode ?? undefined}
      />

      <DeletePromoCodeModal
        promoCode={selectedPromoCode}
        isOpen={deleteModalDisclosure.isOpen}
        onClose={deleteModalDisclosure.onCloseHandler}
        onConfirm={onDeleteConfirmHandler}
        isDeleting={isDeleting}
      />
    </div>
  );
};
