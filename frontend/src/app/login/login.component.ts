import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      Nombre: ['', Validators.required],
      Contra: ['', Validators.required]
    });
  }

  ngOnInit() {

  }

  onSubmit() {
    this.router.navigate(['/home']);
/*     if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        response => {
          console.log('Inicio de sesión exitoso', response);
          this.router.navigate(['/home']);
        },
        error => {
          this.error = 'Fallo al iniciar sesión. Por favor, revise sus credenciales.';
          console.error('Login error', error);
        }
      );
    } */
  }
}
