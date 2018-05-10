import { Injectable, Injector } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators/catchError';
import { finalize } from 'rxjs/operators/finalize';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { MessageService } from '../message';
import { LanguageService } from '../language/shared/language.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private messageService: MessageService,
    private injector: Injector
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let httpError: ErrorObservable;
    return next.handle(req).pipe(
      catchError(error => {
        httpError = this.handleError(error, req);
        return httpError;
      }),
      finalize(() => this.handleUncaughtError(httpError))
    );
  }

  private handleError(httpError: HttpErrorResponse, req: HttpRequest<any>) {
    const msg = `${req.method} ${req.urlWithParams} ${httpError.status} (${
      httpError.statusText
    })`;

    if (httpError instanceof HttpErrorResponse) {
      const errorObj = httpError.error === 'object' ? httpError.error : {};
      errorObj.message = httpError.error.message || httpError.statusText;
      errorObj.caught = false;
      console.error(msg, '\n', errorObj.message, '\n\n', httpError);

      httpError = new HttpErrorResponse({
        error: errorObj,
        headers: httpError.headers,
        status: httpError.status,
        statusText: httpError.statusText,
        url: httpError.url
      });
    }

    return new ErrorObservable(httpError);
  }

  private handleUncaughtError(httpError$: ErrorObservable) {
    const httpError = httpError$.error;
    if (httpError && !httpError.error.caught) {
      const translate = this.injector.get(LanguageService).translate;
      const message = translate.instant('igo.errors.uncaught.message');
      const title = translate.instant('igo.errors.uncaught.title');
      this.messageService.error(message, title);
    }
  }
}
