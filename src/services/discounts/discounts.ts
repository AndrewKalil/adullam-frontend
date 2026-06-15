import { generatePath } from "@kalortech/shared-logic";

import { ApiEndpoint } from "~constants";
import { apiClient } from "~integrations";

import type {
  Discount,
  DiscountInsert,
  DiscountUpdate,
} from "./discounts.types";

export const getDiscounts = (): Promise<Discount[]> =>
  apiClient.get<Discount[]>(ApiEndpoint.Discounts);

export const getDiscountById = (id: string): Promise<Discount> =>
  apiClient.get<Discount>(generatePath(ApiEndpoint.DiscountsById, { id }));

export const createDiscount = (payload: DiscountInsert): Promise<Discount> =>
  apiClient.post<Discount>(ApiEndpoint.Discounts, payload);

export const updateDiscount = (options: {
  id: string;
  payload: DiscountUpdate;
}): Promise<Discount> => {
  const { id, payload } = options;
  return apiClient.patch<Discount>(
    generatePath(ApiEndpoint.DiscountsById, { id }),
    payload,
  );
};

export const deleteDiscount = (id: string): Promise<void> =>
  apiClient.delete<void>(generatePath(ApiEndpoint.DiscountsById, { id }));
