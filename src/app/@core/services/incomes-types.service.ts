import {Injectable} from '@angular/core';
import {ApiService} from '../http/api.service';

@Injectable({
  providedIn: 'root',
})
export class IncomesTypesService {

  constructor(public _apiService: ApiService) {
  }

  index(params?) {
    return this._apiService.get('incomes-types', params);
  }

  show(id, params?) {
    return this._apiService.get('incomes-types/' + id, params);
  }

  store(datos) {
    return this._apiService.post('incomes-types', datos);
  }

  update(id, datos) {
    return this._apiService.put('incomes-types/' + id, datos);
  }

  delete(id, params?) {
    return this._apiService.delete('incomes-types/' + id, params);
  }
}
