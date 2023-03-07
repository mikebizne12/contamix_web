import {Injectable} from '@angular/core';
import {NbTokenService} from '@nebular/auth';
import {Router} from '@angular/router';
import {NotificacionesService} from "./notificaciones.service";

@Injectable()
export class ErrorHandlersUtilsService {

  constructor(
    protected tokenService: NbTokenService,
    private router: Router,
    public _notificacionesService: NotificacionesService) {

  }

  /* constructor(private _ngbModal: NgbModal,
               public _cuentaUtilsService: CuentaUtilsService,
               private _router: Router,
               private spinner: NgxSpinnerService,
               private toastr: ToastrService) {
   }*/


  triggerError(error) {
    console.log('error');
  }


  triggerNoAutorizado(error) {
    this._notificacionesService.personalizado(error.statusText, this._getLista(error.error.message), 4);
    setTimeout(()=>{
      this.tokenService.clear().subscribe((res) => {
        this.router.navigate(['auth/login']);
      });
    },500)
  }

  triggerErrorToast(response) {
    this._notificacionesService.personalizado(response.statusText, this._getLista(response.error.message), 4);
  }

  /*triggerError(response: any) {
    const m = this._ngbModal.open(ErrorModalComponent);
    m.componentInstance.status = response.status;
    m.componentInstance.statusText = response.statusText;
    if (response.error.error) {
      m.componentInstance.message = response.error.error.message;
    }

    /!*if (response) {
      m.componentInstance.errors = response.error.mensaje;
    } else {
      m.componentInstance.errors = response.mensaje;
    }
    if (Array.isArray(response.error.mensaje) || Array.isArray(response.message)) {
      m.componentInstance.arreglo = true;
    } else {
      m.componentInstance.arreglo = false;
    }*!/
    this.spinner.hide('app');
    return m.componentInstance;
  }


  removeSession(response) {
    this.triggerErrorToast(response);
    this._cuentaUtilsService.setearCredenciales(null);
    this._router.navigate(['/login'], {replaceUrl: true});
  }

  triggerErrorToast(response) {
    let msg = response.error.error.message;
    if (msg !== '') {
      this.toastr.warning(msg);
    }
    this.spinner.hide('app');
  }
*/
  private _getLista(mensaje) {
    var lista = '';
    for (let i of mensaje) {
      lista += '' + i + '. ';
    }
    return lista;
  }


}
