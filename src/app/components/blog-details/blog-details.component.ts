import { Component } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { FooterComponent } from "../shared/footer/footer.component";
import { HomeBlogsComponent } from "../home-blogs/home-blogs.component";

@Component({
  selector: 'app-blog-details',
  imports: [HeaderComponent, FooterComponent, HomeBlogsComponent],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.scss'
})
export class BlogDetailsComponent {

}
