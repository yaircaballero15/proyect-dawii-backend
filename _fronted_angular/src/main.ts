import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/vuelos/app.component'; // Componente raíz
import { provideRouter, Routes } from '@angular/router';
import { ListaBoletosComponent } from './app/boletos/lista-boletos/lista-boletos';
import { FormularioComponent } from './app/vuelos/formulario/formulario.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';


const routes: Routes = [
  { path: '', redirectTo: 'boletos', pathMatch: 'full' },
  { path: 'boletos', component: ListaBoletosComponent },
  { path: 'formulario', component: FormularioComponent }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi())
  ]
}).catch(err => console.error(err));