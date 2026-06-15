import { Tooltip } from "antd";

import { LOG_ACTION_DELETE } from "~services";

import styles from "../LogBodyTooltip/LogBodyTooltip.module.scss";
import {
  buildItemTooltipContent,
  getItemPreview,
} from "./LogItemTooltip.utils";
import type { LogItemTooltipProps } from "./LogItemTooltip.types";

export const LogItemTooltip = (props: LogItemTooltipProps) => {
  const { body, action, entityType, entityId } = props;
  const preview = getItemPreview(body, action, entityType, entityId);
  const snapshot = body
    ? action === LOG_ACTION_DELETE
      ? body.old
      : body.new
    : undefined;

  if (!snapshot) {
    return <span>{preview}</span>;
  }

  return (
    <Tooltip
      title={buildItemTooltipContent(body!, action)}
      overlayStyle={{ maxWidth: 400 }}
    >
      <span className={styles.preview}>{preview}</span>
    </Tooltip>
  );
};
