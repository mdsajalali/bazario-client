import { Component, Input } from '@angular/core';
import { ProductType } from '../../../types';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-product-card',
  imports: [ButtonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product!: ProductType;
}
