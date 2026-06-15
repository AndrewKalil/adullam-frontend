import { useCallback } from "react";
import { MdEditor } from "@kalortech/shared-components";
import { Button, Tag, Tooltip } from "antd";
import { Pencil, Trash2 } from "lucide-react";

import styles from "./ProductCard.module.scss";
import { getContrastTextColor } from "./ProductCard.utils";
import type { ProductCardProps } from "./ProductCard.types";

export const ProductCard = (props: ProductCardProps) => {
  const { product, onEdit, onDelete } = props;

  const onEditHandler = useCallback(() => onEdit(product), [product, onEdit]);
  const onDeleteHandler = useCallback(() => onDelete(product), [product, onDelete]);

  const discountedPrice =
    product.discount !== null && product.discount.percentage > 0
      ? product.price * (1 - product.discount.percentage / 100)
      : null;

  return (
    <div className={styles.root}>
      {product.imageUrl ? (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-40 object-cover"
        />
      ) : (
        <div className={styles.imagePlaceholder}>
          <span className={styles.imagePlaceholderText}>No image</span>
        </div>
      )}

      <div className={styles.body}>
        <div className={styles.header}>
          <span className={styles.name}>{product.name}</span>
          <div className={styles.actions}>
            <Button type="text" size="small" icon={<Pencil className="w-4 h-4" />} onClick={onEditHandler} />
            <Button type="text" size="small" danger icon={<Trash2 className="w-4 h-4" />} onClick={onDeleteHandler} />
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.priceBlock}>
            {discountedPrice !== null ? (
              <>
                <span className={styles.originalPrice}>${Number(product.price).toFixed(2)}</span>
                <span className={styles.discountedPrice}>${discountedPrice.toFixed(2)}</span>
                <span className={styles.discountBadge}>-{product.discount?.percentage}%</span>
              </>
            ) : (
              <span className={styles.price}>${Number(product.price).toFixed(2)}</span>
            )}
          </div>
          <Tag color={product.isAvailable ? "green" : "default"}>
            {product.isAvailable ? "Available" : "Unavailable"}
          </Tag>
        </div>

        {product.category !== null && (
          <Tag
            className={styles.categoryTag}
            style={
              product.category.color !== null
                ? {
                    backgroundColor: product.category.color,
                    color: getContrastTextColor(product.category.color),
                    borderColor: product.category.color,
                  }
                : undefined
            }
          >
            {product.category.name}
          </Tag>
        )}

        {product.description && (
          <Tooltip
            title={<MdEditor name="description" value={product.description} isReadonly />}
            placement="bottom"
            overlayStyle={{ maxWidth: 360 }}
            overlayClassName="md-tooltip"
          >
            <div className={styles.descriptionPreview}>
              <MdEditor name="description" value={product.description} isReadonly />
            </div>
          </Tooltip>
        )}
      </div>
    </div>
  );
};
