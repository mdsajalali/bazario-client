import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  http = inject(HttpClient);

  addOrder(order: any) {
    return this.http.post(environment.apiUrl + '/shop/order', order);
  }

  getOrders() {
    return this.http.get(environment.apiUrl + '/shop/orders');
  }

  getAdminOrder() {
    return this.http.get(environment.apiUrl + '/orders');
  }

  updateOrderStatus(id: string, status: string) {
    return this.http.post(environment.apiUrl + '/orders/' + id, {
      status,
    });
  }
}
