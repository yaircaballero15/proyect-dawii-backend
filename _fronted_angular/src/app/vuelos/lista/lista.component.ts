
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // necesario
import { NgModule } from '@angular/core';
import { VueloService, Vuelo } from '../vuelo.service';


@Component({
  standalone: true,
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  imports: [CommonModule], // 🔴 esto es lo que te está faltando
})
export class ListaComponent implements OnInit {
  vuelos: Vuelo[] = [];

  constructor(private vueloService: VueloService) { }

  ngOnInit(): void {
    this.vueloService.listar().subscribe(data => this.vuelos = data);
  }
}
