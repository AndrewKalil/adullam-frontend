import { generatePath } from "@kalortech/shared-logic";

import { ApiEndpoint } from "~constants";
import { apiClient } from "~integrations";

import type { Product, ProductFilters, ProductInsert, ProductListResponse, ProductUpdate } from "./products.types";

function buildProductsUrl(filters?: ProductFilters): string {
  if (!filters) return ApiEndpoint.Products;
  const params = new URLSearchParams();
  if (filters.categoryId) params.set("category_id", filters.categoryId);
  if (filters.name) params.set("name", filters.name);
  if (filters.priceMin !== undefined) params.set("price_min", String(filters.priceMin));
  if (filters.priceMax !== undefined) params.set("price_max", String(filters.priceMax));
  if (filters.createdFrom) params.set("created_from", filters.createdFrom);
  if (filters.createdTo) params.set("created_to", filters.createdTo);
  if (filters.limit !== undefined) params.set("limit", String(filters.limit));
  if (filters.offset !== undefined) params.set("offset", String(filters.offset));
  if (filters.sort) params.set("sort", filters.sort);
  const query = params.toString();
  return query ? `${ApiEndpoint.Products}?${query}` : ApiEndpoint.Products;
}

export const getProducts = (filters?: ProductFilters): Promise<ProductListResponse> =>
  apiClient.get<ProductListResponse>(buildProductsUrl(filters));

export const getProductById = (id: string): Promise<Product> =>
  apiClient.get<Product>(generatePath(ApiEndpoint.ProductsById, { id }));

export const createProduct = (payload: ProductInsert): Promise<Product> =>
  apiClient.post<Product>(ApiEndpoint.Products, payload);

export const updateProduct = (options: { id: string; payload: ProductUpdate }): Promise<Product> => {
  const { id, payload } = options;
  return apiClient.patch<Product>(generatePath(ApiEndpoint.ProductsById, { id }), payload);
};

export const deleteProduct = (id: string): Promise<void> =>
  apiClient.delete<void>(generatePath(ApiEndpoint.ProductsById, { id }));
