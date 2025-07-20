import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { CategoryService } from '../../../services/dashboard/category/category.service';

@Component({
  selector: 'app-add-category',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    MessageModule,
  ],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss',
  providers: [MessageService],
})
export class AddCategoryComponent {
  messageService = inject(MessageService);
  categoryService = inject(CategoryService);
  router = inject(Router);

  categoryForm: FormGroup;

  formSubmitted = false;

  constructor(private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.categoryForm.valid) {
      const value = {
        name: this.categoryForm.value.name,
        image: this.categoryForm.value.image,
      };
      this.categoryService.createCategory(value).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Category created successfully!',
            life: 3000,
          });
          this.categoryForm.reset();
          this.formSubmitted = false;
          setTimeout(() => {
            this.router.navigateByUrl('/dashboard/categories');
          }, 1000);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  isInvalid(controlName: string) {
    const control = this.categoryForm.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted);
  }
}
