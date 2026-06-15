import { useCallback } from "react";
import { formatDateTime } from "@kalortech/shared-logic";
import { Button, Tag } from "antd";
import { Pencil, Trash2 } from "lucide-react";

import { DISCOUNT_TYPE_PERCENTAGE } from "~services";

import styles from "./PromoCodeCard.module.scss";
import type { PromoCodeCardProps } from "./PromoCodeCard.types";

export const PromoCodeCard = (props: PromoCodeCardProps) => {
  const { promoCode, onEdit, onDelete } = props;

  const onEditHandler = useCallback(() => onEdit(promoCode), [promoCode, onEdit]);
  const onDeleteHandler = useCallback(() => onDelete(promoCode), [promoCode, onDelete]);

  const discountLabel =
    promoCode.discountType === DISCOUNT_TYPE_PERCENTAGE
      ? `${promoCode.discountValue}% off`
      : `$${Number(promoCode.discountValue).toFixed(2)} off`;

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <code className={styles.code}>{promoCode.code}</code>
        <div className={styles.actions}>
          <Button type="text" size="small" icon={<Pencil className="w-4 h-4" />} onClick={onEditHandler} />
          <Button type="text" size="small" danger icon={<Trash2 className="w-4 h-4" />} onClick={onDeleteHandler} />
        </div>
      </div>

      <div className={styles.tags}>
        <Tag color="blue">{discountLabel}</Tag>
        <Tag color={promoCode.isActive ? "green" : "default"}>
          {promoCode.isActive ? "Active" : "Inactive"}
        </Tag>
      </div>

      <div className={styles.meta}>
        {promoCode.minOrderAmount !== null && (
          <span>Min order: ${Number(promoCode.minOrderAmount).toFixed(2)}</span>
        )}
        {promoCode.expiresAt && (
          <span>Expires: {formatDateTime(promoCode.expiresAt)}</span>
        )}
        <span>
          Uses: {promoCode.currentUses}
          {promoCode.maxUses !== null ? ` / ${promoCode.maxUses}` : ""}
        </span>
      </div>
    </div>
  );
};
