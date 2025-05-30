import { Injectable } from '@angular/core';
import { Product, ProductCategory, TechnicalData } from '../models/product.model';
import { AccessoriesType } from '../models/enums/accessories-type.enum';
import { ProductType } from '../models/enums/product-type.enum';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private categories: ProductCategory[] = [
    {
      id: 1,
      name: 'Demo Kitleri',
      slug: 'demo-kitleri',
      products: []
    },
    {
      id: 2,
      name: 'Elektronik Raf Etiketleri',
      slug: 'elektronik-raf-etiketleri',
      products: []
    },
    {
      id: 3,
      name: 'Özel Elektronik Raf Etiketleri',
      slug: 'ozel-elektronik-raf-etiketleri',
      products: []
    },
    {
      id: 4,
      name: 'Yardımcı Ekipman ve Yazılımlar',
      slug: 'yardimci-ekipman-ve-yazilimlar',
      products: []
    },
    {
      id: 5,
      name: 'Montaj Aksesuarları',
      slug: 'montaj-aksesuarlari',
      children: [
        {
          id: 6,
          name: 'Raylar',
          slug: 'raylar',
          parentId: 5,
          products: []
        },
        {
          id: 7,
          name: 'Ray Aksesuarları',
          slug: 'ray-aksesuarlari',
          parentId: 5,
          products: []
        },
        {
          id: 8,
          name: 'Masaüstü Standlar',
          slug: 'masaustu-standlar',
          parentId: 5,
          products: []
        },
        {
          id: 9,
          name: 'Profil Tutucular',
          slug: 'profil-tutucular',
          parentId: 5,
          products: []
        },
        {
          id: 10,
          name: 'Askılar',
          slug: 'askilar',
          parentId: 5,
          products: []
        },
        {
          id: 11,
          name: 'Raf Klipsleri',
          slug: 'raf-klipsleri',
          parentId: 5,
          products: []
        },
        {
          id: 12,
          name: 'Mıknatıslı Tutucular',
          slug: 'miknatisli-tutucular',
          parentId: 5,
          products: []
        },
        {
          id: 13,
          name: 'Saplama Tipler',
          slug: 'saplama-tipler',
          parentId: 5,
          products: []
        },
        {
          id: 14,
          name: 'Sepet Tutucular',
          slug: 'sepet-tutucular',
          parentId: 5,
          products: []
        }
      ]
    }
  ];
  
  private products: Product[] = [];

  constructor() { 
    this.initializeProducts();
  }

  private initializeProducts() {
    // Demo kitleri ürünleri
    this.addProducts([
      {
        id: 1,
        name: 'ESL DEMO KIT FULL',
        stockCode: 'RFD01.0001',
        description: ['Demo Kit Full açıklaması'],
        productType: ProductType.DemoKit,
        imagePath: '../../files/urunler/RFD01.0001.png',
        category: 'demo-kitleri',
        detailUrl: '../urunler/esl-demo-kit-full.html'
      },
      {
        id: 2,
        name: 'ESL DEMO KIT PLUS',
        stockCode: 'RFD01.0002',
        description: ['Demo Kit Plus açıklaması'],
        productType: ProductType.DemoKit,
        imagePath: '../../files/urunler/RFD01.0001.png',
        category: 'demo-kitleri',
        detailUrl: '../urunler/esl-demo-kit-plus.html'
      }
    ], 'demo-kitleri');

    // Elektronik raf etiketleri ürünleri
    this.addProducts([
      {
        id: 3,
        name: '1.54" ELEKTRONİK RAF ETİKETİ',
        stockCode: 'RFE01.0154',
        description: ['1.54" Elektronik Raf Etiketi açıklaması'],
        productType: ProductType.ESL,
        imagePath: '../../files/urunler/RFE01.0154.png',
        category: 'elektronik-raf-etiketleri',
        detailUrl: '../urunler/154-elektronik-raf-etiketi.html'
      },
      {
        id: 4,
        name: '2.13" ELEKTRONİK RAF ETİKETİ',
        stockCode: 'RFE01.0213',
        description: ['2.13" Elektronik Raf Etiketi açıklaması'],
        productType: ProductType.ESL,
        imagePath: '../../files/urunler/RFE01.0213.png',
        category: 'elektronik-raf-etiketleri',
        detailUrl: '../urunler/213-elektronik-raf-etiketi.html'
      }
    ], 'elektronik-raf-etiketleri');

    // Raylar ürünleri
    this.addProducts([
      {
        id: 20,
        name: 'ESL RAY DÜZ 1m',
        stockCode: 'RFA01.0101',
        description: ['ESL Ray Düz 1m açıklaması'],
        productType: ProductType.Accessories,
        accessoriesType: AccessoriesType.Rail,
        imagePath: '../../files/urunler/RFA01.0101.png',
        category: 'raylar',
        detailUrl: '../urunler/esl-ray-duz-1m.html'
      },
      {
        id: 21,
        name: 'ESL RAY DÜZ 1m (BANTLI)',
        stockCode: 'RFA01.0102',
        description: ['ESL Ray Düz 1m (Bantlı) açıklaması'],
        productType: ProductType.Accessories,
        accessoriesType: AccessoriesType.Rail,
        imagePath: '../../files/urunler/RFA01.0102.png',
        category: 'raylar',
        detailUrl: '../urunler/esl-ray-duz-1m-bantli.html'
      }
    ], 'raylar');
  }

  private addProducts(products: Product[], categorySlug: string): void {
    this.products = [...this.products, ...products];
    
    const category = this.findCategoryBySlug(categorySlug);
    if (category) {
      category.products = products;
    }
  }

  private findCategoryBySlug(slug: string): ProductCategory | null {
    // Search in main categories
    const mainCategory = this.categories.find(cat => cat.slug === slug);
    if (mainCategory) return mainCategory;
    
    // Search in subcategories
    for (const cat of this.categories) {
      if (cat.children) {
        const subCategory = cat.children.find(sub => sub.slug === slug);
        if (subCategory) return subCategory;
      }
    }
    
    return null;
  }

  getCategories(): Observable<ProductCategory[]> {
    return of(this.categories);
  }
  
  getProductsByCategory(categorySlug: string): Observable<Product[]> {
    const category = this.findCategoryBySlug(categorySlug);
    return of(category?.products || []);
  }
  
  getProductById(id: number): Observable<Product | undefined> {
    return of(this.products.find(product => product.id === id));
  }
  
  getProductByStockCode(stockCode: string): Observable<Product | undefined> {
    return of(this.products.find(product => product.stockCode === stockCode));
  }
}
