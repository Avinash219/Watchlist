import { environment } from './../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Snackbar } from './shared/Snackbar';
import { AuthenticateService } from './authenticate/authenticate.service';
import { LoaderService } from './core/service/loader.service';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';

@Injectable()
export class AppHttpInterceptor extends Snackbar implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];
  private cache: Map<string, HttpResponse<any>> = new Map();
  constructor(
    private _loadingService: LoaderService,
    private _authService: AuthenticateService,
    private _snackBar: MatSnackBar
  ) {
    super(_snackBar);
  }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      url: `${environment.devUrl}${environment.baseUrl}${request.url}`,
    });
    if (this._authService.loggedIn) {
      request = request.clone({
        setHeaders: {
          Authorization: localStorage.getItem('token'),
          //  range: 'bytes =0',
        },
      });
    }
    this.requests.push(request);
    this._loadingService.setIsLoading(true);
    if (request.headers.get('reset') === 'new') {
      this.cache.delete(request['url']);
    }
    const cachedResponse: HttpResponse<any> = this.cache.get(request['url']);

    if (cachedResponse) {
      this._loadingService.setIsLoading(false);
      return of(cachedResponse.clone());
    } else {
      return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse && request.method === 'GET') {
            this.cache.set(request['url'], event.clone());
          }
          this._loadingService.setIsLoading(false);
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          this._loadingService.setIsLoading(false);
          this.errorToast(error);
          return throwError(error);
        })
      );
    }
  }
}
