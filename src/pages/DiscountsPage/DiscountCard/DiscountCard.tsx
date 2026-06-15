import { useCallback } from "react";
import { formatDate } from "@kalortech/shared-logic";
import { Button, Tag } from "antd";
import { Pencil, Trash2 } from "lucide-react";

import styles from "./DiscountCard.module.scss";
import type { DiscountCardProps } from "./DiscountCard.types";

export const DiscountCard = (props: DiscountCardProps) => {
  const { discount, onEdit, onDelete } = props;

  const onEditHandler = useCallback(() => onEdit(discount), [discount, onEdit]);
  const onDeleteHandler = useCallback(() => onDelete(discount), [discount, onDelete]);

  return (
    <div className={styles.root}>
      {discount.imageUrl && (
        <img src={discount.imageUrl} alt={discount.name} className="w-full h-32 object-cover" />
      )}
      <div className={styles.body}>
        <div className={styles.header}>
          <span className={styles.name}>{discount.name}</span>
          <div className={styles.actions}>
            <Button type="text" size="small" icon={<Pencil className="w-4 h-4" />} onClick={onEditHandler} />
            <Button type="text" size="small" danger icon={<Trash2 className="w-4 h-4" />} onClick={onDeleteHandler} />
          </div>
        </div>

        <div className={styles.meta}>
          <span className={styles.percentage}>{discount.percentage}%</span>
          <Tag>{discount.scope === "products" ? "Products" : "Category"}</Tag>
          <Tag color={discount.isActive ? "green" : "default"}>
            {discount.isActive ? "Active" : "Inactive"}
          </Tag>
        </div>

        {(discount.startDate ?? discount.endDate) && (
          <span className={styles.dates}>
            {discount.startDate ? formatDate(discount.startDate) : "—"}
            {" → "}
            {discount.endDate ? formatDate(discount.endDate) : "ongoing"}
          </span>
        )}
      </div>
    </div>
  );
};
