import type { LogAction, LogBody } from "~services";

export interface LogItemTooltipProps {
  body: LogBody | null;
  action: LogAction;
  entityType: string;
  entityId: string;
}
