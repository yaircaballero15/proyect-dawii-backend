import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Vuelo {
  id?: number;
  numeroVuelo: string;
  aerolinea: string;
  origen: string;
  destino: string;
  horaSalida: string;
  horaLlegada: string;
  estado: string;
}

@Injectable({
  providedIn: 'root'
})
export class VueloService {
  private baseUrl = '/api/vuelos';

  constructor(private http: HttpClient) {}

  listar(origen = '', destino = ''): Observable<Vuelo[]> {
    return this.http.get<Vuelo[]>(`${this.baseUrl}?origen=${origen}&destino=${destino}`);
  }

  obtener(id: number): Observable<Vuelo> {
    return this.http.get<Vuelo>(`${this.baseUrl}/${id}`);
  }

  crear(vuelo: Vuelo): Observable<Vuelo> {
    return this.http.post<Vuelo>(this.baseUrl, vuelo);
  }

  actualizar(id: number, vuelo: Vuelo): Observable<Vuelo> {
    return this.http.put<Vuelo>(`${this.baseUrl}/${id}`, vuelo);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
