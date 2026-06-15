export type DiscountScope = "products" | "category";

export interface Discount {
  id: string;
  name: string;
  description: string | null;
  percentage: number;
  scope: DiscountScope;
  categoryId: string | null;
  productIds: string[];
  isActive: boolean;
  startDate: string | null;
  endDate: string | null;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export type DiscountInsert = Pick<Discount, "name" | "percentage" | "scope"> &
  Partial<Pick<Discount, "description" | "categoryId" | "productIds" | "isActive" | "startDate" | "endDate" | "imageUrl">>;

export type DiscountUpdate = Partial<DiscountInsert>;
