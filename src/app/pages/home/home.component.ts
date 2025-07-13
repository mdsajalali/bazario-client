import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/shared/header/header.component";
import { FooterComponent } from "../../components/shared/footer/footer.component";
import { BannerComponent } from "../../components/banner/banner.component";

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, FooterComponent, BannerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
