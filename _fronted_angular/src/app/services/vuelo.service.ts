import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({ providedIn: 'root' })
export class VueloService {
  private baseUrl = '/api/vuelos';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getVuelos(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  createVuelo(data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(this.baseUrl, data, { headers });
  }

  updateVuelo(id: number, data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.baseUrl}/${id}`, data, { headers }); // <--- Corregido
  }

  deleteVuelo(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.baseUrl}/${id}`, { headers }); // <--- Corregido
  }

  private getHeaders(): HttpHeaders {
    const token = this.tokenService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`); // <--- Corregido
  }
}
