import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BoletoService, Boleto } from '../lista-boletos/boleto.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle',
  imports: [CommonModule],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css'
})
export class BoletoDetailComponent implements OnInit {
  boleto?: Boleto;

  constructor(
    private boletoService: BoletoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.boletoService.obtener(+id).subscribe(data => {
        this.boleto = data;
      });
    }
  }

  volver(): void {
    this.router.navigate(['/boletos']);
  }
}
