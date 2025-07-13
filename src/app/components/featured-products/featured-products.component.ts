import { Component } from '@angular/core';
import { Carousel } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { NgStyle } from '@angular/common';

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  inventoryStatus: 'INSTOCK' | 'LOWSTOCK' | 'OUTOFSTOCK';
}

@Component({
  selector: 'app-featured-products',
  imports: [Carousel, ButtonModule, Tag, NgStyle],
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.scss',
})
export class FeaturedProductsComponent {
  products: Product[] = [
    {
      id: '1',
      name: 'PlayStation 5',
      image: 'game-controller.jpg',
      price: 499,
      inventoryStatus: 'INSTOCK',
    },
    {
      id: '2',
      name: 'Xbox Series X',
      image: 'xbox.jpg',
      price: 499,
      inventoryStatus: 'LOWSTOCK',
    },
    {
      id: '3',
      name: 'Nintendo Switch',
      image: 'nintendo.jpg',
      price: 299,
      inventoryStatus: 'INSTOCK',
    },
    {
      id: '4',
      name: 'VR Headset',
      image: 'vr.jpg',
      price: 399,
      inventoryStatus: 'OUTOFSTOCK',
    },
    {
      id: '5',
      name: 'Gaming Chair',
      image: 'chair.jpg',
      price: 150,
      inventoryStatus: 'INSTOCK',
    },
    {
      id: '6',
      name: 'Gaming Monitor',
      image: 'monitor.jpg',
      price: 299,
      inventoryStatus: 'LOWSTOCK',
    },
    {
      id: '7',
      name: 'Graphics Card',
      image: 'gpu.jpg',
      price: 699,
      inventoryStatus: 'INSTOCK',
    },
    {
      id: '8',
      name: 'Mechanical Keyboard',
      image: 'keyboard.jpg',
      price: 120,
      inventoryStatus: 'INSTOCK',
    },
    {
      id: '9',
      name: 'Gaming Mouse',
      image: 'mouse.jpg',
      price: 80,
      inventoryStatus: 'LOWSTOCK',
    },
    {
      id: '10',
      name: 'Gaming Desk',
      image: 'desk.jpg',
      price: 199,
      inventoryStatus: 'OUTOFSTOCK',
    },
  ];

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

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warn';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return '';
    }
  }
}
