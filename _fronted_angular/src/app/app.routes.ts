import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'vuelos', loadChildren: () => import('./vuelos/vuelos-module').then(m => m.VuelosModule) },
    { path: '', redirectTo: 'vuelos', pathMatch: 'full' }
  ];
  