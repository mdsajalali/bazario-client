import { Component } from '@angular/core';
import { OrdersComponent } from "../orders/orders.component";

@Component({
  selector: 'app-dashboard',
  imports: [OrdersComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
