import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/shared/header/header.component";
import { FooterComponent } from "../../components/shared/footer/footer.component";

@Component({
  selector: 'app-cart',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

}
