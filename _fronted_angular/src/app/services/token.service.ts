import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private TOKEN_KEY = 'auth_token';
  private userKey = 'auth_user';

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  clear() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.userKey);

  }

  saveUser(user: any): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  getUser(): any {

    if (typeof window !== 'undefined' && window.localStorage) {
      const data = localStorage.getItem(this.userKey);

      return data ? JSON.parse(data) : null;
    }

    return null;
  }

  getUserName(): string {
    return this.getUser()?.nomUsua || '';
  }

  isAuthenticated(): boolean {
    console.log(this.getUser());
    return this.getUser() != null;
  }
  isAdmin(): boolean {
    return this.getUser()?.rolUsua == 'ADMIN';
  }

  isCliente(): boolean {
    return this.getUser()?.rolUsua == 'CLIENTE';
  }


}