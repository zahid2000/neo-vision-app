import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AsyncPipe, CommonModule, NgForOf, NgIf } from '@angular/common';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  standalone: true,
  imports: [CommonModule,  AsyncPipe, NgIf, NgForOf]
})
export class ProductDetailComponent implements OnInit {
  product$: Observable<Product | undefined> = of(undefined);

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.product$ = this.route.paramMap.pipe(
      switchMap(params => {
        const productId = Number(params.get('id'));
        return this.productService.getProductById(productId);
      })
    );
  }
} 