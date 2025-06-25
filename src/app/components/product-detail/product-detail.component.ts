import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild('relatedCarousel', { static: false }) relatedCarousel?: ElementRef<HTMLDivElement>;

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

  setProductImageHover(event: Event, hover: boolean) {
    const el = event.currentTarget as HTMLElement;
    if (!el) return;
    el.style.transform = hover ? 'scale(1.07)' : 'scale(1)';
    el.style.boxShadow = hover ? '0 4px 24px rgba(237,28,36,0.13)' : '0 2px 16px rgba(237,28,36,0.10)';
  }

  setSocialIconHover(event: Event, color: string, hover: boolean) {
    const el = event.currentTarget as HTMLElement;
    if (!el) return;
    if (hover) {
      el.style.background = color;
      el.style.color = '#fff';
    } else {
      el.style.background = '#f0f0f0';
      el.style.color = color;
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

  scrollRelated(direction: number) {
    const el = this.relatedCarousel?.nativeElement;
    if (!el) return;
    const scrollAmount = 320 * direction; // 1 card width
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
} 