import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BoletoService, Boleto } from './boleto.service';

@Component({
  selector: 'app-lista-boletos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-boletos.html'
})
export class ListaBoletosComponent implements OnInit {
  boletos: Boleto[] = [];

  constructor(private boletoService: BoletoService, private router: Router) {}  

  ngOnInit(): void {
    this.boletoService.listarTodos().subscribe({
      next: (data) => this.boletos = data,
      error: (err) => console.error('Error al obtener boletos', err)
    });
  }
  
  nuevoBoleto(): void {
  this.router.navigate(['/boletos/nuevo']);
}

  verDetalle(id: number): void {
    this.router.navigate(['/boletos', id]);
  }

  editarBoleto(id: number): void {
    this.router.navigate(['/boletos', 'editar', id]);
  }
}
