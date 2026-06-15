import type { ProductFiltersFormValues } from "./ProductFilters.types";

export const FILTERS_INITIAL_VALUES: ProductFiltersFormValues = {
  name: "",
  categoryId: "",
  priceMin: null,
  priceMax: null,
  createdFrom: "",
  createdTo: "",
};
