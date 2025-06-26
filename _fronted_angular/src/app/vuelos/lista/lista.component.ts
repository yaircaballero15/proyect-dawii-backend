import { Component, OnInit } from '@angular/core';
import { VueloService, Vuelo } from '../vuelo.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {
  vuelos: Vuelo[] = [];

  constructor(private vueloService: VueloService) {}

  ngOnInit(): void {
    this.vueloService.listar().subscribe(data => this.vuelos = data);
  }
}
