import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FormularioComponent } from './formulario/formulario.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    BrowserModule,
    FormsModule,
    FormularioComponent
  ],
  template: `<app-formulario></app-formulario>`
})
export class AppComponent {}
