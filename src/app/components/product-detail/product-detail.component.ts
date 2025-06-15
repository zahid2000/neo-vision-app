import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import { AsyncPipe, CommonModule, NgForOf, NgIf } from '@angular/common';
import { Product, InnerProduct } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, AsyncPipe, NgIf, NgForOf, RouterLink]
})
export class ProductDetailComponent implements OnInit {
  product$: Observable<Product | undefined> = of(undefined);
  relatedProducts$: Observable<Product[]> = of([]);
  private allProducts: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    // First get all products to use for inner product details
    this.productService.getProductsData().subscribe(products => {
      this.allProducts = products;
    });

    this.product$ = this.route.paramMap.pipe(
      switchMap(params => {
        const productId = Number(params.get('id'));
        return this.productService.getProductById(productId);
      }),
      tap(() => {
        window.scrollTo(0, 0);
      }),
      map(product => {
        if (product) {
          this.relatedProducts$ = this.productService.getProductsByCategory(product.categoryId).pipe(
            map((related: Product[]) => related.filter((p: Product) => p.id !== product.id))
          );
        }
        return product;
      })
    );
  }

  getInnerProductDetails(innerProduct: InnerProduct): Product | undefined {
    return this.allProducts.find(p => p.id === innerProduct.id);
  }

  // Social sharing methods
  getShareUrl(): string {
    return window.location.href;
  }

  getEncodedUrl(): string {
    return encodeURIComponent(this.getShareUrl());
  }

  getEncodedText(text: string): string {
    return encodeURIComponent(text);
  }

  getFacebookShareUrl(): string {
    return `https://www.facebook.com/sharer/sharer.php?u=${this.getEncodedUrl()}`;
  }

  getTwitterShareUrl(productName: string): string {
    return `https://twitter.com/intent/tweet?url=${this.getEncodedUrl()}&text=${this.getEncodedText(productName)}`;
  }

  getWhatsAppShareUrl(productName: string): string {
    return `https://api.whatsapp.com/send?text=${this.getEncodedText(productName + ' - ' + this.getShareUrl())}`;
  }

  getLinkedInShareUrl(productName: string): string {
    return `https://www.linkedin.com/shareArticle?mini=true&url=${this.getEncodedUrl()}&title=${this.getEncodedText(productName)}`;
  }
} 