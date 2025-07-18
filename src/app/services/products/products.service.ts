import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BrandsType, ProductType } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  http = inject(HttpClient);

  getProducts(): Observable<ProductType> {
    return this.http.get<ProductType>(environment.apiUrl + '/shop/products');
  }

  getFilteredProducts(params: any): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/shop/products', {
      params,
    });
  }

  getProductById(id: string): Observable<ProductType> {
    return this.http.get<ProductType>(
      environment.apiUrl + `/shop/product/${id}`
    );
  }

  getBrands(): Observable<BrandsType> {
    return this.http.get<BrandsType>(environment.apiUrl + '/shop/brands');
  }

  getFeaturedProducts(): Observable<ProductType> {
    return this.http.get<ProductType>(
      environment.apiUrl + '/shop/featured-products'
    );
  }

  getNewProducts(): Observable<ProductType> {
    return this.http.get<ProductType>(
      environment.apiUrl + '/shop/new-products'
    );
  }
}
