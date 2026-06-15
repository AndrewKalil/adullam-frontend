import type { ReactNode } from "react";

import { LOG_ACTION_CREATE, LOG_ACTION_DELETE, LOG_ACTION_UPDATE } from "~services";

import { EXCLUDED_FIELDS, FIELD_LABEL_MAP } from "./LogBodyTooltip.constants";
import styles from "./LogBodyTooltip.module.scss";
import type { ChangedField, LogBodyTooltipProps } from "./LogBodyTooltip.types";

export const humanizeFieldName = (snakeKey: string): string => {
  if (FIELD_LABEL_MAP[snakeKey]) return FIELD_LABEL_MAP[snakeKey];
  return snakeKey
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
};

export const filterSystemFields = (
  record: Record<string, unknown>,
): Record<string, unknown> =>
  Object.fromEntries(
    Object.entries(record).filter(([key]) => !EXCLUDED_FIELDS.has(key)),
  );

export const getChangedFields = (
  oldRecord: Record<string, unknown>,
  newRecord: Record<string, unknown>,
): ChangedField[] => {
  const allKeys = new Set([...Object.keys(oldRecord), ...Object.keys(newRecord)]);
  const changed: ChangedField[] = [];
  for (const key of allKeys) {
    if (EXCLUDED_FIELDS.has(key)) continue;
    if (String(oldRecord[key]) !== String(newRecord[key])) {
      changed.push({ key, oldValue: oldRecord[key], newValue: newRecord[key] });
    }
  }
  return changed;
};

export const formatFieldValue = (value: unknown): string => {
  if (value === null || value === undefined) return "--";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
};

export const getCellPreview = (
  body: LogBodyTooltipProps["body"],
  action: LogBodyTooltipProps["action"],
): string => {
  if (action === LOG_ACTION_CREATE) return "Created";
  if (action === LOG_ACTION_DELETE) return "Deleted";

  if (action === LOG_ACTION_UPDATE && body?.old && body?.new) {
    const changed = getChangedFields(body.old, body.new);
    return changed.length === 1
      ? "1 field changed"
      : `${changed.length} fields changed`;
  }

  return "—";
};

export const buildTooltipContent = (
  body: NonNullable<LogBodyTooltipProps["body"]>,
  action: LogBodyTooltipProps["action"],
): ReactNode => {
  if (action === LOG_ACTION_CREATE && body.new) {
    const fields = filterSystemFields(body.new);
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
  }

  if (action === LOG_ACTION_DELETE && body.old) {
    const fields = filterSystemFields(body.old);
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
  }

  if (action === LOG_ACTION_UPDATE && body.old && body.new) {
    const changed = getChangedFields(body.old, body.new);
    return (
      <ul className={styles.list}>
        {changed.map(({ key, oldValue, newValue }) => (
          <li key={key}>
            <span className={styles.fieldLabel}>{humanizeFieldName(key)}:</span>{" "}
            {formatFieldValue(oldValue)} → {formatFieldValue(newValue)}
          </li>
        ))}
      </ul>
    );
  }

  return <span>No details</span>;
};
