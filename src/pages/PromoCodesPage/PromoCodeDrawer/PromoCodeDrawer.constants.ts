import { boolean, number, object, string } from "yup";

import { DISCOUNT_TYPE_FIXED, DISCOUNT_TYPE_PERCENTAGE } from "~services";

import type { PromoCodeFormValues } from "./PromoCodeDrawer.types";

export const PROMO_CODE_INITIAL_VALUES: PromoCodeFormValues = {
  code: "",
  discountType: DISCOUNT_TYPE_PERCENTAGE,
  discountValue: null,
  minOrderAmount: null,
  maxUses: null,
  expiresAt: "",
  isActive: true,
};

export const PROMO_CODE_SCHEMA = object({
  code: string().required("Code is required").max(50).uppercase(),
  discountType: string().oneOf([DISCOUNT_TYPE_PERCENTAGE, DISCOUNT_TYPE_FIXED]).required(),
  discountValue: number()
    .required("Discount value is required")
    .min(0, "Must be positive"),
  minOrderAmount: number().nullable().min(0),
  maxUses: number().nullable().integer().min(1),
  expiresAt: string(),
  isActive: boolean(),
});

export const DISCOUNT_TYPE_OPTIONS = [
  { value: DISCOUNT_TYPE_PERCENTAGE, label: "Percentage" },
  { value: DISCOUNT_TYPE_FIXED, label: "Fixed Amount" },
] as const;
