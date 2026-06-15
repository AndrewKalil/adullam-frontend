export type DiscountType = "percentage" | "fixed";

export interface PromoCode {
  id: string;
  code: string;
  discountType: DiscountType;
  discountValue: number;
  minOrderAmount: number | null;
  maxUses: number | null;
  currentUses: number;
  expiresAt: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type PromoCodeInsert = Pick<PromoCode, "code" | "discountType" | "discountValue"> &
  Partial<Pick<PromoCode, "minOrderAmount" | "maxUses" | "expiresAt" | "isActive">>;

export type PromoCodeUpdate = Partial<PromoCodeInsert>;
