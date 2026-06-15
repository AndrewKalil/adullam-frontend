export const LOG_ACTION_CREATE = "create";
export const LOG_ACTION_UPDATE = "update";
export const LOG_ACTION_DELETE = "delete";

export const LOGS_QUERY_KEYS = {
  all: ["logs"],
  list: (filters: Record<string, unknown>) => ["logs", "list", filters],
} as const;
