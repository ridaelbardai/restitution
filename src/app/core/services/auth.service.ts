import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { jwtDecode } from 'jwt-decode';
import { TokenPayload } from './../models/TokenPayload';
import { Router } from '@angular/router';
import { AxiosService } from './axios.service';
import { environment } from 'src/environments/environment';
import { ErrorModalService } from './error-modal.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authUrl = environment.apiUrl;

  private isLoggedInSubject = new BehaviorSubject<boolean>(
    this.hasValidToken()
  );
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router,
    private axiosService: AxiosService,
    private errorModalService: ErrorModalService
  ) {}

  login(LoginRequest: { username: string; password: string }) {
    this.axiosService
      .post<any>('/auth/authenticate', LoginRequest)
      .then((response: any) => {
        console.log(response);
        
        if (response.statusCode == 200) {
          localStorage.setItem(
            'fullname',
            response.data.firstname + ' ' + response.data.lastName
          );
          this.tokenStorage.saveToken(response.data.jwttoken);
          this.isLoggedInSubject.next(true);
          this.router.navigate(['']);
          
        }else{
          this.errorModalService.showModal(
            response.message || 'erreur d\'authentification !',
            'Auth'
          );
        }
      })
      .catch((error: any) => {
        this.errorModalService.showModal(
          error.message || 'An error occurred while fetching data',
          'API Error'
        );
        console.error('Error fetching user details:', error);
      });
  }

  logout(): void {
    this.tokenStorage.clearToken();
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
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
