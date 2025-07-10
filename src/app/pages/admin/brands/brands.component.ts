import { Component } from '@angular/core';
import { PaginationComponent } from "../../../components/shared/pagination/pagination.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  imports: [PaginationComponent, RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {

}
