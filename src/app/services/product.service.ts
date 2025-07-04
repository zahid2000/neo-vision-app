import { Injectable } from '@angular/core';
import { Product, InnerProduct } from '../models/product.model';
import { TechnicalData } from "../models/technical.data.model";
import { AccessoriesType } from '../models/enums/accessories-type.enum';
import { ProductType } from '../models/enums/product-type.enum';
import { Observable, of, throwError } from 'rxjs';
import { ProductCategory } from '../models/product.category.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private categories: ProductCategory[] = [
    {
      id: 1,
      name: 'Demo Dəstləri',
      slug: 'demo-kitleri',
      products: []
    },
    {
      id: 2,
      name: 'Elektronik Rəf Etiketləri',
      slug: 'elektronik-Rəf-etiketleri',
      children: [
        {
          id: 17,
          name: 'Valley Seriyası',
          slug: 'valley-eriyası',
          products: []
        },
          {
            id: 18,
            name: 'Blade Seriyası',
            slug: 'blade-seriyası',
            products: []
          },
          {
            id: 19,
            name: 'Shield Seriyası',
            slug: 'shield-seriyası',
            products: []
          },
          {
            id: 20,
            name: 'Essence Colorful Seriyası',
            slug: 'essence-colorful-seriyası',
            products: []
          },
      ]
    },
    {
      id: 15,
      name: 'LCD Lövhələr',
      slug: 'lcd-lovheler',
      products: []
    },


    {
      id: 16,
      name: 'LCD Rəf Ekranları',
      slug: 'lcd-ref-ekranlari',
      products: []
    },
    // {
    //   id: 3,
    //   name: 'Xüsusi Elektronik Rəf Etiketləri',
    //   slug: 'ozel-elektronik-Rəf-etiketleri',
    //   products: []
    // },
    {
      id: 4,
      name: 'Köməkçi Avadanlıq və Proqram Təminatı',
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
          name: 'Rellər',
          slug: 'raylar',
          parentId: 5,
          products: []
        },
        {
          id: 7,
          name: 'Rel Aksesuarları',
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
          name: 'Asqılar',
          slug: 'askilar',
          parentId: 5,
          products: []
        },
        {
          id: 11,
          name: 'Rəf Klipsləri',
          slug: 'Rəf-klipsleri',
          parentId: 5,
          products: []
        },
        {
          id: 12,
          name: 'Maqnitli Tutucular',
          slug: 'miknatisli-tutucular',
          parentId: 5,
          products: []
        },
        {
          id: 13,
          name: 'Vint Tipləri',
          slug: 'saplama-tipler',
          parentId: 5,
          products: []
        },
        {
          id: 14,
          name: 'Səbət Tutucular',
          slug: 'sepet-tutucular',
          parentId: 5,
          products: []
        }
      ]
    },
    
  ];
  
  constructor(private http: HttpClient) { }

  getProductsData(): Observable<Product[]> {
    return this.http.get<Product[]>('data/products.json').pipe(
      catchError(this.handleError<Product[]>('getProductsData', []))
    );
  }

  getCategories(): Observable<ProductCategory[]> {
    return this.getProductsData().pipe(
      map(products => {
        const categoriesCopy = JSON.parse(JSON.stringify(this.categories)); // Deep copy
        this.assignProductsToCategories(products, categoriesCopy);
        return categoriesCopy;
      })
    );
  }

  private assignProductsToCategories(products: Product[], categories: ProductCategory[]) {
    categories.forEach(category => {
      if (category.children) {
        this.assignProductsToCategories(products, category.children);
      } else {
        category.products = products.filter(p => p.categoryId === category.id);
        // Populate innerProducts for demo kits
        if (category.id === 1) { // Assuming categoryId 1 is for Demo Kits
          category.products.forEach(demoKit => {
            if (demoKit.innerProducts && demoKit.innerProducts.length > 0) {
              demoKit.innerProducts = demoKit.innerProducts.map(innerProd => {
                const fullProduct = products.find(p => p.id === innerProd.id);
                if (!fullProduct) {
                  return innerProd;
                }
                return {
                  id: fullProduct.id,
                  quantity: innerProd.quantity
                };
              });
            }
          });
        }
      }
    });
  }

  getProductsByCategory(categoryId: number | null): Observable<Product[]> {
    return this.getProductsData().pipe(
      map(products => {
        if (categoryId === null) {
          const allProducts: Product[] = [];
          const collectProducts = (cats: ProductCategory[]) => {
            cats.forEach(cat => {
              if (cat.products) {
                allProducts.push(...cat.products);
              }
              if (cat.children) {
                collectProducts(cat.children);
              }
            });
          };
          collectProducts(this.categories);
          return allProducts;
        }

        let targetCategory: ProductCategory | undefined;
        const findCategory = (cats: ProductCategory[], id: number) => {
          for (const cat of cats) {
            if (cat.id === id) {
              targetCategory = cat;
              return;
            }
            if (cat.children) {
              findCategory(cat.children, id);
              if (targetCategory) return;
            }
          }
        };
        findCategory(this.categories, categoryId);

        if (targetCategory && targetCategory.children && targetCategory.children.length > 0) {
          const childProducts: Product[] = [];
          const collectChildProducts = (cats: ProductCategory[]) => {
            cats.forEach(childCat => {
              const filteredProducts = products.filter(p => p.categoryId === childCat.id);
              childProducts.push(...filteredProducts);
              if (childCat.children) {
                collectChildProducts(childCat.children);
              }
            });
          };
          collectChildProducts(targetCategory.children);
          return childProducts;
        } else if (targetCategory) {
          return products.filter(p => p.categoryId === categoryId);
        } else {
          return [];
        }
      })
    );
  }
  
  getProductById(id: number): Observable<Product | undefined> {
    return this.getProductsData().pipe(
      map(products => {
        const product = products.find(p => p.id === id);
        if (product && product.productType === ProductType.DemoKit && product.innerProducts && product.innerProducts.length > 0) {
          product.innerProducts = product.innerProducts.map(innerProd => {
            const fullProduct = products.find(p => p.id === innerProd.id);
            if (!fullProduct) {
              return innerProd;
            }
            return {
              id: fullProduct.id,
              quantity: innerProd.quantity
            };
          });
        }
        return product;
      })
    );
  }
  
  getProductByStockCode(stockCode: string): Observable<Product | undefined> {
    return this.getProductsData().pipe(
      map(products => products.find(p => p.stockCode === stockCode))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
