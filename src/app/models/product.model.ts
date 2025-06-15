import { AccessoriesType } from "./enums/accessories-type.enum";
import { ProductType } from "./enums/product-type.enum";
import { TechnicalData } from "./technical.data.model";

export interface InnerProduct {
  id: number;
  quantity: number;
}

export interface Product {
  id: number;
  name: string;
  description: string[] | null;
  stockCode: string;
  size?: string | null;
  weight?: string | null;
  productType: ProductType;
  accessoriesType?: AccessoriesType | null;
  innerProducts?: InnerProduct[] | null;
  imagePath: string;
  technicalData?: TechnicalData | null;
  categoryId: number;
}


