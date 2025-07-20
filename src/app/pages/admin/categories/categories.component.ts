import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../services/dashboard/category/category.service';
import { MessageService } from 'primeng/api';
import { Toast } from "primeng/toast";

interface Category {
  _id: string;
  name: string;
  image: string;
}

@Component({
  selector: 'app-categories',
  imports: [
    TableModule,
    HttpClientModule,
    InputTextModule,
    IconField,
    InputIcon,
    SelectModule,
    FormsModule,
    RouterLink,
    Toast
],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
  providers: [MessageService],
})
export class CategoriesComponent {
  categories!: Category[];
  categoryService = inject(CategoryService);
  loading: boolean = true;
  messageService = inject(MessageService);

  globalFilterValue: string = '';

  ngOnInit() {
    this.getCategory();
  }

  getCategory() {
    this.categoryService.getCategories().subscribe({
      next: (result: any) => {
        this.categories = result;
        this.loading = false;
      },
    });
  }

  deleteCategory(id: string) {
    this.categoryService.deleteCategory(id).subscribe({
      next: (result: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Category deleted successfully!',
          life: 3000,
        });
        this.getCategory();
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
