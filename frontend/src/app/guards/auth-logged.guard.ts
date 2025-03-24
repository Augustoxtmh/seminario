import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2';

export const authLoggedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (JSON.parse(localStorage.getItem("User") || '{}').Autoridad == 'A' || JSON.parse(localStorage.getItem("User") || '{}').Autoridad == 'U') {
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
