import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
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
  router = inject(Router)

  productForm!: FormGroup;
  formSubmitted = false;

  categories = [
    { label: 'Apple', value: 'apple' },
    { label: 'Vivo', value: 'vivo' },
    { label: 'Oppo', value: 'oppo' },
  ];
  brands = [
    { label: 'Brand 1', value: 'brand1' },
    { label: 'Brand 2', value: 'brand2' },
    { label: 'Brand 3', value: 'brand3' },
  ];

  selectedCategory: any = null;
  selectedBrand: any = null;

  uploadedImages: File[] = [];

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      shortDescription: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, Validators.required],
      discount: [null, Validators.required],
      isFeatured: [false],
      isNew: [false],
      category: [null, Validators.required],
      brand: [null, Validators.required],
      images: [null, Validators.required],
    });
  }

  onCategoryChange(value: string) {
    this.productForm.patchValue({ category: value });
  }

  onBrandChange(value: string) {
    this.productForm.patchValue({ brand: value });
  }

  onFileChange(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.uploadedImages = Array.from(files);
      this.productForm.patchValue({ images: this.uploadedImages });
    }
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.productForm.valid) {
      console.log('✅ Form Data:', this.productForm.value);
      console.log('📦 Images:', this.uploadedImages);

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Product updated successfully!',
        life: 3000,
      });

      this.productForm.reset();
      this.selectedBrand = null;
      this.selectedCategory = null;
      this.uploadedImages = [];
      this.formSubmitted = false;
      setTimeout(()=> {
        this.router.navigateByUrl("/dashboard/products")
      }, 1000)
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
