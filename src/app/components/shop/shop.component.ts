import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { ProductType } from '../../types';
import { ProductsService } from '../../services/products/products.service';
import { ProductCardComponent } from '../shared/product-card/product-card.component';
import { CategoryService } from '../../services/dashboard/category/category.service';
import { BrandsService } from '../../services/dashboard/brands/brands.service';
import { Paginator } from 'primeng/paginator';
import { Select } from 'primeng/select';
import { Checkbox } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { PaginatorModule } from 'primeng/paginator';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shop',
  imports: [
    HeaderComponent,
    FooterComponent,
    ProductCardComponent,
    Paginator,
    Select,
    Checkbox,
    FormsModule,
    PaginatorModule,
    CheckboxModule,
    InputTextModule,
    CardModule,
    CommonModule,
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent {
  private productService = inject(ProductsService);
  private categoryService = inject(CategoryService);
  private brandService = inject(BrandsService);

  products: ProductType[] = [];

  categories: any[] = [];
  brands: any[] = [];

  searchTerm = '';
  selectedCategories: string[] = [];
  selectedBrands: string[] = [];
  selectedSort: string | null = null;

  totalRecords = 0;
  page = 1;
  pageSize = 6;

  ngOnInit() {
    this.loadInitialData();
  }

  loadInitialData() {
    this.categoryService.getCategories().subscribe({
      next: (res: any) => (this.categories = res),
      error: (err) => console.error(err),
    });

    this.brandService.getBrands().subscribe({
      next: (res: any) => (this.brands = res),
      error: (err) => console.error(err),
    });

    this.onFilterChange();
  }

  onFilterChange() {
    const params: any = {
      page: this.page,
      pageSize: this.pageSize,
    };

    if (this.searchTerm.trim()) params.searchTerm = this.searchTerm.trim();

    if (this.selectedCategories.length) {
      const matched = this.categories.find((c) =>
        this.selectedCategories.includes(c.name)
      );
      if (matched) params.categoryId = matched._id;
    }

    if (this.selectedBrands.length) {
      const matched = this.brands.find((b) =>
        this.selectedBrands.includes(b.name)
      );
      if (matched) params.brandId = matched._id;
    }

    if (this.selectedSort) {
      params.sortBy = 'price';
      params.sortOrder = this.selectedSort === 'low' ? 1 : -1;
    }

    this.productService.getFilteredProducts(params).subscribe({
      next: (res: any) => {
        this.products = res.products;
        this.totalRecords = res.total;
      },
      error: (err) => console.error(err),
    });
  }

  onPageChange(event: any) {
    this.page = event.page + 1;
    this.pageSize = event.rows;
    this.onFilterChange();
  }
}
