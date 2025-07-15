import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { WishlistService } from '../../../services/wishlist.service';

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
    return !!localStorage.getItem('token');
  }

  // logout
  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}
