import { Component, inject, Input } from '@angular/core';
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
export class ProductCardComponent {
  @Input() product!: ProductType;
  wishlistService = inject(WishlistService);

  addToWishlist(id: string) {
    this.wishlistService.addToWishlist(id).subscribe({
      next: (result: any) => {
        console.log(result);
        alert('Add to wishlist');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
