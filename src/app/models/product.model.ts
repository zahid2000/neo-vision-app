import { AccessoriesType } from "./enums/accessories-type.enum";
import { ProductType } from "./enums/product-type.enum";

export interface Product {
  id: number;
  name: string;
  description: string[] | null;
  stockCode: string;
  size?: string | null;
  weight?: string | null;
  productType: ProductType;
  accessoriesType?: AccessoriesType | null;
  innerProducts?: Product[] | null;
  imagePath: string;
  technicalData?: TechnicalData | null;
  category?: string;
  detailUrl?: string;
}

export interface TechnicalData {
  dimensions?: string;
  material?: string;
  weight?: string;
  color?: string;
  compatibility?: string[];
  specifications?: string[];
  [key: string]: any;
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  parentId?: number | null;
  children?: ProductCategory[] | null;
  products?: Product[] | null;
}

