import { Component } from '@angular/core';
import { PaginationComponent } from "../../../components/shared/pagination/pagination.component";

@Component({
  selector: 'app-products',
  imports: [PaginationComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

}
