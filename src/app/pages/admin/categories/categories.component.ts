import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';

interface Category {
  categoryId: string;
  name: string;
  date: string;
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
  orders!: Category[];

  globalFilterValue: string = '';

  ngOnInit() {
    this.getBrands().then((data) => (this.orders = data));
  }

  getBrands(): Promise<Category[]> {
    return Promise.resolve([
      {
        categoryId: '#ORD001',
        name: 'Samsung',
        date: '2025-07-10',
      },
      {
        categoryId: '#ORD001',
        name: 'Vivo',
        date: '2025-07-10',
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
