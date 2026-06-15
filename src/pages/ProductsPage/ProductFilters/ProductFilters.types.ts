import type { Category, ProductFilters } from "~services";

export interface ProductFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: ProductFilters) => void;
  currentFilters: ProductFilters;
  categories: Category[];
}

export interface ProductFiltersFormValues {
  name: string;
  categoryId: string;
  priceMin: number | null;
  priceMax: number | null;
  createdFrom: string;
  createdTo: string;
}
