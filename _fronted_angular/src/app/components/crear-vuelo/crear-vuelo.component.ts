import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VueloService } from '../../services/vuelo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-vuelo',
  templateUrl: './crear-vuelo.component.html',
  styleUrls: ['./crear-vuelo.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class CrearVueloComponent {
  vueloForm: FormGroup;

  constructor(private fb: FormBuilder, private vueloService: VueloService) {
    this.vueloForm = this.fb.group({
      numeroVuelo: ['', Validators.required],
      aerolinea: ['', Validators.required],
      origen: ['', Validators.required],
      destino: ['', Validators.required],
      horaSalida: ['', Validators.required],
      horaLlegada: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.vueloForm.valid) {
      this.vueloService.createVuelo(this.vueloForm.value).subscribe(
        res => {
          alert("Vuelo creado, se recargara la pagina.");
          location.reload();
          console.log('Vuelo creado', res)
        },
        err => {
          console.error(err)
        }
      );
    }
  }
}