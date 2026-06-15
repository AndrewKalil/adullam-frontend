export type LogAction = "create" | "update" | "delete";

export interface LogBody {
  old?: Record<string, unknown>;
  new?: Record<string, unknown>;
}

export interface LogEntry {
  id: string;
  createdAt: string;
  tenantId: string | null;
  userId: string | null;
  entityType: string;
  entityId: string;
  action: LogAction;
  body: LogBody | null;
  userEmail: string | null;
}

export interface LogListResponse {
  data: LogEntry[];
  total: number;
  limit: number;
  offset: number;
}

export interface LogFilters {
  action?: LogAction;
  entityType?: string;
  createdFrom?: string;
  createdTo?: string;
  limit?: number;
  offset?: number;
}
