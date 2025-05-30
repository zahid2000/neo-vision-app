import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AsyncPipe, CommonModule, NgForOf, NgIf } from '@angular/common';
import { Product, ProductCategory } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, AsyncPipe, NgIf, NgForOf]
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]> = of([]);
  categories$: Observable<ProductCategory[]>;
  currentCategory: string = '';
  parentCategory: ProductCategory | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.categories$ = this.productService.getCategories();
  }

  ngOnInit(): void {
    this.products$ = this.route.paramMap.pipe(
      switchMap(params => {
        const categorySlug = params.get('category') || '';
        this.currentCategory = categorySlug;
        
        // Find parent category
        this.categories$.subscribe(categories => {
          this.parentCategory = null;
          for (const category of categories) {
            if (category.slug === categorySlug) {
              break;
            }
            if (category.children && category.children.some(child => child.slug === categorySlug)) {
              this.parentCategory = category;
              break;
            }
          }
        });
        
        return this.productService.getProductsByCategory(categorySlug);
      })
    );
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
    
    return this.currentCategory === category.slug || 
           category.children.some(c => c.slug === this.currentCategory);
  }
} 