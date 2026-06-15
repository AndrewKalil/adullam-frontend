export const DISCOUNT_TYPE_PERCENTAGE = "percentage";
export const DISCOUNT_TYPE_FIXED = "fixed";

export const PROMO_CODES_QUERY_KEYS = {
  all: ["promoCodes"],
  list: () => ["promoCodes", "list"],
  byId: (id: string) => ["promoCodes", id],
} as const;
