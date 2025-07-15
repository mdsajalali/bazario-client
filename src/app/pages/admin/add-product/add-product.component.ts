import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { CategoryService } from '../../../services/dashboard/category/category.service';
import { BrandsService } from '../../../services/dashboard/brands/brands.service';
import { ProductsService } from '../../../services/dashboard/products/products.service';

@Component({
  selector: 'app-add-product',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    MessageModule,
    NgClass,
    SelectModule,
    CheckboxModule,
    FormsModule,
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
  providers: [MessageService],
})
export class AddProductComponent implements OnInit {
  messageService = inject(MessageService);
  router = inject(Router);
  categories: any[] = [];
  brands: any[] = [];

  categoryService = inject(CategoryService);
  brandService = inject(BrandsService);
  productService = inject(ProductsService);

  productForm!: FormGroup;
  formSubmitted = false;

  selectedCategory: any = null;
  selectedBrand: any = null;

  ngOnInit() {
    this.categoryService.getCategories().subscribe({
      next: (result: any) => {
        this.categories = result.map((item: any) => ({
          label: item.name,
          value: item._id,
        }));
      },
    });

    this.brandService.getBrands().subscribe({
      next: (result: any) => {
        this.brands = result.map((item: any) => ({
          label: item.name,
          value: item._id,
        }));
      },
    });
  }

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      shortDescription: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, Validators.required],
      discount: [null, Validators.required],
      isFeatured: [false],
      isNew: [false],
      categoryId: [null, Validators.required],
      brandId: [null, Validators.required],
      images: [null, Validators.required],
    });
  }

  onCategoryChange(value: any) {
    this.productForm.patchValue({ categoryId: value });
  }

  onBrandChange(value: any) {
    this.productForm.patchValue({ brandId: value });
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.productForm.valid) {
      const value = this.productForm.value;

      const product = {
        ...value,
        categoryId: value.categoryId?.value || value.categoryId,
        brandId: value.brandId?.value || value.brandId,
      };

      console.log('✅ Form Data:', product);

      this.productService.createProduct(product).subscribe({
        next: (result: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: result.message,
            life: 3000,
          });

          console.log('result', result);

          this.productForm.reset();
          this.selectedBrand = null;
          this.selectedCategory = null;
          this.formSubmitted = false;
          setTimeout(() => {
            this.router.navigateByUrl('/dashboard/products');
          }, 1000);
        },
      });
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.productForm.get(controlName);
    return !!(
      control &&
      control.invalid &&
      (control.touched || this.formSubmitted)
    );
  }
}
