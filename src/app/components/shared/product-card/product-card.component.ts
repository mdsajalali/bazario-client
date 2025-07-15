import { Component, inject, Input, OnInit } from '@angular/core';
import { ProductType } from '../../../types';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../../services/wishlist.service';

@Component({
  selector: 'app-product-card',
  imports: [ButtonModule, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent implements OnInit {
  @Input() product!: ProductType;
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
}
