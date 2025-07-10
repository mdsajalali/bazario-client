import { Component } from '@angular/core';
import { PaginationComponent } from "../../../components/shared/pagination/pagination.component";

@Component({
  selector: 'app-orders',
  imports: [PaginationComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

}
