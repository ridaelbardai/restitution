import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { tap, map } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { TokenPayload } from './../models/TokenPayload';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authUrl = 'https://your.api/auth';
  private isLoggedInSubject = new BehaviorSubject<boolean>(
    this.hasValidToken()
  );
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {}

  login(credentials: { email: string; password: string }): Observable<void> {
    return this.http
      .post<{ token: string }>(`${this.authUrl}/login`, credentials)
      .pipe(
        tap((res: { token: string }) => {
          this.tokenStorage.saveToken(res.token);
          this.isLoggedInSubject.next(true);
        }),
        map(() => {})
      );
  }

  logout(): void {
    this.tokenStorage.clearToken();
    this.isLoggedInSubject.next(false);
  }

  hasValidToken(): boolean {
    const token = this.tokenStorage.getToken();
    if (!token) return false;
    try {
      const { exp } = jwtDecode<any>(token);
      return Date.now() < exp * 1000;
    } catch {
      return false;
    }
  }

  getDecodedToken(): TokenPayload | null {
    const token = this.tokenStorage.getToken();
    return token ? jwtDecode<TokenPayload>(token) : null;
  }
}
