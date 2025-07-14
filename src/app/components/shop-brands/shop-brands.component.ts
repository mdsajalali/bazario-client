import { Component, inject, OnInit } from '@angular/core';
import { BrandsType } from '../../types';
import { ProductsService } from '../../services/products/products.service';

@Component({
  selector: 'app-shop-brands',
  imports: [],
  templateUrl: './shop-brands.component.html',
  styleUrl: './shop-brands.component.scss',
})
export class ShopBrandsComponent implements OnInit {
  brands: BrandsType[] = [];
  loading: boolean = true;

  brandService = inject(ProductsService);

  ngOnInit() {
    this.brandService.getBrands().subscribe({
      next: (result: any) => {
        this.brands = result;
        this.loading = false;
      },
      error: (error) => {
        console.log(error);
        this.loading = false;
      },
    });
  }
}
