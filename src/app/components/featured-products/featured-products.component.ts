import { Component, inject, OnInit } from '@angular/core';
import { Carousel } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { NgStyle } from '@angular/common';
import { ProductType } from '../../types';
import { ProductsService } from '../../services/products/products.service';

@Component({
  selector: 'app-featured-products',
  imports: [Carousel, ButtonModule, Tag, NgStyle],
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.scss',
})
export class FeaturedProductsComponent implements OnInit {
  products: ProductType[] = [];
  productService = inject(ProductsService);

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (result: any) => {
        this.products = result.filter((p: ProductType) => p.isFeatured);
      },
      error: (error) => {
        console.log(error);
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
