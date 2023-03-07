import {Injectable} from '@angular/core';
import {ApiService} from '../http/api.service';

@Injectable({
  providedIn: 'root',
})
export class IncomesService {

  constructor(public _apiService: ApiService) {
  }

  index(params?) {
    return this._apiService.get('incomes', params);
  }

  show(id, params?) {
    return this._apiService.get('incomes/' + id, params);
  }

  store(datos) {
    return this._apiService.post('incomes', datos);
  }

  update(id, datos) {
    return this._apiService.put('incomes/' + id, datos);
  }

  delete(id, params?) {
    return this._apiService.delete('incomes/' + id, params);
  }
}
