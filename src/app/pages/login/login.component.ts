import { Component, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { Router, RouterLink } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    MessageModule,
    RouterLink,
    ToastModule,
    MessageModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService],
})
export class LoginComponent {
  messageService = inject(MessageService);
  authService = inject(AuthService);
  router = inject(Router);

  loginForm: FormGroup;

  formSubmitted = false;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.loginForm.valid) {
      const value = this.loginForm.value;
      this.authService.login(value.email, value.password).subscribe({
        next: (result: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: result.message,
            life: 3000,
          });
          localStorage.setItem('token', result.token);
          localStorage.setItem('user', JSON.stringify(result.user));
          this.loginForm.reset();
          this.formSubmitted = false;
          setTimeout(() => {
            this.router.navigateByUrl('/');
          }, 1000);
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Login Failed',
            detail: error?.error?.message || 'Something went wrong!',
            life: 3000,
          });
          this.formSubmitted = false;
        },
      });
    }
  }

  isInvalid(controlName: string) {
    const control = this.loginForm.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted);
  }
}
