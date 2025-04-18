import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenStorageService } from "../services/token-storage.service";
import { LoadingService } from "../services/loading.service";
import { finalize } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private totalRequests = 0;

  constructor(private tokenStorage: TokenStorageService,private loadingService: LoadingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.show();
    const token = this.tokenStorage.getToken();
    this.totalRequests++;
    if (token) {
      req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }
    return next.handle(req).pipe(
    finalize(() => {
      this.totalRequests--;
      if (this.totalRequests === 0) {
        this.loadingService.hide();
      }
    })
  );
  }
}
