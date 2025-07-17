import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { ProductType } from '../../types';
import { ProductsService } from '../../services/products/products.service';
import { ProductCardComponent } from "../shared/product-card/product-card.component";

@Component({
  selector: 'app-shop',
  imports: [HeaderComponent, FooterComponent, ProductCardComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent {
  products: ProductType[] = [];
  productService = inject(ProductsService);

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
  }
}
