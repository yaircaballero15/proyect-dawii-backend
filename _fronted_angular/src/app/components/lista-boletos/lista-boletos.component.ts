import { Component, OnInit } from '@angular/core';
import { BoletoService } from '../../services/boleto.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-boletos',
  templateUrl: './lista-boletos.component.html',
  styleUrls: ['./lista-boletos.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class ListaBoletosComponent implements OnInit {
  boletos: any[] = [];

  constructor(private boletoService: BoletoService) { }

  ngOnInit() {
    this.boletoService.getBoletos().subscribe(
      data => this.boletos = data,
      err => console.error(err)
    );
  }
}