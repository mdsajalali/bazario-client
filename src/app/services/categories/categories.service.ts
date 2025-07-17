import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { CategoriesType } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  http = inject(HttpClient);

  getCategories(): Observable<CategoriesType> {
    return this.http.get<CategoriesType>(environment.apiUrl + '/shop/categories');
  }
}
