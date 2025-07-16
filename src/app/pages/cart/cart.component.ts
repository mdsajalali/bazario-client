import { HeaderComponent } from '../../components/shared/header/header.component';
import { FooterComponent } from '../../components/shared/footer/footer.component';
import { Component, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CartsService } from '../../services/carts/carts.service';
import { ProductType } from '../../types';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { OrdersService } from '../../services/orders/orders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [
    HeaderComponent,
    FooterComponent,
    TableModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    MessageModule,
    FormsModule,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  orderStep: number = 0;
  cartService = inject(CartsService);
  paymentType: string = '';
  orderService = inject(OrdersService);
  router = inject(Router);

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

  // order functionality
  deliveryForm: FormGroup;
  formSubmitted = false;

  constructor(private fb: FormBuilder) {
    this.deliveryForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      country: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.deliveryForm.valid) {
      this.orderStep = 2;
      this.deliveryForm.reset();
      this.formSubmitted = false;
    }
  }

  isInvalid(controlName: string) {
    const control = this.deliveryForm.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted);
  }

  // order functionality
  completeOrder() {
    let order = {
      items: this.cartItems,
      paymentType: this.paymentType,
      address: this.deliveryForm.value,
      date: new Date(),
      totalAmount: this.totalAmount,
    };
    this.orderService.addOrder(order).subscribe((result) => {
      alert('Your order is completed');
      this.cartService.init();
      this.orderStep = 0;
      this.router.navigateByUrl('/orders');
    });
  }
}
