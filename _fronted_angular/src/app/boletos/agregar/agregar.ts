import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BoletoService, Boleto } from '../lista-boletos/boleto.service';
import { UsuarioService, Usuario } from '../usuario/usuario.service';
import { VueloService, Vuelo } from '../vuelo/vuelo.service';

@Component({
  selector: 'app-agregar',
  imports: [],
  templateUrl: './agregar.html',
  styleUrl: './agregar.css'
})
export class AgregarBoletoComponent implements OnInit {
  boleto: Boleto = {
    id: 0,
    asiento: '',
    precio: 0,
    fechaCompra: new Date(),
    vuelo: { id: 0 } as Vuelo,
    usuario: { codUsua: 0 } as Usuario
  };

  usuarios: Usuario[] = [];
  vuelos: Vuelo[] = [];

  editMode = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private boletoService: BoletoService,
    private usuarioService: UsuarioService,
    private vueloService: VueloService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
    this.cargarVuelos();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.boletoService.obtener(+id).subscribe(data => this.boleto = data);
    }
  }

  guardar(): void {
    this.boleto.fechaCompra = new Date(); // asignar automáticamente si deseas
    if (this.editMode) {
      this.boletoService.actualizar(this.boleto).subscribe(() => {
        this.router.navigate(['/boletos']);
      });
    } else {
      this.boletoService.crear(this.boleto).subscribe(() => {
        this.router.navigate(['/boletos']);
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/boletos']);
  }

  cargarUsuarios(): void {
    this.usuarioService.listar().subscribe(data => this.usuarios = data);
  }

  cargarVuelos(): void {
    this.vueloService.listar().subscribe(data => this.vuelos = data);
  }
}
