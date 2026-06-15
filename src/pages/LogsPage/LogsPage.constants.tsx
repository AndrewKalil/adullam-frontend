import { formatDateTime } from "@kalortech/shared-logic";
import { Tag } from "antd";
import type { TableColumnsType } from "antd";

import { LOG_ACTION_CREATE, LOG_ACTION_DELETE, LOG_ACTION_UPDATE } from "~services";
import type { LogEntry } from "~services";

import { LogBodyTooltip } from "./LogBodyTooltip";
import { humanizeEntityType } from "./LogsPage.utils";

const ACTION_COLOR_MAP: Record<string, string> = {
  [LOG_ACTION_CREATE]: "green",
  [LOG_ACTION_UPDATE]: "blue",
  [LOG_ACTION_DELETE]: "red",
};

export const LOGS_TABLE_COLUMNS: TableColumnsType<LogEntry> = [
  {
    title: "Date",
    key: "createdAt",
    render: (_, row) => formatDateTime(row.createdAt),
    width: 200,
  },
  {
    title: "User",
    key: "user",
    render: (_, row) => row.userEmail ?? "System",
  },
  {
    title: "Action",
    key: "action",
    render: (_, row) => (
      <Tag color={ACTION_COLOR_MAP[row.action]}>{row.action}</Tag>
    ),
    width: 100,
  },
  {
    title: "Table",
    key: "entityType",
    render: (_, row) => humanizeEntityType(row.entityType),
    width: 140,
  },
  {
    title: "Changes",
    key: "body",
    render: (_, row) => <LogBodyTooltip body={row.body} action={row.action} />,
  },
];
