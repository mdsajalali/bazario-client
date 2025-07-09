import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconFieldModule } from 'primeng/iconfield';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    IconFieldModule,
    RouterLink,
    CardModule,
    ButtonModule,
    InputTextModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Login', this.loginForm.value);
    } else {
      this.loginForm.markAsTouched();
    }
  }
}
