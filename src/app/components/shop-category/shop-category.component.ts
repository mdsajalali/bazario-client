import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories/categories.service';
import { CategoriesType } from '../../types';

@Component({
  selector: 'app-shop-category',
  imports: [],
  templateUrl: './shop-category.component.html',
  styleUrl: './shop-category.component.scss',
})
export class ShopCategoryComponent implements OnInit {
  categoriesService = inject(CategoriesService);
  categories: CategoriesType[] = [];
  loading: boolean = true;

  ngOnInit() {
    this.categoriesService.getCategories().subscribe({
      next: (result: any) => {
        this.categories = result;
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
      },
    });
  }
}
