import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MenuKey } from '../../../types';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, NgClass, ButtonModule, RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  submenuOpen: Record<MenuKey, boolean> = {
    products: false,
    brands: false,
    categories: false,
    blogs: false,
  };

  mobileSidebarVisible = false;
  router = inject(Router);

  get isMobile(): boolean {
    return window.innerWidth <= 768;
  }

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
    this.mobileSidebarVisible = false; 
  }

  toggleMobileSidebar(): void {
    this.mobileSidebarVisible = !this.mobileSidebarVisible;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigateByUrl('/login');
  }
}
