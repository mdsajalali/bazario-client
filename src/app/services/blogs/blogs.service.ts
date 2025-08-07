import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  http = inject(HttpClient);

  getBlogs() {
    return this.http.get(environment.apiUrl + '/blogs');
  }

  getSingleBlog(id: string) {
    return this.http.get(environment.apiUrl + `/blogs/${id}`);
  }
}
