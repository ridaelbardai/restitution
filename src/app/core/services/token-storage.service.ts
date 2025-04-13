import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenStorageService {
  private key = 'access_token';

  getToken(): string | null {
    return localStorage.getItem(this.key);
  }

  saveToken(token: string): void {
    localStorage.setItem(this.key, token);
  }

  clearToken(): void {
    localStorage.removeItem(this.key);
  }
}
