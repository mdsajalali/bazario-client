import { Component } from '@angular/core';
import { PaginationComponent } from "../../../components/shared/pagination/pagination.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [PaginationComponent, RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

}
