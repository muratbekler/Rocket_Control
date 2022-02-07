import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                localStorage.clear();
                this.router.navigate(['sing-out'])
            }
            else if (err.status === 403) {
                this.router.navigate(['error/403'])
            }
            else if (err.status === 404) {
                this.router.navigate(['error/404'])
            }
            else if (err.status === 500) {
                this.router.navigate(['error/500'])
            }
            if(err.error){
                //localStorage.clear();
                const error = err.error.message || err.statusText;
                return throwError(error);
            }
            return throwError(err);
        }))
    }
}