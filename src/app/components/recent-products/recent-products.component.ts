import { Component, inject } from '@angular/core';
import { Carousel } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { ProductType } from '../../types';
import { ProductsService } from '../../services/products/products.service';
import { ProductCardComponent } from "../shared/product-card/product-card.component";

@Component({
  selector: 'app-recent-products',
  imports: [Carousel, ButtonModule, ProductCardComponent],
  templateUrl: './recent-products.component.html',
  styleUrl: './recent-products.component.scss',
})
export class RecentProductsComponent {
  products: ProductType[] = [];
  productService = inject(ProductsService);
  loading: boolean = true;

  ngOnInit() {
    this.productService.getNewProducts().subscribe({
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

  responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 4,
      numScroll: 1,
    },
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1,
    },
  ];
}
