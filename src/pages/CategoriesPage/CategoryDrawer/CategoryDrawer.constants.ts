import { object, string } from "yup";

import type { CategoryFormValues } from "./CategoryDrawer.types";

export const CATEGORY_INITIAL_VALUES: CategoryFormValues = {
  name: "",
  description: "",
  color: "",
};

export const CATEGORY_SCHEMA = object({
  name: string().required("Name is required").max(100),
  description: string().max(500),
  color: string().matches(/^(#[0-9a-fA-F]{6})?$/, "Must be a hex color (e.g. #FF5733)"),
});
