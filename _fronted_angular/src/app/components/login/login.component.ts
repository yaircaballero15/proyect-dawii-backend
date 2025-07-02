import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        res => {
          this.tokenService.setToken(res.token);
          this.tokenService.saveUser(res);
          alert('✅ Bienvenido');
          this.router.navigate(['/vuelos']);
        },
        error => {
          console.error('Error de login:', error);
          alert('❌ Correo o contraseña incorrectos.');
        }
      );
    } else {
      alert('⚠️ Por favor completa todos los campos correctamente.');
    }
  }

  irARegistro() {
    this.router.navigate(['/registro']); // Cambia si tienes otra ruta
  }
}
