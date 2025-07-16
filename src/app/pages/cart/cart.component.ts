import { HeaderComponent } from '../../components/shared/header/header.component';
import { FooterComponent } from '../../components/shared/footer/footer.component';
import { Component, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CartsService } from '../../services/carts/carts.service';
import { ProductType } from '../../types';

@Component({
  selector: 'app-cart',
  imports: [HeaderComponent, FooterComponent, TableModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  orderStep: number = 0;
  cartService = inject(CartsService);

  get checkoutOrderStepUpdate() {
    return (this.orderStep = 1);
  }

  ngOnInit() {
    this.cartService.init();
  }

  get cartItems() {
    return this.cartService.items as any;
  }

  sellingPrice(product: ProductType) {
    return product.price - (product.price * product.discount) / 100;
  }

  addToCart(productId: string, quantity: number) {
    this.cartService.addToCart(productId, quantity).subscribe((result) => {
      this.cartService.init();
    });
  }

  get totalAmount() {
    let amount = 0;
    for (let index = 0; index < this.cartItems.length; index++) {
      const element = this.cartItems[index];
      amount += this.sellingPrice(element.product) * element.quantity;
    }
    return amount;
  }

  removeFormCart(productId: string) {
    this.cartService.removeFormCart(productId).subscribe({
      next: () => {
        alert('Product remove to cart');
      },
    });
  }
}
