import { Component, OnInit } from '@angular/core';
import { VueloService } from '../../services/vuelo.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-vuelos',
  templateUrl: './lista-vuelos.component.html',
  styleUrls: ['./lista-vuelos.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class ListaVuelosComponent implements OnInit {
  vuelos: any[] = [];

  constructor(private vueloService: VueloService) { }

  ngOnInit() {
    this.vueloService.getVuelos().subscribe(
      data => this.vuelos = data,
      err => console.error(err)
    );
  }
}