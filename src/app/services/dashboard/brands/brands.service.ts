import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  http = inject(HttpClient);

  createBrand(brand: { name: string; image: string }): Observable<any> {
    return this.http.post(environment.apiUrl + '/brands', brand);
  }

  getBrands(): Observable<any> {
    return this.http.get(environment.apiUrl + '/brands');
  }

  getBrandById(id: string): Observable<any> {
    return this.http.get(environment.apiUrl + `/brands/${id}`);
  }

  deleteBrand(id: string): Observable<any> {
    return this.http.delete(environment.apiUrl + `/brands/${id}`);
  }

  updateBrand(
    id: string,
    brand: { name: string; image: string }
  ): Observable<any> {
    return this.http.put(environment.apiUrl + `/brands/${id}`, brand);
  }
}
