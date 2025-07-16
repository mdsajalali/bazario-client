import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const adminGuard: CanActivateChildFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isLoggedIn) {
    if (authService.isAdmin) {
      return true;
    } else {
      router.navigateByUrl('/');
      return false;
    }
  } else {
    router.navigateByUrl('/login');
    return false;
  }
};
