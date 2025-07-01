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
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
      .set('Content-Type', "application/json");
    return this.http.post<any>(this.baseUrl, data, { headers });
  }
}