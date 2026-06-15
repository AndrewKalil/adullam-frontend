import { LOG_ACTION_CREATE, LOG_ACTION_DELETE, LOG_ACTION_UPDATE } from "~services";

export const ACTION_OPTIONS = [
  { value: LOG_ACTION_CREATE, label: "Create" },
  { value: LOG_ACTION_UPDATE, label: "Update" },
  { value: LOG_ACTION_DELETE, label: "Delete" },
];

export const ENTITY_TYPE_OPTIONS = [
  { value: "categories", label: "Categories" },
  { value: "products", label: "Products" },
  { value: "discounts", label: "Discounts" },
  { value: "promo_codes", label: "Promo Codes" },
];
