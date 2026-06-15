import { useCallback } from "react";
import { Button } from "antd";
import { Pencil, Trash2 } from "lucide-react";

import styles from "./CategoryCard.module.scss";
import type { CategoryCardProps } from "./CategoryCard.types";

export const CategoryCard = (props: CategoryCardProps) => {
  const { category, onEdit, onDelete } = props;

  const onEditHandler = useCallback(() => onEdit(category), [category, onEdit]);
  const onDeleteHandler = useCallback(() => onDelete(category), [category, onDelete]);

  return (
    <div className={styles.root}>
      <div className={styles.info}>
        {category.color && (
          <div
            className={styles.colorDot}
            style={{ backgroundColor: category.color }}
          />
        )}
        <div className={styles.details}>
          <span className={styles.name}>{category.name}</span>
          {category.description && (
            <span className={styles.description}>{category.description}</span>
          )}
        </div>
      </div>
      <div className={styles.actions}>
        <Button
          type="text"
          size="small"
          icon={<Pencil className="w-4 h-4" />}
          onClick={onEditHandler}
        />
        <Button
          type="text"
          size="small"
          danger
          icon={<Trash2 className="w-4 h-4" />}
          onClick={onDeleteHandler}
        />
      </div>
    </div>
  );
};
