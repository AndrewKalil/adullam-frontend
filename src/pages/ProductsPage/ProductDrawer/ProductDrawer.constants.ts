import { boolean, number, object, string } from "yup";

import type { ProductFormValues } from "./ProductDrawer.types";

export const PRODUCT_INITIAL_VALUES: ProductFormValues = {
  name: "",
  description: "",
  categoryId: "",
  price: null,
  imageUrl: null,
  isAvailable: true,
};

export const PRODUCT_SCHEMA = object({
  name: string().required("Name is required").max(200),
  description: string().max(1000),
  categoryId: string(),
  price: number().required("Price is required").min(0, "Price must be 0 or greater"),
  imageUrl: string().nullable(),
  isAvailable: boolean(),
});
