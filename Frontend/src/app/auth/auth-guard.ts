import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth';

export const authGuard = () => {
  // const authService = inject(AuthService);
  const router = inject(Router);
  const token = localStorage.getItem('token');
  

  // ✅ Allow navigation if logged in
  if (token) {
    return true;
  }

  // ✅ Redirect to login instead of blocking silently
  return router.createUrlTree(['/login']);
};