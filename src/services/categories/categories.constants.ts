export const CATEGORIES_QUERY_KEYS = {
  all: ["categories"],
  list: () => ["categories", "list"],
  byId: (id: string) => ["categories", id],
} as const;
