import { Modal } from "antd";

import type { DeleteDiscountModalProps } from "./DeleteDiscountModal.types";

export const DeleteDiscountModal = (props: DeleteDiscountModalProps) => {
  const { discount, isOpen, onClose, onConfirm, isDeleting } = props;

  return (
    <Modal
      title="Delete Discount"
      open={isOpen}
      onCancel={onClose}
      onOk={onConfirm}
      okText="Delete"
      okButtonProps={{ danger: true, loading: isDeleting }}
      destroyOnHidden
    >
      <p>
        Are you sure you want to delete <strong>{discount?.name}</strong>?
        This action cannot be undone.
      </p>
    </Modal>
  );
};
