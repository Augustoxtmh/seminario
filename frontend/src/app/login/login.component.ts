import { Component } from '@angular/core';
import { AuthService } from '../service/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import Swal from 'sweetalert2';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../service/usuario/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService
    , private router: Router, private usuarioServ: UsuarioService) {
    this.loginForm = this.fb.group({
      Nombre: ['', Validators.required],
      Contra: ['', Validators.required]
    });
  }

  ngOnInit() {  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).pipe(
        catchError(() => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Fallo al iniciar sesión.",
            text: "Por favor, revise sus credenciales.",
            showConfirmButton: false,
            timer: 4500,
            width: '25vw',
            padding: '20px',
          });
          return [];
        })
      ).subscribe((res: Usuario) => {
        localStorage.setItem("User", JSON.stringify(res));

        this.router.navigate(['/home']).then(() => {
          window.location.reload()
        });
        
      });  
    }
  }
}
