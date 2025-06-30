import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http'; // 🆕 añade withFetch// ✅ importar esto

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()), // ✅ usa withFetch aquí //provideHttpClient(), // ✅ solución clave
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideClientHydration(withEventReplay())
  ]
};
