export interface Category {
  id: string;
  name: string;
  description: string | null;
  color: string | null;
  createdAt: string;
  updatedAt: string;
}

export type CategoryInsert = Pick<Category, "name"> & Partial<Pick<Category, "description" | "color">>;
export type CategoryUpdate = Partial<CategoryInsert>;
