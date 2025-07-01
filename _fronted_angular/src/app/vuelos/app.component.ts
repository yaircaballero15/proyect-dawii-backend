import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormularioComponent } from './formulario/formulario.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    FormularioComponent
  ],
  template: `<app-formulario></app-formulario>`
})
export class AppComponent {}
