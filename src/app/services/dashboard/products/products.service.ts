import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductType } from '../../../types';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  http = inject(HttpClient);

  getProducts(): Observable<ProductType> {
    return this.http.get<ProductType>(environment.apiUrl + '/products');
  }

  createProduct(product: ProductType): Observable<ProductType> {
    return this.http.post<ProductType>(
      environment.apiUrl + '/products',
      product
    );
  }

  deleteProduct(id: string): Observable<ProductType> {
    return this.http.delete<ProductType>(
      environment.apiUrl + `/products/${id}`
    );
  }
}
