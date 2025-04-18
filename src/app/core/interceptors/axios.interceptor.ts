import axios, { AxiosHeaders } from 'axios';
import { Injectable } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { TokenStorageService } from '../services/token-storage.service';
import { ErrorService } from '../services/error.service';

@Injectable({
  providedIn: 'root',
})
export class AxiosInterceptorService {
  private totalRequests = 0;

  constructor(
    private tokenStorage: TokenStorageService,
    private loadingService: LoadingService,
    private errorService: ErrorService
  ) {
    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    axios.interceptors.request.use(
      (config) => {
        this.totalRequests++;
        this.loadingService.show();

        console.log('➡️ Axios interceptor called');

        const token = this.tokenStorage.getToken();
        console.log('🔐 Retrieved token:', token);

        if (!config.headers || typeof config.headers.set !== 'function') {
          config.headers = new AxiosHeaders(config.headers || {});
        }

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        this.totalRequests--;
        if (this.totalRequests === 0) {
          this.loadingService.hide();
        }
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (response) => {
        this.totalRequests--;
        if (this.totalRequests === 0) {
          this.loadingService.hide();
        }
        return response;
      },
      (error) => {
        this.totalRequests--;
        if (this.totalRequests === 0) {
          this.loadingService.hide();
        }
        return Promise.reject(error);
      }
    );
  }
}
