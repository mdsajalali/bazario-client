import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MenuKey } from '../../../types';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgClass],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  submenuOpen: Record<MenuKey, boolean> = {
    products: false,
    brands: false,
    categories: false,
  };

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
}
