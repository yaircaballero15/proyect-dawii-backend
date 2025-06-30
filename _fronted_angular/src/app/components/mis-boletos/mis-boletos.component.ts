import { Component, OnInit } from '@angular/core';
import { BoletoService } from '../../services/boleto.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mis-boletos',
  templateUrl: './mis-boletos.component.html',
  styleUrls: ['./mis-boletos.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class MisBoletosComponent implements OnInit {
  boletos: any[] = [];

  constructor(private boletoService: BoletoService) { }

  ngOnInit() {
    this.boletoService.getMisBoletos().subscribe(
      data => this.boletos = data,
      err => console.error(err)
    );
  }
}