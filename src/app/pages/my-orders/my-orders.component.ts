import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../components/shared/header/header.component';
import { FooterComponent } from '../../components/shared/footer/footer.component';
import { OrdersService } from '../../services/orders/orders.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-orders',
  imports: [HeaderComponent, FooterComponent, DatePipe],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss',
})
export class MyOrdersComponent {
  orders: any[] = [];
  orderService = inject(OrdersService);

  ngOnInit() {
    this.orderService.getOrders().subscribe((result: any) => {
      this.orders = result;
    });
  }
}
