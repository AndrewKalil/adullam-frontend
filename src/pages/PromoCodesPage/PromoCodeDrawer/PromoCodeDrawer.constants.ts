import { number, object, string } from "yup";

import type { PromoCodeFormValues } from "./PromoCodeDrawer.types";

export const PROMO_CODE_INITIAL_VALUES: PromoCodeFormValues = {
  code: "",
  discountType: "percentage",
  discountValue: null,
  minOrderAmount: null,
  maxUses: null,
  expiresAt: "",
  isActive: true,
};

export const PROMO_CODE_SCHEMA = object({
  code: string().required("Code is required").max(50).uppercase(),
  discountType: string().oneOf(["percentage", "fixed"]).required(),
  discountValue: number()
    .required("Discount value is required")
    .min(0, "Must be positive"),
  minOrderAmount: number().nullable().min(0),
  maxUses: number().nullable().integer().min(1),
  expiresAt: string(),
  isActive: string(),
});

export const DISCOUNT_TYPE_OPTIONS = [
  { value: "percentage", label: "Percentage" },
  { value: "fixed", label: "Fixed Amount" },
] as const;
