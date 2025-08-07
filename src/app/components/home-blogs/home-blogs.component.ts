import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogsService } from '../../services/blogs/blogs.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-blogs',
  imports: [RouterLink, CommonModule],
  templateUrl: './home-blogs.component.html',
  styleUrl: './home-blogs.component.scss',
})
export class HomeBlogsComponent {
  blogsService = inject(BlogsService);
  blogs: any = [];
  loading: boolean = true;

  ngOnInit() {
    this.loading = true;
    this.blogsService.getBlogs().subscribe({
      next: (result: any) => {
        this.blogs = result;
        this.loading = false;
      },
      error: (error) => {
        console.log(error);
        this.loading = false;
      },
    });
  }
}
