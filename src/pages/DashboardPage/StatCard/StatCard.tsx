import { Spin } from "antd";

import styles from "./StatCard.module.scss";
import type { StatCardProps } from "./StatCard.types";

export const StatCard = (props: StatCardProps) => {
  const { label, count, icon: Icon, isLoading, isError } = props;

  return (
    <div className={styles.root}>
      <div className={styles.iconWrapper}>
        <Icon className="w-6 h-6 text-blue-500" />
      </div>
      <div className={styles.content}>
        <span className={styles.label}>{label}</span>
        {isLoading && <Spin size="small" />}
        {isError && <span className={styles.error}>Error</span>}
        {!isLoading && !isError && (
          <span className={styles.count}>{count ?? 0}</span>
        )}
      </div>
    </div>
  );
};
