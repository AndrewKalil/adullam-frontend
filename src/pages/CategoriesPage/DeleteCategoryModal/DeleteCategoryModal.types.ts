import type { Category } from "~services";

export interface DeleteCategoryModalProps {
  category: Category | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}
