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

interface Order {
  orderId: string;
  customer: string;
  paymentType: string;
  date: string;
  total: number;
  status: string;
}

interface City {
  name: string;
  code: string;
}

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
  ],
})
export class OrdersComponent implements OnInit {
  orders!: Order[];
  cities: City[] | undefined;
  selectedCity!: City;
  globalFilterValue: string = '';
  router = inject(Router);
  isDashboard: boolean = false;

  selectedOrder!: Order;

  ngOnInit() {
    this.getOrders().then((data) => (this.orders = data));

    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];

    this.selectedCity = this.cities[1];

    // route check
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

  getOrders(): Promise<Order[]> {
    return Promise.resolve([
      {
        orderId: '#ORD001',
        customer: 'John Doe',
        paymentType: 'Card',
        date: '2025-07-10',
        total: 150,
        status: 'Completed',
      },
      {
        orderId: '#ORD002',
        customer: 'Jane Smith',
        paymentType: 'Online',
        date: '2025-07-08',
        total: 220,
        status: 'Pending',
      },
      {
        orderId: '#ORD003',
        customer: 'Alice Brown',
        paymentType: 'Cash',
        date: '2025-07-06',
        total: 95,
        status: 'Processing',
      },
      {
        orderId: '#ORD004',
        customer: 'Bob Martin',
        paymentType: 'Card',
        date: '2025-07-04',
        total: 175,
        status: 'Cancelled',
      },
      {
        orderId: '#ORD005',
        customer: 'Clara Wilson',
        paymentType: 'Online',
        date: '2025-07-01',
        total: 310,
        status: 'Completed',
      },
    ]);
  }

  getGlobalFilterValue(filter: any): string {
    if (filter && !Array.isArray(filter)) {
      return filter.value || '';
    }
    return '';
  }
}
