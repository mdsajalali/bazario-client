import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLinkActive, RouterModule } from '@angular/router';
import { WishlistService } from '../../../services/wishlist.service';
import { AuthService } from '../../../services/auth/auth.service';

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
  wishlistLength = 0;

  ngOnInit() {
    this.wishlistService.getWishlists().subscribe((wishlists: any) => {
      this.wishlistLength = wishlists.length;
    });
  }

  onSearchEnter() {
    if (this.searchValue.trim()) {
      this.router.navigate(['/search'], {
        queryParams: { q: this.searchValue.trim() },
      });
    } else {
      console.log('Search input is empty');
    }
  }

  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
  }

  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
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
