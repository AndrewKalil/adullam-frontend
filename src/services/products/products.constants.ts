export const PRODUCTS_QUERY_KEYS = {
  all: ["products"],
  list: (filters: Record<string, unknown>) => ["products", "list", filters],
  byId: (id: string) => ["products", id],
} as const;
