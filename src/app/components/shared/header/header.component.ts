import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { WishlistService } from '../../../services/wishlist.service';
import { AuthService } from '../../../services/auth/auth.service';
import { CartsService } from '../../../services/carts/carts.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isSearchOpen = false;
  searchValue: string = '';
  router = inject(Router);
  wishlistService = inject(WishlistService);
  authService = inject(AuthService);
  cartService = inject(CartsService);
  wishlistLength = 0;
  cartCount = 0;

  ngOnInit() {
    this.wishlistService.wishlistCount$.subscribe((count) => {
      this.wishlistLength = count;
      console.log('wishlist', this.wishlistLength);
    });

    this.cartService.cartCount$.subscribe((count) => {
      this.cartCount = count;
      console.log('count', this.cartCount);
    });

    this.wishlistService.updateWishlistCount();
    this.cartService.updateCartCount();
  }

  onSearchEnter() {
    if (this.searchValue.trim()) {
      this.router.navigate(['/shop'], {
        queryParams: { q: this.searchValue.trim() },
      });
    } else {
      console.log('Search input is empty');
    }
  }

  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin;
  }

  // logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigateByUrl('/login');
  }
}
