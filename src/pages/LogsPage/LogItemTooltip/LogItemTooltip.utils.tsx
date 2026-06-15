import type { ReactNode } from "react";

import { LOG_ACTION_DELETE } from "~services";

import styles from "../LogBodyTooltip/LogBodyTooltip.module.scss";
import { formatFieldValue, humanizeFieldName } from "../LogBodyTooltip/LogBodyTooltip.utils";
import { humanizeEntityType } from "../LogsPage.utils";
import type { LogItemTooltipProps } from "./LogItemTooltip.types";

const ITEM_EXCLUDED_FIELDS = new Set(["tenant_id", "deleted_at"]);

const filterItemFields = (record: Record<string, unknown>): Record<string, unknown> =>
  Object.fromEntries(
    Object.entries(record).filter(([key]) => !ITEM_EXCLUDED_FIELDS.has(key)),
  );

export const getItemPreview = (
  body: LogItemTooltipProps["body"],
  action: LogItemTooltipProps["action"],
  entityType: string,
  entityId: string,
): string => {
  const snapshot = body
    ? action === LOG_ACTION_DELETE
      ? body.old
      : body.new
    : undefined;
  const label = humanizeEntityType(entityType);
  const name = snapshot?.name;
  return typeof name === "string" && name.length > 0
    ? `${label}: ${name}`
    : `${label}: ${entityId}`;
};

export const buildItemTooltipContent = (
  body: NonNullable<LogItemTooltipProps["body"]>,
  action: LogItemTooltipProps["action"],
): ReactNode => {
  const snapshot = action === LOG_ACTION_DELETE ? body.old : body.new;
  if (!snapshot) return <span>No details</span>;
  const fields = filterItemFields(snapshot);
  return (
    <ul className={styles.list}>
      {Object.entries(fields).map(([key, value]) => (
        <li key={key}>
          <span className={styles.fieldLabel}>{humanizeFieldName(key)}:</span>{" "}
          {formatFieldValue(value)}
        </li>
      ))}
    </ul>
  );
};
