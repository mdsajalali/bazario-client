import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ProductType } from '../types';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  http = inject(HttpClient);

  getWishlists(): Observable<ProductType> {
    return this.http.get<ProductType>(environment.apiUrl + '/shop/wishlists');
  }

  addToWishlist(id: string): Observable<any> {
    return this.http.post<any>(
      environment.apiUrl + `/shop/wishlists/${id}`,
      {}
    );
  }

  removeToWishlist(id: string): Observable<any> {
    return this.http.delete<any>(
      environment.apiUrl + `/shop/wishlists/${id}`,
      {}
    );
  }
}
