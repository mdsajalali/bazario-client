import { HeaderComponent } from '../../components/shared/header/header.component';
import { FooterComponent } from '../../components/shared/footer/footer.component';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
interface Order {
  product: string;
  productName: string;
  price: string;
  quantity: string;
  total: number;
}

@Component({
  selector: 'app-cart',
  imports: [HeaderComponent, FooterComponent, TableModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  orders!: Order[];
  orderStep: number = 0;

  get checkoutOrderStepUpdate() {
    return (this.orderStep = 1);
  }

  ngOnInit() {
    this.getOrders().then((data) => (this.orders = data));
  }

  getOrders(): Promise<Order[]> {
    return Promise.resolve([
      {
        product: 'Vivo',
        productName: 'John Doe',
        price: 'Card',
        quantity: '2025-07-10',
        total: 150,
      },
      {
        product: 'Vivo',
        productName: 'Jane Smith',
        price: 'Online',
        quantity: '2025-07-08',
        total: 220,
      },
      {
        product: 'Vivo',
        productName: 'Alice Brown',
        price: 'Cash',
        quantity: '2025-07-06',
        total: 95,
      },
      {
        product: 'Vivo',
        productName: 'Bob Martin',
        price: 'Card',
        quantity: '2025-07-04',
        total: 175,
      },
      {
        product: 'Vivo',
        productName: 'Clara Wilson',
        price: 'Online',
        quantity: '2025-07-01',
        total: 310,
      },
    ]);
  }
}
