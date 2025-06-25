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

  setCategoryHover(event: Event, hover: boolean, categoryId: number) {
    const el = event.target as HTMLElement;
    if (!el) return;
    if (hover) {
      el.style.background = this.currentCategoryId === categoryId ? 'linear-gradient(90deg, #ed1c24 60%, #fcb045 100%)' : '#f5f5f5';
    } else {
      el.style.background = this.currentCategoryId === categoryId ? 'linear-gradient(90deg, #ed1c24 60%, #fcb045 100%)' : 'transparent';
    }
  }

  setSubCategoryHover(event: Event, hover: boolean, subCategoryId: number) {
    const el = event.target as HTMLElement;
    if (!el) return;
    if (hover) {
      el.style.background = this.currentCategoryId === subCategoryId ? 'linear-gradient(90deg, #ed1c24 60%, #fcb045 100%)' : '#f5f5f5';
    } else {
      el.style.background = this.currentCategoryId === subCategoryId ? 'linear-gradient(90deg, #ed1c24 60%, #fcb045 100%)' : 'transparent';
    }
  }

  setProductCardHover(event: Event, hover: boolean) {
    const el = event.currentTarget as HTMLElement;
    if (!el) return;
    el.style.boxShadow = hover
      ? '0 6px 24px rgba(237,28,36,0.13)'
      : '0 2px 16px rgba(0,0,0,0.08)';
  }

  setProductButtonHover(event: Event, hover: boolean) {
    const el = event.currentTarget as HTMLElement;
    if (!el) return;
    el.style.background = hover
      ? 'linear-gradient(90deg, #fcb045 60%, #ed1c24 100%)'
      : 'linear-gradient(90deg, #ed1c24 60%, #fcb045 100%)';
  }

  setProductImageHover(event: Event, hover: boolean) {
    const el = event.currentTarget as HTMLElement;
    if (!el) return;
    el.style.transform = hover ? 'scale(1.07)' : 'scale(1)';
  }
} 