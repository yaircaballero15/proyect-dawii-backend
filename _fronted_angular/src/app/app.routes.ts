import { Routes } from '@angular/router';
import { ListaBoletosComponent } from '../app/boletos/lista-boletos/lista-boletos';
import { FormularioComponent } from '../app/vuelos/formulario/formulario.component';


/*
  //Jairo Yair
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { LoginComponent } from './components/login/login.component';
import { ListaVuelosComponent } from './components/lista-vuelos/lista-vuelos.component';
import { CrearVueloComponent } from './components/crear-vuelo/crear-vuelo.component';
import { MisBoletosComponent } from './components/mis-boletos/mis-boletos.component';
import { ListaBoletosComponent as ListaBoletosComponent2 } from './components/lista-boletos/lista-boletos.component';

*/


export const routes: Routes = [
  { path: '', redirectTo: 'boletos', pathMatch: 'full' },
  { path: 'boletos', component: ListaBoletosComponent },
  { path: 'formulario', component: FormularioComponent },
  { path: 'vuelos', loadChildren: () => import('./vuelos/vuelos-module').then(m => m.VuelosModule) },
  { path: '', redirectTo: 'vuelos', pathMatch: 'full' },

  /*
  //Jairo Yair
  { path: 'registro', component: RegistroUsuarioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'vuelos', component: ListaVuelosComponent },
  { path: 'crear-vuelo', component: CrearVueloComponent },
  { path: 'mis-boletos', component: MisBoletosComponent },
  { path: 'boletos2', component: ListaBoletosComponent2 },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
   */
];
