/*
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/vuelos/app.component'; // Componente raíz
import { provideRouter, Routes } from '@angular/router';
import { ListaBoletosComponent } from './app/boletos/lista-boletos/lista-boletos';
import { FormularioComponent } from './app/vuelos/formulario/formulario.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
*/

/*
  //Jairo Yair
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { LoginComponent } from './components/login/login.component';
import { ListaVuelosComponent } from './components/lista-vuelos/lista-vuelos.component';
import { CrearVueloComponent } from './components/crear-vuelo/crear-vuelo.component';
import { MisBoletosComponent } from './components/mis-boletos/mis-boletos.component';
import { ListaBoletosComponent as ListaBoletosComponent2 } from './components/lista-boletos/lista-boletos.component';

*/
/*
const routes: Routes = [
  { path: '', redirectTo: 'boletos', pathMatch: 'full' },
  { path: 'boletos', component: ListaBoletosComponent },
  { path: 'formulario', component: FormularioComponent }
*/  
  /*,
  //Jairo Yair
  { path: 'registro', component: RegistroUsuarioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'vuelos', component: ListaVuelosComponent },
  { path: 'crear-vuelo', component: CrearVueloComponent },
  { path: 'mis-boletos', component: MisBoletosComponent },
  { path: 'boletos2', component: ListaBoletosComponent2 },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
   */
  /*
];
*/
/*
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi())
  ]
}).catch(err => console.error(err));
*/

import bootstrap from './main.server'; // o './bootstrap' si lo separaste

bootstrap()
  .catch(err => console.error(err));