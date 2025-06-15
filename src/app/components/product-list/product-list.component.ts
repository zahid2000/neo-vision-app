import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { AsyncPipe, CommonModule, NgForOf, NgIf } from '@angular/common';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ProductCategory } from '../../models/product.category.model';
import { FormsModule } from '@angular/forms';
import { ProductFilterPipe } from '../../pipes/product-filter.pipe';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, AsyncPipe, NgIf, NgForOf, FormsModule, ProductFilterPipe]
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]> = of([]);
  categories$: Observable<ProductCategory[]>;
  currentCategoryId: number | null = null;
  parentCategory: ProductCategory | null = null;
  searchQuery: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.categories$ = this.productService.getCategories();
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const categoryId = params.get('id');
        this.currentCategoryId = categoryId ? +categoryId : null;
        return this.productService.getProductsByCategory(this.currentCategoryId);
      }),
    ).subscribe(products => {
      this.products$ = of(products);
    });
  }

  /**
   * Determines whether to show subcategories for a category
   * @param category The category to check
   * @returns True if subcategories should be shown, false otherwise
   */
  showSubcategories(category: ProductCategory): boolean {
    if (!category.children || category.children.length === 0) {
      return false;
    }
    
    return this.currentCategoryId === category.id || 
           category.children.some(c => c.id === this.currentCategoryId);
  }
} 