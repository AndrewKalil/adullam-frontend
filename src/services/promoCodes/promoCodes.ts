import { generatePath } from "@kalortech/shared-logic";

import { ApiEndpoint } from "~constants";
import { apiClient } from "~integrations";

import type { PromoCode, PromoCodeInsert, PromoCodeUpdate } from "./promoCodes.types";

export const getPromoCodes = (): Promise<PromoCode[]> =>
  apiClient.get<PromoCode[]>(ApiEndpoint.PromoCodes);

export const getPromoCodeById = (id: string): Promise<PromoCode> =>
  apiClient.get<PromoCode>(generatePath(ApiEndpoint.PromoCodesById, { id }));

export const createPromoCode = (payload: PromoCodeInsert): Promise<PromoCode> =>
  apiClient.post<PromoCode>(ApiEndpoint.PromoCodes, payload);

export const updatePromoCode = (options: { id: string; payload: PromoCodeUpdate }): Promise<PromoCode> => {
  const { id, payload } = options;
  return apiClient.patch<PromoCode>(generatePath(ApiEndpoint.PromoCodesById, { id }), payload);
};

export const deletePromoCode = (id: string): Promise<void> =>
  apiClient.delete<void>(generatePath(ApiEndpoint.PromoCodesById, { id }));
