import {Injectable, Injector} from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CuentaUtilsService} from "../utils/cuenta-utils.service";

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(public _cuentaUtilsService: CuentaUtilsService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig = {
      'Accept': 'application/json',
    };
    if (this._cuentaUtilsService.esAutenticado()) {
      headersConfig['X-TOKEN'] = `${this._cuentaUtilsService.obtenerCredenciales().api_token}`;
      headersConfig['X-USER'] = `${this._cuentaUtilsService.obtenerCredenciales().id}`;
      // headersConfig['X-TOKEN'] = `${this._cuentaUtilsService.obtenerCredenciales().token}`;
      // headersConfig['X-TOKEN'] = 'BCw5pUxmgA3GX7OpGL5gyZuBYgE2sNbuba4iL26kxZfOva3v1DwT5PnSFAnQ';
      // headersConfig['X-GRUPO'] = 1;
      // headersConfig['X-GRUPO'] = `${this._cuentaUtilsService.obtenerCredenciales().id}`;
      // headersConfig['X-USUARIO'] = `${this._cuentaUtilsService.obtenerCredenciales().id}`;
    }

    const request = req.clone({setHeaders: headersConfig});
    return next.handle(request);

  }
}
