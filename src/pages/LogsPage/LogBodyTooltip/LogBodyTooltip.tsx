import { Tooltip } from "antd";

import styles from "./LogBodyTooltip.module.scss";
import { buildTooltipContent, getCellPreview } from "./LogBodyTooltip.utils";
import type { LogBodyTooltipProps } from "./LogBodyTooltip.types";

export const LogBodyTooltip = (props: LogBodyTooltipProps) => {
  const { body, action } = props;
  const preview = getCellPreview(body, action);

  if (!body) {
    return <span>{preview}</span>;
  }

  return (
    <Tooltip
      title={buildTooltipContent(body, action)}
      overlayStyle={{ maxWidth: 400 }}
    >
      <span className={styles.preview}>{preview}</span>
    </Tooltip>
  );
};
