import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

// Ajusta los campos según tu DTO real
export interface UserDto {
  codUsua: number;
  nomUsua: string;
  apeUsua: string;
  correo: string;
  fnaUsua: Date;
  rolUsua: string;
  estUsua: string;
}

export interface RegistroUsuarioDTO {
  nomUsua: string;
  apeUsua: string;
  correo: string;
  clave?: string;
  fnaUsua: Date;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = '/api/users';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  // ADMIN
getAll(): Observable<UserDto[]> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');
    return this.http.get<UserDto[]>(this.apiUrl, { headers });
  }
  
  getById(id: number): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.apiUrl}/${id}`);
  }

  update(id: number, dto: RegistroUsuarioDTO): Observable<UserDto> {
    return this.http.put<UserDto>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // CLIENTE AUTENTICADO
  getProfile(): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.apiUrl}/me`);
  }

  updateProfile(dto: RegistroUsuarioDTO): Observable<UserDto> {
    return this.http.put<UserDto>(`${this.apiUrl}/me`, dto);
  }
}
