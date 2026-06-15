import { generatePath } from "@kalortech/shared-logic";

import { ApiEndpoint } from "~constants";
import { apiClient } from "~integrations";

import type { Category, CategoryInsert, CategoryUpdate } from "./categories.types";

export const getCategories = (): Promise<Category[]> =>
  apiClient.get<Category[]>(ApiEndpoint.Categories);

export const getCategoryById = (id: string): Promise<Category> =>
  apiClient.get<Category>(generatePath(ApiEndpoint.CategoriesById, { id }));

export const createCategory = (payload: CategoryInsert): Promise<Category> =>
  apiClient.post<Category>(ApiEndpoint.Categories, payload);

export const updateCategory = (options: { id: string; payload: CategoryUpdate }): Promise<Category> => {
  const { id, payload } = options;
  return apiClient.patch<Category>(generatePath(ApiEndpoint.CategoriesById, { id }), payload);
};

export const deleteCategory = (id: string): Promise<void> =>
  apiClient.delete<void>(generatePath(ApiEndpoint.CategoriesById, { id }));
