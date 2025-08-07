import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { HomeBlogsComponent } from '../home-blogs/home-blogs.component';
import { BlogsService } from '../../services/blogs/blogs.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-details',
  imports: [HeaderComponent, FooterComponent, HomeBlogsComponent, CommonModule],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.scss',
})
export class BlogDetailsComponent {
  blogService = inject(BlogsService);
  blog: any = {};
  loading: boolean = true;
  router = inject(ActivatedRoute);

  ngOnInit() {
    console.log(this.router);
    this.loading = true;
    const id = this.router.snapshot.paramMap.get('id') || '';
    this.blogService.getSingleBlog(id).subscribe({
      next: (result: any) => {
        this.blog = result;
        this.loading = false;
      },
      error: (error) => {
        console.log(error);
        this.loading = false;
      },
    });
  }
}
