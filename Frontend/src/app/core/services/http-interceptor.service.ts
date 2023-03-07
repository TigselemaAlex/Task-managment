import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JWTResponse } from 'src/app/shared/models/jwtresponse.model';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const jwt = JSON.parse(localStorage.getItem('jwt')!) as JWTResponse;
    if (jwt && jwt.token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${jwt.token}` },
      });
    }
    return next.handle(request);
  }
}
