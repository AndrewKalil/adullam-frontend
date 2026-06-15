import type { PromoCode } from "~services";

export interface PromoCodeCardProps {
  promoCode: PromoCode;
  onEdit: (promoCode: PromoCode) => void;
  onDelete: (promoCode: PromoCode) => void;
}
