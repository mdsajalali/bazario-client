import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface Brand {
  brandId: string;
  name: string;
  date: string;
}

@Component({
  selector: 'app-brands',
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
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent {
  orders!: Brand[];

  globalFilterValue: string = '';

  ngOnInit() {
    this.getBrands().then((data) => (this.orders = data));
  }

  getBrands(): Promise<Brand[]> {
    return Promise.resolve([
      {
        brandId: '#ORD001',
        name: 'John Doe',
        date: '2025-07-10',
      },
      {
        brandId: '#ORD001',
        name: 'Sajal',
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
