import {Injectable} from '@angular/core';
import {Credenciales} from '../../@theme/interface';


const credentialsKey = 'webContamix';

@Injectable({
  providedIn: 'root'
})
export class CuentaUtilsService {

  private _credenciales: Credenciales | null;

  constructor() {
    this._credenciales = this.obtenerSesion();

  }

  /**
   * Devuelve la session del usuario logueado
   */
  obtenerSesion() {
    const savedCredentials = localStorage.getItem(credentialsKey);
    // const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      return JSON.parse(savedCredentials);
      // this.getCurrentLangAplication();
      // this._credentials = JSON.parse(atob(savedCredentials));
    }
    return null;
  }

  /**
   * Checks is the user is authenticated.
   * @return {boolean} True if the user is authenticated.
   */
  esAutenticado(): boolean {
    // return !!this.credenciales;
    if (this.obtenerSesion() != null) {
      return true;
    }
    return false;
  }

  get credenciales(): Credenciales | null {
    return this._credenciales;
  }


  /**
   * Devuelve las credenciales para los demás componentes
   */
  obtenerCredenciales(): any | null {
    return this._credenciales;
  }

  /**
   * Devuelve si es administrador del sistema
   */
  esAdmin(): boolean {
    return true;
    // if (this._credenciales) {
    //   if (this._credenciales.type == 'A') {
    //     return true;
    //   }
    //   return false;
    // } else {
    //   return false;
    // }

  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param {Credentials=} credentials The user credentials.
   * @param {boolean=} remember True to remember credentials across sessions.
   */
  setearCredenciales(credentials?: any, remember?: boolean) {
    this._credenciales = credentials || null;
    if (credentials) {
      const storage = localStorage;
      // const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
      // storage.setItem(credentialsKey, btoa(JSON.stringify(credentials)));
    } else {
      // sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }

}
