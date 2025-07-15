import { Component, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BrandsService } from '../../../services/dashboard/brands/brands.service';

interface Brand {
  brandId: string;
  name: string;
}

@Component({
  selector: 'app-brands',
  imports: [
    TableModule,
    HttpClientModule,
    InputTextModule,
    IconField,
    InputIcon,
    SelectModule,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent {
  brands!: Brand[];
  brandService = inject(BrandsService);
  loading: boolean = true;

  globalFilterValue: string = '';

  ngOnInit() {
    this.getBrands();
  }

  getBrands() {
    return this.brandService.getBrands().subscribe({
      next: (result: any) => {
        this.brands = result;
        this.loading = false;
      },
      error: (error) => {
        console.log(error);
        this.loading = false;
      },
    });
  }

  deleteBrand(id: string) {
    return this.brandService.deleteBrand(id).subscribe({
      next: () => {
        alert('deleted');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getGlobalFilterValue(filter: any): string {
    if (filter && !Array.isArray(filter)) {
      return filter.value || '';
    }
    return '';
  }
}
