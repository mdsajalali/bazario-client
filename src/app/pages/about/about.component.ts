import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/shared/header/header.component";
import { FooterComponent } from "../../components/shared/footer/footer.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [HeaderComponent, FooterComponent, CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
