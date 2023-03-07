import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild} from '@angular/router';

import {Observable} from 'rxjs';
import {CuentaUtilsService} from '../utils/cuenta-utils.service';
import {NbAuthService} from "@nebular/auth";
import {tap} from "rxjs/operators";


@Injectable()
export class AutenticacionGuard implements CanActivate, CanActivateChild {


  constructor(private router: Router,
              private authService: NbAuthService,
              private _cuentaUtilsService: CuentaUtilsService) {
  }

  canActivate() {

    return this.authService.isAuthenticated()
      .pipe(
        tap(authenticated => {
          if (!authenticated) {
            console.log('Not Authenticated, redirecting' + authenticated);
            this.router.navigate(['/auth/login']);
          }
        }),
      );
  }

  canActivateChild(next: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // console.log(this._cuentaUtilsService.esAutenticado() + 'CHILDREN');
    // if (this._cuentaUtilsService.esAutenticado()) {
    return false;
    // }
    // console.debug('Not authenticated, redirecting...');
    // this.router.navigate(['/login'], {replaceUrl: true});
    // return false;
  }

}
