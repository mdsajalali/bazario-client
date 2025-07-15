import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../services/dashboard/category/category.service';

interface Category {
  _id: string;
  name: string;
  image: string;
}

@Component({
  selector: 'app-categories',
  imports: [
    TableModule,
    HttpClientModule,
    InputTextModule,
    IconField,
    InputIcon,
    SelectModule,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  categories!: Category[];
  categoryService = inject(CategoryService);

  globalFilterValue: string = '';

  ngOnInit() {
    this.getCategory()
  }

  getCategory() {
    this.categoryService.getCategories().subscribe({
      next: (result: any) => {
        this.categories = result;
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
