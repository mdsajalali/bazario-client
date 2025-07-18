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
  filteredProducts: ProductType[] = [];

  categories: any[] = [];
  brands: any[] = [];

  searchTerm = '';
  selectedCategories: string[] = [];
  selectedBrands: string[] = [];
  selectedSort: string | null = null;

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (res: any) => {
        this.products = res.products;
        this.filteredProducts = [...this.products];
      },
      error: (err) => console.error(err),
    });

    this.categoryService.getCategories().subscribe({
      next: (res: any) => (this.categories = res),
      error: (err) => console.error(err),
    });

    this.brandService.getBrands().subscribe({
      next: (res: any) => (this.brands = res),
      error: (err) => console.error(err),
    });
  }

  onFilterChange() {
    const params: any = {};

    if (this.searchTerm.trim()) {
      params.searchTerm = this.searchTerm.trim();
    }

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

    this.productService.getFilteredProducts(params).subscribe({
      next: (res: any) => {
        this.filteredProducts = res.products;

        if (this.selectedSort === 'low') {
          this.filteredProducts.sort((a, b) => a.price - b.price);
        } else if (this.selectedSort === 'high') {
          this.filteredProducts.sort((a, b) => b.price - a.price);
        }
      },
      error: (err) => console.error(err),
    });
  }
}
