import type { LogAction, LogBody } from "~services";

export interface LogBodyTooltipProps {
  body: LogBody | null;
  action: LogAction;
}

export interface ChangedField {
  key: string;
  oldValue: unknown;
  newValue: unknown;
}
