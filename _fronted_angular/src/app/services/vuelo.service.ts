import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VueloService {
  private baseUrl = 'http://localhost:8081/api/vuelos';

  constructor(private http: HttpClient) { }

  getVuelos(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  createVuelo(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, data);
  }
}