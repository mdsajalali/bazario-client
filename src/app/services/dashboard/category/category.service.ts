import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  http = inject(HttpClient);

  createCategory(category: { name: string; image: string }): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/categories', category);
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/categories');
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete<any>(environment.apiUrl + `/categories/${id}`);
  }
}
