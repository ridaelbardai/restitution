// axios.service.ts
import { Injectable } from '@angular/core';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { TokenStorageService } from './token-storage.service';
import { LoadingService } from './loading.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AxiosService {
  private axiosInstance: AxiosInstance;
  private totalRequests = 0;

  constructor(
    private tokenStorage: TokenStorageService,
    private loadingService: LoadingService,
    private router: Router
  ) {
    // Create Axios instance
    this.axiosInstance = axios.create({
      baseURL: environment.apiUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor for adding token and showing loader
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // Show loading indicator
        this.totalRequests++;
        this.loadingService.show();

        config.headers['Accept-Language'] = localStorage.getItem('language');
        // Add token to request headers
        const token = this.tokenStorage.getToken();
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor for hiding loader and handling errors
    this.axiosInstance.interceptors.response.use(
      (response) => {
        this.decrementRequests();
        return response;
      },
      (error) => {
        this.decrementRequests();

        // Handle authentication errors here if needed
        if (error.response && error.response.status === 401) {
          // Token expired, handle as needed
          this.tokenStorage.clearToken();
          this.router.navigate(['/login']);
        }
        return Promise.reject(error);
      }
    );
  }

  private decrementRequests() {
    this.totalRequests--;
    if (this.totalRequests === 0) {
      this.loadingService.hide();
    }
  }

  // Method wrappers
  public get<T>(url: string, config?: AxiosRequestConfig): any {
    return this.axiosInstance.get<T>(url, config).then((res) => res.data);
  }

  public post<T>(url: string, data?: any, config?: AxiosRequestConfig): any {
    return this.axiosInstance.post<T>(url, data, config).then((res) => res.data);
  }

  public put<T>(url: string, data?: any, config?: AxiosRequestConfig): any {
    return this.axiosInstance.put<T>(url, data, config).then((res) => res.data);
  }

  public delete<T>(url: string, config?: AxiosRequestConfig): any {
    return this.axiosInstance.delete<T>(url, config).then((res) => res.data);
  }

  public patch<T>(url: string, data?: any, config?: AxiosRequestConfig): any {
    return this.axiosInstance
      .patch<T>(url, data, config)
      .then((res) => res.data);
  }
}
