import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ProductsService } from '../../services/products/products.service';
import { ProductType } from '../../types';

@Component({
  selector: 'app-home-products',
  imports: [ButtonModule, RouterLink],
  templateUrl: './home-products.component.html',
  styleUrl: './home-products.component.scss',
})
export class HomeProductsComponent implements OnInit {
  productService = inject(ProductsService);
  products: ProductType[] = [];

  ngOnInit() {
    this.productService.getProducts().subscribe((result) => {
      this.products = result;
    });
  }
}
