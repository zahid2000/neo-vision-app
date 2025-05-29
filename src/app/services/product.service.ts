import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  product:Product={
    id:1,
    name: 'Sample Product',
    description: ['This is a sample product description.'],
    stockCode: 'SP001',
    size: 'Medium',
    weight: '150g',
    productType: 1,
  }
  constructor() { }
}
