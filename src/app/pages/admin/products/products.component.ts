import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

interface Product {
  id: number;
  name: string;
  image: string;
  shortDesc: string;
  price: number;
  discount: number;
  brand: string;
  category: string;
  featured: boolean;
  isNew: boolean;
}

@Component({
  selector: 'app-products',
  imports: [
    TableModule,
    HttpClientModule,
    InputTextModule,
    IconField,
    InputIcon,
    SelectModule,
    FormsModule,
    RouterLink,
    NgClass,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  products: Product[] = [];
  globalFilterValue: string = '';

  ngOnInit() {
    this.getProducts().then((data) => (this.products = data));
  }

  getProducts(): Promise<Product[]> {
    return Promise.resolve([
      {
        id: 1,
        name: 'Smartphone',
        image: 'https://via.placeholder.com/40',
        shortDesc: 'Latest model',
        price: 500,
        discount: 10,
        brand: 'Samsung',
        category: 'Electronics',
        featured: true,
        isNew: true,
      },
      {
        id: 2,
        name: 'Laptop',
        image: 'https://via.placeholder.com/40',
        shortDesc: 'High performance',
        price: 1200,
        discount: 15,
        brand: 'Dell',
        category: 'Electronics',
        featured: false,
        isNew: true,
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
