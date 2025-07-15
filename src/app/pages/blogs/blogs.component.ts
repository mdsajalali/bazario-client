import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/shared/header/header.component";
import { FooterComponent } from "../../components/shared/footer/footer.component";
import { HomeBlogsComponent } from "../../components/home-blogs/home-blogs.component";

@Component({
  selector: 'app-blogs',
  imports: [HeaderComponent, FooterComponent, HomeBlogsComponent],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss'
})
export class BlogsComponent {

}
