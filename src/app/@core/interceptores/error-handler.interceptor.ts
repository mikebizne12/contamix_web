import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {HttpResponse} from '@angular/common/http';
import {ErrorHandlersUtilsService} from "../utils/error-handlers-utils.service";

/**
 * Adds a default error handler to all requests.
 */
@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(public _errorHandlersUtilsService: ErrorHandlersUtilsService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(error => this.errorHandler(error)));
  }

  // Customize the default error handler here if needed
  private errorHandler(error: HttpResponse<any>): Observable<HttpResponse<any>> {
    console.log(error);
    // if (error.status == 404 || error.status == 403) {
    //   this._errorHandlersUtilsService.triggerError(error);
    // }
    if (error.status == 401) {
      this._errorHandlersUtilsService.triggerNoAutorizado(error);

    }
    if (error.status == 422) {
      this._errorHandlersUtilsService.triggerErrorToast(error);
    }
  
    if (error.status == 405 || error.status == 404 || error.status == 500) {
      this._errorHandlersUtilsService.triggerError(error);
    }
    // if (!environment.production) {
    //   // Do something with the error
    // }
    throw error;
  }

}
