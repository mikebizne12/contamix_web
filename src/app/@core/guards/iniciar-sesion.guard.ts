import {Injectable} from '@angular/core';
import {Router, CanActivate, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import {Observable} from 'rxjs';
import {CuentaUtilsService} from '../utils/cuenta-utils.service';
import {NbAuthService} from "@nebular/auth";
import {tap} from "rxjs/operators";


@Injectable()
export class IniciarSesionGuard implements CanActivate {

  constructor(private router: Router,
              private authService: NbAuthService,
              private _cuentaUtilsService: CuentaUtilsService) {
  }

  canActivate() {
    return this.authService.isAuthenticated()
      .pipe(
        tap(authenticated => {
          if (authenticated) {
            console.log('Authenticated, redirecting' + authenticated);
             this.router.navigate(['pages/']);
          }
        }),
      );
    // if (this.authService.getToken()) {
    //   console.log('Authenticated, redirecting...');
    //   this.router.navigate(['/page/dashboard'], {replaceUrl: true});
    //   return false;
    // }
    // return true;
  }


}
