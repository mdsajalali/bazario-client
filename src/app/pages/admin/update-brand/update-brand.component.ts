import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { BrandsService } from '../../../services/dashboard/brands.service';

@Component({
  selector: 'app-update-brand',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    MessageModule,
  ],
  templateUrl: './update-brand.component.html',
  styleUrl: './update-brand.component.scss',
  providers: [MessageService],
})
export class UpdateBrandComponent implements OnInit {
  messageService = inject(MessageService);
  brandService = inject(BrandsService);
  router = inject(Router);
  activeRoute = inject(ActivatedRoute);
  loading: boolean = true;

  brandForm: FormGroup;

  formSubmitted = false;

  constructor(private fb: FormBuilder) {
    this.brandForm = this.fb.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  ngOnInit() {
    const id = this.activeRoute.snapshot.paramMap.get('id') || '';
    this.brandService.getBrandById(id).subscribe({
      next: (result: any) => {
        this.brandForm.patchValue({
          name: result.name,
          image: result.image,
        });
        this.loading = false;
      },
    });
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.brandForm.valid) {
      const id = this.activeRoute.snapshot.paramMap.get('id') || '';

      const updateBrand = {
        name: this.brandForm.value.name,
        image: this.brandForm.value.image,
      };

      this.brandService.updateBrand(id, updateBrand).subscribe({
        next: (result: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: result.message,
            life: 3000,
          });

          console.log('Brand Value', this.brandForm.value);
          this.brandForm.reset();
          this.formSubmitted = false;

          setTimeout(() => {
            this.router.navigateByUrl('/dashboard/brands');
          }, 1000);
        },
      });
    }
  }

  isInvalid(controlName: string) {
    const control = this.brandForm.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted);
  }
}
