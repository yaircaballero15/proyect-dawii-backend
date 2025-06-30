import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
   template: `
    <div class="container d-flex justify-content-center align-items-center vh-100">
      <form (ngSubmit)="onLogin()" class="p-4 rounded shadow bg-white w-100" style="max-width: 400px;">
        <h2 class="text-center mb-4">Iniciar Sesión</h2>

        <div class="mb-3">
          <input type="email"
                 [(ngModel)]="correo"
                 name="correo"
                 class="form-control"
                 placeholder="Correo electrónico"
                 required />
        </div>

        <div class="mb-3">
          <input type="password"
                 [(ngModel)]="clave"
                 name="clave"
                 class="form-control"
                 placeholder="Contraseña"
                 required />
        </div>

        <div *ngIf="error" class="alert alert-danger py-2">
          {{ error }}
        </div>

        <button type="submit" class="btn btn-primary w-100" [disabled]="loading">
          {{ loading ? 'Cargando...' : 'Ingresar' }}
        </button>
      </form>
    </div>
  `,
  styles: [`.login-form{max-width:300px;margin:60px auto;display:flex;flex-direction:column;gap:1rem;}`]
})
export class LoginComponent {
  correo = '';
  clave = '';
  error: string | null = null;
  loading = false;

  

  onLogin() {

  };
  
}
