import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { CategoryService } from '../../../services/dashboard/category/category.service';

@Component({
  selector: 'app-update-category',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    MessageModule,
  ],
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.scss',
  providers: [MessageService],
})
export class UpdateCategoryComponent {
  messageService = inject(MessageService);
  categoryService = inject(CategoryService);
  router = inject(Router);
  activeRoute = inject(ActivatedRoute);
  loading: boolean = true;

  categoryForm: FormGroup;

  formSubmitted = false;

  constructor(private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  ngOnInit() {
    const id = this.activeRoute.snapshot.paramMap.get('id') || '';
    this.categoryService.getCategoryById(id).subscribe({
      next: (result: any) => {
        this.categoryForm.patchValue({
          name: result.name,
          image: result.image,
        });
        this.loading = false;
      },
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.categoryForm.valid) {
      const id = this.activeRoute.snapshot.paramMap.get('id') || '';
      const category = {
        name: this.categoryForm.value.name,
        image: this.categoryForm.value.image,
      };
      this.categoryService.updateCategory(id, category).subscribe({
        next: (result: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: result.message,
            life: 3000,
          });
          this.categoryForm.reset();
          this.formSubmitted = false;
          setTimeout(() => {
            this.router.navigateByUrl('/dashboard/categories');
          }, 1000);
        },
      });
    }
  }

  isInvalid(controlName: string) {
    const control = this.categoryForm.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted);
  }
}
