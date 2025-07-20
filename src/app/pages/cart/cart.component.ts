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
import { Toast, ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { OrdersService } from '../../services/orders/orders.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

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
    Toast,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  providers: [MessageService],
})
export class CartComponent {
  orderStep: number = 0;
  cartService = inject(CartsService);
  paymentType: string = '';
  orderService = inject(OrdersService);
  router = inject(Router);
  messageService = inject(MessageService);

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
    this.cartService.addToCart(productId, quantity).subscribe(() => {
      this.cartService.init();

      this.cartService.updateCartCount();  
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
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Product removed from cart!',
          life: 3000,
        });

        this.cartService.init();

        this.cartService.updateCartCount();  
      },
    });
  }

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
    this.orderService.addOrder(order).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Your order has been completed!!',
        life: 3000,
      });
      this.cartService.init();
      this.cartService.updateCartCount();  
      this.orderStep = 0;
      this.deliveryForm.reset();
      setTimeout(() => {
        this.router.navigateByUrl('/orders');
      }, 2000);
    });
  }
}
