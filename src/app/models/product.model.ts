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
  innerProducts?: Product[] | null;
  imagePath: string;
  technicalData?: any
  accessoriesType?: AccessoriesType | null;
}

