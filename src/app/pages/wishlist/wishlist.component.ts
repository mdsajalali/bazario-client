import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/shared/header/header.component';
import { FooterComponent } from '../../components/shared/footer/footer.component';
import { WishlistService } from '../../services/wishlist.service';
import { ProductType } from '../../types';
import { ProductCardComponent } from '../../components/shared/product-card/product-card.component';

@Component({
  selector: 'app-wishlist',
  imports: [HeaderComponent, FooterComponent, ProductCardComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit {
  wishlistService = inject(WishlistService);
  wishlists: ProductType[] = [];
  loading: boolean = true;

  ngOnInit() {
    this.reloadWishlist();
  }

  reloadWishlist() {
    this.loading = true;
    this.wishlistService.getWishlists().subscribe({
      next: (result: any) => {
        this.wishlists = result;
        this.loading = false;

        this.wishlistService.updateWishlistCount();
      },
      error: (error) => {
        console.log(error);
        this.loading = false;
      },
    });
  }
}
