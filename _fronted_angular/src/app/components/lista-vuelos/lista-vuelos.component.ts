import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VueloService } from '../../services/vuelo.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-lista-vuelos',
  templateUrl: './lista-vuelos.component.html',
  styleUrls: ['./lista-vuelos.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class ListaVuelosComponent implements OnInit {
  vuelos: any[] = [];
  editando: boolean = false;
  vueloSeleccionado: any = null;
  editarForm!: FormGroup;
  esAdmin: boolean = false;

  constructor(
    private vueloService: VueloService,
    private fb: FormBuilder,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.obtenerVuelos();
    this.esAdmin = this.tokenService.isAdmin(); // Detectar rol
    this.editarForm = this.fb.group({
      id: [null],
      numeroVuelo: [''],
      aerolinea: [''],
      origen: [''],
      destino: [''],
      horaSalida: [''],
      horaLlegada: [''],
      estado: ['']
    });
  }

  obtenerVuelos() {
    this.vueloService.getVuelos().subscribe(
      data => this.vuelos = data,
      err => console.error(err)
    );
  }

  iniciarEdicion(vuelo: any) {
    this.editando = true;
    this.vueloSeleccionado = vuelo;
    this.editarForm.patchValue({
      id: vuelo.id,
      numeroVuelo: vuelo.numeroVuelo,
      aerolinea: vuelo.aerolinea,
      origen: vuelo.origen,
      destino: vuelo.destino,
      horaSalida: vuelo.horaSalida?.substring(0, 16),
      horaLlegada: vuelo.horaLlegada?.substring(0, 16),
      estado: vuelo.estado
    });
  }

  guardarEdicion() {
    const vueloEditado = this.editarForm.value;
    this.vueloService.updateVuelo(vueloEditado.id, vueloEditado).subscribe(
      () => {
        alert('✅ Vuelo actualizado');
        this.editando = false;
        this.obtenerVuelos();
      },
      err => {
        console.error(err);
        alert('❌ Error al actualizar');
      }
    );
  }

  cancelarEdicion() {
    this.editando = false;
    this.editarForm.reset();
  }

  eliminarVuelo(id: number) {
    if (confirm('¿Estás seguro de eliminar este vuelo?')) {
      this.vueloService.deleteVuelo(id).subscribe(
        () => {
          alert('🗑️ Vuelo eliminado');
          this.obtenerVuelos();
        },
        err => {
          console.error(err);
          alert('❌ Error al eliminar');
        }
      );
    }
  }
}
