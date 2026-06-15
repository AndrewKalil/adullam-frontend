import { Modal } from "antd";

import type { DeleteProductModalProps } from "./DeleteProductModal.types";

export const DeleteProductModal = (props: DeleteProductModalProps) => {
  const { product, isOpen, onClose, onConfirm, isDeleting } = props;

  return (
    <Modal
      title="Delete Product"
      open={isOpen}
      onCancel={onClose}
      onOk={onConfirm}
      okText="Delete"
      okButtonProps={{ danger: true, loading: isDeleting }}
      destroyOnHidden
    >
      <p>
        Are you sure you want to delete <strong>{product?.name}</strong>?
        This action cannot be undone.
      </p>
    </Modal>
  );
};
