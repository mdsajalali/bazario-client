import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MenuKey } from '../../../types';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, NgClass, ButtonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  submenuOpen: Record<MenuKey, boolean> = {
    products: false,
    brands: false,
    categories: false,
  };

  router = inject(Router);

  toggleSubmenu(menu: MenuKey): void {
    const currentlyOpen = this.submenuOpen[menu];

    for (const key of Object.keys(this.submenuOpen) as MenuKey[]) {
      this.submenuOpen[key] = false;
    }

    this.submenuOpen[menu] = !currentlyOpen;
  }

  closeAllSubmenus(): void {
    for (const key of Object.keys(this.submenuOpen) as MenuKey[]) {
      this.submenuOpen[key] = false;
    }
  }

  // logout
  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}
