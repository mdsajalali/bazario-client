import { Component, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { Router, RouterLink } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    MessageModule,
    RouterLink,
    ToastModule,
    MessageModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [MessageService],
})
export class RegisterComponent {
  messageService = inject(MessageService);
  authService = inject(AuthService);
  router = inject(Router);
  loading: boolean = false;

  registerForm: FormGroup;

  formSubmitted = false;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.registerForm.valid) {
      this.loading = true;
      const value = this.registerForm.value;
      this.authService
        .register(value.name, value.email, value.password)
        .subscribe({
          next: (result: any) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: result.message,
              life: 3000,
            });
            this.registerForm.reset();
            this.formSubmitted = false;
            this.loading = false;

            setTimeout(() => {
              this.router.navigateByUrl('/login');
            }, 1000);
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Register Failed',
              detail: error?.error?.message || 'Something went wrong!',
              life: 3000,
            });
            this.formSubmitted = false;
            this.loading = false;
          },
        });
    }
  }

  isInvalid(controlName: string) {
    const control = this.registerForm.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted);
  }
}
