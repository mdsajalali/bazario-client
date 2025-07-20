import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ProductType } from '../../../types';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../../services/wishlist.service';
import { CartsService } from '../../../services/carts/carts.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-product-card',
  imports: [ButtonModule, RouterLink, Toast],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  providers: [MessageService],
})
export class ProductCardComponent implements OnInit {
  @Input() product!: ProductType;
  @Output() wishlistChanged = new EventEmitter<void>();
  wishlistService = inject(WishlistService);
  isWishlisted: boolean = false;
  cartService = inject(CartsService);
  messageService = inject(MessageService);

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
      this.isWishlisted = false;
      this.removeToWishlist(id);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Removed from your wishlist!',
      });
      this.wishlistChanged.emit();
    } else {
      this.isWishlisted = true;
      this.addToWishlist(id);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Added to your wishlist!',
      });
    }
  }

  addToWishlist(id: string) {
    this.wishlistService.addToWishlist(id).subscribe({
      next: () => {
        this.checkWishlistStatus();
        this.wishlistService.updateWishlistCount();  
      },
      error: (error) => console.log(error),
    });
  }

  removeToWishlist(id: string) {
    this.wishlistService.removeToWishlist(id).subscribe({
      next: () => {
        this.checkWishlistStatus();
        this.wishlistService.updateWishlistCount(); 
      },
      error: (error) => console.log(error),
    });
  }

  addToCart(product: ProductType) {
    this.cartService.addToCart(product._id!, 1).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Product added to cart!',
      });
      this.cartService.updateCartCount();  
    });
  }
}
