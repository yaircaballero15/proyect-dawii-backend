import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthStorageService {
  private userKey = 'auth_user';

  save(user: any): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  getUser(): any {
    const data = localStorage.getItem(this.userKey);
    return data ? JSON.parse(data) : null;
  }

  getUserName(): string {
    return this.getUser()?.nomUsua || '';
  }

  isAuthenticated(): boolean {
    return !!this.getUser();
  }

  isAdmin(): boolean {
    return this.getUser()?.rolUsua === 'ADMIN';
  }

  isCliente(): boolean {
    return this.getUser()?.rolUsua === 'CLIENTE';
  }

  clear(): void {
    localStorage.removeItem(this.userKey);
  }
}