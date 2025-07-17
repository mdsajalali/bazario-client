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
import { FormsModule } from '@angular/forms';
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
  productService = inject(ProductsService);
  categoryService = inject(CategoryService);
  brandService = inject(BrandsService);

  products: ProductType[] = [];
  filteredProducts: ProductType[] = [];

  brands: any[] = [];
  categories: any[] = [];

  selectedBrands: string[] = [];
  selectedCategories: string[] = [];
  selectedSort: string | null = null;

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (result: any) => {
        this.products = result.products;
        this.filteredProducts = [...this.products];
      },
      error: (error) => console.log(error),
    });

    this.brandService.getBrands().subscribe({
      next: (result: any) => (this.brands = result),
      error: (error) => console.log(error),
    });

    this.categoryService.getCategories().subscribe({
      next: (result: any) => (this.categories = result),
      error: (error) => console.log(error),
    });
  }

  onFilterChange() {
    this.filteredProducts = this.products.filter((product: any) => {
      const brandMatch = this.selectedBrands.length
        ? this.selectedBrands.includes(product.brandId?.name)
        : true;
      const categoryMatch = this.selectedCategories.length
        ? this.selectedCategories.includes(product.categoryId?.name)
        : true;
      return brandMatch && categoryMatch;
    });

    if (this.selectedSort === 'low') {
      this.filteredProducts.sort((a, b) => a.price - b.price);
    } else if (this.selectedSort === 'high') {
      this.filteredProducts.sort((a, b) => b.price - a.price);
    }

    console.log('Filtered:', this.filteredProducts);
  }
}
