import { ApiEndpoint } from "~constants";
import { apiClient } from "~integrations";

import type { LogFilters, LogListResponse } from "./logs.types";

function buildLogsUrl(filters?: LogFilters): string {
  if (!filters) return ApiEndpoint.Logs;
  const params = new URLSearchParams();
  if (filters.action) params.set("action", filters.action);
  if (filters.entityType) params.set("entity_type", filters.entityType);
  if (filters.createdFrom) params.set("created_from", filters.createdFrom);
  if (filters.createdTo) params.set("created_to", filters.createdTo);
  if (filters.limit !== undefined) params.set("limit", String(filters.limit));
  if (filters.offset !== undefined) params.set("offset", String(filters.offset));
  const query = params.toString();
  return query ? `${ApiEndpoint.Logs}?${query}` : ApiEndpoint.Logs;
}

export const getLogs = (filters?: LogFilters): Promise<LogListResponse> =>
  apiClient.get<LogListResponse>(buildLogsUrl(filters));
