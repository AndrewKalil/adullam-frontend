import type { Discount } from "~services";

export interface DeleteDiscountModalProps {
  discount: Discount | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}
