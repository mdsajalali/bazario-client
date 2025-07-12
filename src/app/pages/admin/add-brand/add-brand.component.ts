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

@Component({
  selector: 'app-add-brand',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    MessageModule,
  ],
  templateUrl: './add-brand.component.html',
  styleUrl: './add-brand.component.scss',
  providers: [MessageService],
})
export class AddBrandComponent {
  messageService = inject(MessageService);
  router = inject(Router);

  brandForm: FormGroup;

  formSubmitted = false;

  constructor(private fb: FormBuilder) {
    this.brandForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.brandForm.valid) {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Brand Created Successfully!',
        life: 3000,
      });
      console.log('Brand Value', this.brandForm.value);
      this.brandForm.reset();
      this.formSubmitted = false;
      setTimeout(() => {
        this.router.navigateByUrl('/dashboard/brands');
      }, 1000);
    }
  }

  isInvalid(controlName: string) {
    const control = this.brandForm.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted);
  }
}
