import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ProductType } from '../../../types';
import { WishlistService } from '../../../services/wishlist.service';
import { CartsService } from '../../../services/carts/carts.service';

@Component({
  selector: 'app-base-product-card',
  imports: [ButtonModule, RouterLink],
  templateUrl: './base-product-card.component.html',
  styleUrl: './base-product-card.component.scss',
})
export class BaseProductCardComponent {
  @Input() product!: ProductType;
  cartService = inject(CartsService);

  wishlistService = inject(WishlistService);
  isWishlisted: boolean = false;

  ngOnInit() {
    this.checkWishlistStatus();
  }

  checkWishlistStatus() {
    this.wishlistService.getWishlists().subscribe({
      next: (wishlist: any) => {
        this.isWishlisted = wishlist.some(
          (item: any) => item._id === this.product._id
        );
      },
    });
  }

  toggleWishlist(id: string) {
    if (this.isWishlisted) {
      this.removeToWishlist(id);
    } else {
      this.addToWishlist(id);
    }
  }

  addToWishlist(id: string) {
    this.wishlistService.addToWishlist(id).subscribe({
      next: () => {
        this.checkWishlistStatus();
        alert('Wishlist Added!');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  removeToWishlist(id: string) {
    this.wishlistService.removeToWishlist(id).subscribe({
      next: () => {
        this.checkWishlistStatus();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  addToCart(product: ProductType) {
    this.cartService.addToCart(product._id!, 1).subscribe(() => {
      this.cartService.init();
    });
  }
}
