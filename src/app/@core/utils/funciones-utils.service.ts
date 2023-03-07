import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FuncionesUtilsService {

  static removerAtributosVacios(obj) {
    let _self = this;
    Object.keys(obj).forEach(function (key) {
      (obj[key] && typeof obj[key] === 'object') && _self.removerAtributosVacios(obj[key]) ||
      (obj[key] === '' || obj[key] === null || obj[key] === undefined) && delete obj[key];
    });
    return obj;
  }

}
