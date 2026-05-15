import { CanActivateFn } from '@angular/router';

export const adminGuard: CanActivateFn = () => {

  const role = localStorage.getItem('role');

  if (role !== 'ADMIN') {
    return false;
  }

  return true;
};