import type { DiscountType, PromoCode, PromoCodeInsert } from "~services";

export interface PromoCodeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: PromoCodeInsert) => void | Promise<void>;
  isSubmitting: boolean;
  initialValues?: PromoCode;
}

export interface PromoCodeFormValues {
  code: string;
  discountType: DiscountType;
  discountValue: number | null;
  minOrderAmount: number | null;
  maxUses: number | null;
  expiresAt: string;
  isActive: boolean;
}
