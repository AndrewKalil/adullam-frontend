import type { Category, Product, ProductInsert } from "~services";

export interface ProductDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: ProductInsert) => void;
  isSubmitting: boolean;
  initialValues?: Product;
  categories: Category[];
}

export interface ProductFormValues {
  name: string;
  description: string;
  categoryId: string;
  price: number | null;
  imageUrl: string | null;
  isAvailable: boolean;
}
