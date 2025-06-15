import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product.model';

@Pipe({
  name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {
  transform(products: Product[] | null, searchQuery: string): Product[] {
    if (!products || searchQuery === '') {
      return products || [];
    }

    searchQuery = searchQuery.toLowerCase();

    return products.filter(product => {
      return product.name.toLowerCase().includes(searchQuery) ||
             product.stockCode.toLowerCase().includes(searchQuery);
    });
  }
} 