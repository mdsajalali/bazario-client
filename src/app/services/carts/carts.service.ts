import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  http = inject(HttpClient);
  items = [];

  init() {
    this.getCartItems().subscribe((result: any) => {
      this.items = result;
    });
  }

  getCartItems() {
    return this.http.get(environment.apiUrl + '/shop/carts');
  }

  addToCart(productId: string, quantity: number) {
    return this.http.post(environment.apiUrl + `/shop/carts/${productId}`, {
      quantity,
    });
  }

  removeFormCart(productId: string) {
    return this.http.delete(environment.apiUrl + `/shop/carts/${productId}`);
  }
}
