import { Modal } from "antd";

import type { DeleteCategoryModalProps } from "./DeleteCategoryModal.types";

export const DeleteCategoryModal = (props: DeleteCategoryModalProps) => {
  const { category, isOpen, onClose, onConfirm, isDeleting } = props;

  return (
    <Modal
      title="Delete Category"
      open={isOpen}
      onCancel={onClose}
      onOk={onConfirm}
      okText="Delete"
      okButtonProps={{ danger: true, loading: isDeleting }}
      destroyOnHidden
    >
      <p>
        Are you sure you want to delete <strong>{category?.name}</strong>?
        This action cannot be undone.
      </p>
    </Modal>
  );
};
