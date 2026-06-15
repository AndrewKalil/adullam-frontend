import { number, object, string } from "yup";

import type { DiscountFormValues } from "./DiscountDrawer.types";

export const DISCOUNT_INITIAL_VALUES: DiscountFormValues = {
  name: "",
  description: "",
  percentage: null,
  scope: "products",
  categoryId: "",
  productIds: [],
  isActive: true,
  startDate: "",
  endDate: "",
  imageUrl: null,
};

export const DISCOUNT_SCHEMA = object({
  name: string().required("Name is required").max(200),
  description: string().max(500),
  percentage: number()
    .required("Percentage is required")
    .min(1, "Must be at least 1%")
    .max(100, "Cannot exceed 100%"),
  scope: string().oneOf(["products", "category"]).required(),
  categoryId: string(),
  isActive: string(),
  startDate: string(),
  endDate: string(),
  imageUrl: string().nullable(),
});

export const SCOPE_OPTIONS = [
  { value: "products", label: "Products" },
  { value: "category", label: "Category" },
] as const;
