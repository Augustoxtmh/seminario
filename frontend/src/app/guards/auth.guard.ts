import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (JSON.parse(localStorage.getItem("User") || '{}').Autoridad == 'A') {
    return true;
  } else {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Permisos insuficientes',
      showConfirmButton: false,
      timer: 1500,
      width: '20vw',
      padding: '20px',
    });
    return false;
  }
};
