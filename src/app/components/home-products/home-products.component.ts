import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home-products',
  imports: [ButtonModule, RouterLink],
  templateUrl: './home-products.component.html',
  styleUrl: './home-products.component.scss',
})
export class HomeProductsComponent {}
