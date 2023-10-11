import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    var router = inject(Router)
    const authToken = <string> localStorage.getItem("token");

    const authReq = request.clone({
      headers: request.headers.set('Authorization', "Bearer" + authToken)
    });

    return next.handle(authReq).pipe(
      catchError(errordata => {

        if(errordata.status == 401){
          router.navigate(['/login'])  
        }
        return throwError(errordata);
      } )
    );
  }
}
