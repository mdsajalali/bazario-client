import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ProductType } from '../../../types';

@Component({
  selector: 'app-base-product-card',
  imports: [ButtonModule, RouterLink],
  templateUrl: './base-product-card.component.html',
  styleUrl: './base-product-card.component.scss',
})
export class BaseProductCardComponent {
  @Input() product!: ProductType;
}
