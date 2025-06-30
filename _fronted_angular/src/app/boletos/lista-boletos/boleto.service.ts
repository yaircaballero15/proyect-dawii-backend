import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Boleto {
  id: number;
  asiento: string;
  precio: number;
  fechaCompra: string;
  vuelo: {
    id: number;
    origen: string;
    destino: string;
    numeroVuelo: string;
  };
  usuario: {
    codUsua: number;
    nombre: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class BoletoService {
  private apiUrl = '/api/boletos';

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Boleto[]> {
    return this.http.get<Boleto[]>(this.apiUrl);
  }

  listarMios(): Observable<Boleto[]> {
    return this.http.get<Boleto[]>(`${this.apiUrl}/mios`);
  }
}
