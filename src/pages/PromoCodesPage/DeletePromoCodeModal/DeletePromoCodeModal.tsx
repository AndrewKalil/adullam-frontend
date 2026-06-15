import { Modal } from "antd";

import type { DeletePromoCodeModalProps } from "./DeletePromoCodeModal.types";

export const DeletePromoCodeModal = (props: DeletePromoCodeModalProps) => {
  const { promoCode, isOpen, onClose, onConfirm, isDeleting } = props;

  return (
    <Modal
      title="Delete Promo Code"
      open={isOpen}
      onCancel={onClose}
      onOk={onConfirm}
      okText="Delete"
      okButtonProps={{ danger: true, loading: isDeleting }}
      destroyOnHidden
    >
      <p>
        Are you sure you want to delete promo code <strong>{promoCode?.code}</strong>?
        This action cannot be undone.
      </p>
    </Modal>
  );
};
