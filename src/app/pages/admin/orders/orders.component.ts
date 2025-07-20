import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { OrdersService } from '../../../services/orders/orders.service';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  imports: [
    TableModule,
    HttpClientModule,
    InputTextModule,
    IconField,
    InputIcon,
    SelectModule,
    FormsModule,
    DatePipe,
    Toast,
  ],
  providers: [MessageService],
})
export class OrdersComponent implements OnInit {
  orders!: any[];
  globalFilterValue: string = '';
  router = inject(Router);
  isDashboard: boolean = false;
  orderService = inject(OrdersService);
  selectedOrder!: any;
  totalPrice: any = 0;
  messageService = inject(MessageService);
  loading: boolean = true;

  orderStatus = [
    { label: 'In Progress', value: 'inprogress' },
    { label: 'Dispatched', value: 'dispatched' },
    { label: 'Shipped', value: 'shipped' },
    { label: 'Delivered', value: 'delivered' },
  ];

  handleStatusChange(order: any) {
    const newStatus = order.status.value;
    const orderId = order._id;
    this.orderService.updateOrderStatus(orderId, newStatus).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Status updated successfully!',
        life: 3000,
      });
    });
  }

  ngOnInit() {
    this.getOrders();

    this.checkRoute(this.router.url);
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.checkRoute(event.urlAfterRedirects);
      });
  }

  private checkRoute(url: string) {
    this.isDashboard = url === '/dashboard';
  }

  getOrders() {
    this.orderService.getAdminOrder().subscribe({
      next: (result: any) => {
        this.orders = result.map((order: any) => {
          const status =
            this.orderStatus.find((s) => s.value === order.status) || null;

          let total = 0;
          let totalQuantity = 0;

          for (const item of order.items) {
            const discountedPrice =
              item.product.price -
              (item.product.price * item.product.discount) / 100;

            total += discountedPrice * item.quantity;
            totalQuantity += item.quantity;
          }

          return {
            ...order,
            status,
            total: total.toFixed(2),
            totalQuantity,
          };
        });
        this.loading = false;
      },
    });
  }

  getGlobalFilterValue(filter: any): string {
    if (filter && !Array.isArray(filter)) {
      return filter.value || '';
    }
    return '';
  }
}
