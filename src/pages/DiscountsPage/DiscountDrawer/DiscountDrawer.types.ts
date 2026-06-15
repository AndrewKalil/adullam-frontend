import type { Category, Discount, DiscountInsert, DiscountScope, Product } from "~services";

export interface DiscountDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: DiscountInsert) => void;
  isSubmitting: boolean;
  initialValues?: Discount;
  categories: Category[];
  products: Product[];
}

export interface DiscountFormValues {
  name: string;
  description: string;
  percentage: number | null;
  scope: DiscountScope;
  categoryId: string;
  productIds: string[];
  isActive: boolean;
  startDate: string;
  endDate: string;
  imageUrl: string | null;
}
