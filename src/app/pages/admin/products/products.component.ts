import { Component, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { ProductsService } from '../../../services/dashboard/products/products.service';
import { ProductType } from '../../../types';
import { MessageService } from 'primeng/api';
import { Toast } from "primeng/toast";

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
    Toast
],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  providers: [MessageService],
})
export class ProductsComponent {
  products: ProductType[] = [];
  globalFilterValue: string = '';
  productService = inject(ProductsService);
  loading: boolean = true;
  messageService = inject(MessageService);

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (result: any) => {
        this.products = result;
        this.loading = false;
      },
      error: (error) => {
        console.log(error);
        this.loading = false;
      },
    });
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Product deleted successfully!',
          life: 3000,
        });
        this.getProducts()
      },
      error: (error) => {
        console.log(error);
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
