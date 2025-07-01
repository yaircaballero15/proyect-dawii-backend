import { Routes } from '@angular/router';
import { ListaBoletosComponent } from '../app/boletos/lista-boletos/lista-boletos';
import { FormularioComponent } from '../app/vuelos/formulario/formulario.component';

import { InicioComponent } from './inicio/inicio';
//import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
import { TarjetaComponent } from './pago/pago';

import { LoginComponent } from './components/login/login.component';


//Jairo Yair
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { ListaVuelosComponent } from './components/lista-vuelos/lista-vuelos.component';
import { CrearVueloComponent } from './components/crear-vuelo/crear-vuelo.component';
import { MisBoletosComponent } from './components/mis-boletos/mis-boletos.component';

import { AuthGuard } from './guards/auth.guard';




export const routes: Routes = [

  { path: '', component: InicioComponent },
  { path: 'pago', component: TarjetaComponent },

  //auth
  { path: 'registro', component: RegistroUsuarioComponent },
  { path: 'login', component: LoginComponent },


  // Rutas públicas
  { path: 'vuelos', component: ListaVuelosComponent },
  { path: 'boletos', component: ListaBoletosComponent },

  // Rutas solo ADMIN
  {
    path: 'admin/crear-vuelo',
    component: CrearVueloComponent,
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
    path: 'boletos',
    component: ListaBoletosComponent,
    canActivate: [AuthGuard],
    // si quieres permitir ambos, omite data.roles
  },

  { path: '**', redirectTo: '/login' }

];
