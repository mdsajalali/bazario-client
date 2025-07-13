import { Component } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { FooterComponent } from "../shared/footer/footer.component";
import { RecentProductsComponent } from "../recent-products/recent-products.component";

@Component({
  selector: 'app-product-details',
  imports: [HeaderComponent, FooterComponent, RecentProductsComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {

}
