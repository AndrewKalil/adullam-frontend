import type { Category, CategoryInsert } from "~services";

export interface CategoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: CategoryInsert) => void;
  isSubmitting: boolean;
  initialValues?: Category;
}

export interface CategoryFormValues {
  name: string;
  description: string;
  color: string;
}
