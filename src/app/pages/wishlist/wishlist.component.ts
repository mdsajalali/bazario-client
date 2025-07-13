import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/shared/header/header.component";
import { FooterComponent } from "../../components/shared/footer/footer.component";

@Component({
  selector: 'app-wishlist',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {

}
