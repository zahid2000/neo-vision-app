import { Product } from "./product.model";

export interface ProductCategory {
    id: number;
    name: string;
    slug: string;
    parentId?: number | null;
    children?: ProductCategory[] | null;
    products?: Product[] | null;
  }