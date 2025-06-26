import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './formulario.component.html'
})
export class FormularioComponent {
  vuelo = {
    numeroVuelo: '',
    aerolinea: '',
    origen: '',
    destino: '',
    horaSalida: '',
    horaLlegada: '',
    estado: 'Programado'
  };

  guardar() {
    alert('Vuelo guardado');
  }
}
