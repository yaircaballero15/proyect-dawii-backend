import { Routes } from '@angular/router';
import { FormularioComponent } from '../app/vuelos/formulario/formulario.component';
import { InicioComponent } from './components/inicio/inicio';
import { TarjetaComponent } from './pago/pago';
import { LoginComponent } from './components/login/login.component';

// Jairo Yair
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { ListaVuelosComponent } from './components/lista-vuelos/lista-vuelos.component';
import { CrearVueloComponent } from './components/crear-vuelo/crear-vuelo.component';
import { MisBoletosComponent } from './components/mis-boletos/mis-boletos.component';

import { AuthGuard } from './guards/auth.guard';
import { ListaBoletosComponent } from './components/lista-boletos/lista-boletos.component';
import { UserListComponent } from './components/lista-usuario/lista-usuarios.component'; // <--- Importa aquí

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'pago', component: TarjetaComponent },

  //auth
  { path: 'registro', component: RegistroUsuarioComponent },
  { path: 'login', component: LoginComponent },

  // Rutas públicas
  { path: 'vuelos', component: ListaVuelosComponent },

  // Rutas solo ADMIN
  {
    path: 'admin/crear-vuelo',
    component: CrearVueloComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'admin/usuarios',
    component: UserListComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] }
  },

  // Rutas solo CLIENTE
  {
    path: 'mis-boletos',
    component: MisBoletosComponent,
    canActivate: [AuthGuard],
    data: { roles: ['CLIENTE'] }
  },

  // Ambos roles pueden ver este listado (si quieres)
  {
    path: 'admin/boletos',
    component: ListaBoletosComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] }
    // si quieres permitir ambos, omite data.roles
  },

  { path: '**', redirectTo: '/login' }
];
