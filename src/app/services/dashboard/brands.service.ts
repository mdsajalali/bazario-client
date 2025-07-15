import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  http = inject(HttpClient);

  createBrand(brand: { name: string; image: string }): Observable<any> {
    return this.http.post(environment.apiUrl + '/brands', brand);
  }
}
