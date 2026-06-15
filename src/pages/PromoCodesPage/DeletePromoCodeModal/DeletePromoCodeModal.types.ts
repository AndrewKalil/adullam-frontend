import type { PromoCode } from "~services";

export interface DeletePromoCodeModalProps {
  promoCode: PromoCode | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}
