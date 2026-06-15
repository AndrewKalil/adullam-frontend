export interface ProductCategory {
  name: string;
  color: string | null;
  description: string | null;
}

export interface ProductDiscount {
  id: string;
  name: string;
  percentage: number;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  isAvailable: boolean;
  categoryId: string | null;
  category: ProductCategory | null;
  discount: ProductDiscount | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProductListResponse {
  data: Product[];
  total: number;
  limit: number;
  offset: number;
}

export interface ProductFilters {
  categoryId?: string;
  name?: string;
  priceMin?: number;
  priceMax?: number;
  createdFrom?: string;
  createdTo?: string;
  limit?: number;
  offset?: number;
  sort?: string;
}

export type ProductInsert = Pick<Product, "name" | "price"> &
  Partial<Pick<Product, "description" | "imageUrl" | "isAvailable" | "categoryId">>;

export type ProductUpdate = Partial<ProductInsert>;
