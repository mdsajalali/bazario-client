import { Component, Input } from '@angular/core';
import { ProductType } from '../../../types';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [ButtonModule, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product!: ProductType;
}
