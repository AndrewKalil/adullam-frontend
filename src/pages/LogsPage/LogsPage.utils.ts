import { ENTITY_TYPE_LABEL_MAP } from "./LogsPage.constants";

export const humanizeEntityType = (entityType: string): string => {
  if (ENTITY_TYPE_LABEL_MAP[entityType]) return ENTITY_TYPE_LABEL_MAP[entityType];
  return entityType
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
};
