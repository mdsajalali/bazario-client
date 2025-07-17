import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { ProductType } from '../../types';
import { ProductsService } from '../../services/products/products.service';
import { ProductCardComponent } from '../shared/product-card/product-card.component';
import { CategoryService } from '../../services/dashboard/category/category.service';
import { BrandsService } from '../../services/dashboard/brands/brands.service';

@Component({
  selector: 'app-shop',
  imports: [HeaderComponent, FooterComponent, ProductCardComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent {
  products: ProductType[] = [];
  brands: any[] = [];
  categories: any[] = [];
  productService = inject(ProductsService);
  categoryService = inject(CategoryService);
  brandService = inject(BrandsService);

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (result: any) => {
        this.products = result.products;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.brandService.getBrands().subscribe({
      next: (result: any) => {
        this.brands = result;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.categoryService.getCategories().subscribe({
      next: (result: any) => {
        this.categories = result;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
