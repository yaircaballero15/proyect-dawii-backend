import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = '/auth';

  constructor(private http: HttpClient) { }

  registrar(data: any): Observable<any> {
    return this.http.post(this.baseUrl + '/registrar', data);
  }

  login(data: any): Observable<any> {
    return this.http.post(this.baseUrl + '/login', data);
  }
}