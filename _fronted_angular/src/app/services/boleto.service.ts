import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BoletoService {
  private baseUrl = '/api/boletos';

  constructor(private http: HttpClient) { }

  getBoletos(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getMisBoletos(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + '/mios');
  }
}