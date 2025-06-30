import { Routes } from '@angular/router';
import { ListaBoletosComponent } from './boletos/lista-boletos/lista-boletos';
import { BoletoDetailComponent } from './boletos/detalle/detalle';
import { Editar } from './boletos/editar/editar';
import { AgregarBoletoComponent } from './boletos/agregar/agregar';

export const routes: Routes = [
    { path: 'vuelos', loadChildren: () => import('./vuelos/vuelos-module').then(m => m.VuelosModule) },
      { path: 'boletos', component: ListaBoletosComponent },
  { path: 'boletos/:id', component: BoletoDetailComponent },
  { path: 'boletos/editar/:id', component: Editar },
  { path: 'boletos/nuevo', component: AgregarBoletoComponent },
    { path: '', redirectTo: 'vuelos', pathMatch: 'full' }
  ];
  