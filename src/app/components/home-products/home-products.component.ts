import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ProductsService } from '../../services/products/products.service';
import { ProductType } from '../../types';
import { ProductCardComponent } from "../shared/product-card/product-card.component";

@Component({
  selector: 'app-home-products',
  imports: [ButtonModule, RouterLink, ProductCardComponent],
  templateUrl: './home-products.component.html',
  styleUrl: './home-products.component.scss',
})
export class HomeProductsComponent implements OnInit {
  productService = inject(ProductsService);
  products: ProductType[] = [];
  loading: boolean = true;

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (result) => {
        this.products = result;
        this.loading = false;
      },
      error: () => {
        this.products = [];
        this.loading = false;
      },
    });
  }
}
