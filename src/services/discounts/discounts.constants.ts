export const DISCOUNTS_QUERY_KEYS = {
  all: ["discounts"],
  list: () => ["discounts", "list"],
  byId: (id: string) => ["discounts", id],
} as const;
