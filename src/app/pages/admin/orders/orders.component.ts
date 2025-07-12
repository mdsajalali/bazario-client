import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';

interface Order {
  orderId: string;
  customer: string;
  paymentType: string;
  date: string;
  total: number;
  status: string;
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
  ],
})
export class OrdersComponent implements OnInit {
  orders!: Order[];

  selectedOrder!: Order;

  ngOnInit() {
    this.getOrders().then((data) => (this.orders = data));
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
