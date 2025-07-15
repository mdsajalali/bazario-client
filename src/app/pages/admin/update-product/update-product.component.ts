import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { ProductsService } from '../../../services/dashboard/products/products.service';
import { CategoryService } from '../../../services/dashboard/category/category.service';
import { BrandsService } from '../../../services/dashboard/brands/brands.service';

@Component({
  selector: 'app-update-product',
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
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss',
  providers: [MessageService],
})
export class UpdateProductComponent {
  messageService = inject(MessageService);
  router = inject(Router);
  activeRoute = inject(ActivatedRoute);
  productService = inject(ProductsService);
  categories: any[] = [];
  brands: any[] = [];

  categoryService = inject(CategoryService);
  brandService = inject(BrandsService);

  productForm!: FormGroup;
  formSubmitted = false;

  selectedCategory: any = null;
  selectedBrand: any = null;

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
    const id = this.activeRoute.snapshot.paramMap.get('id') || '';
    this.productService.getProductById(id).subscribe({
      next: (result: any) => {
        this.productForm.patchValue({
          name: result.name,
          shortDescription: result.shortDescription,
          description: result.description,
          price: result.price,
          discount: result.discount,
          isFeatured: result.isFeatured,
          isNew: result.isNew,
          categoryId: result.categoryId?._id || result.categoryId,
          brandId: result.brandId?._id || result.brandId,
          images: result.images,
        });
        this.selectedCategory = result.categoryId?._id || result.categoryId;
        this.selectedBrand = result.brandId?._id || result.brandId;
      },
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
      const id = this.activeRoute.snapshot.paramMap.get('id') || '';

      const value = this.productForm.value;

      const product = {
        ...value,
        categoryId: value.categoryId?.value || value.categoryId,
        brandId: value.brandId?.value || value.brandId,
      };

      this.productService.updateProduct(id, product).subscribe({
        next: (result: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: result.message,
            life: 3000,
          });

          this.productForm.reset();
          this.selectedBrand = null;
          this.selectedCategory = null;
          this.formSubmitted = false;
          setTimeout(() => {
            this.router.navigateByUrl('/dashboard/products');
          }, 1000);
        },
        error: (error) => {
          console.log(error);
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
