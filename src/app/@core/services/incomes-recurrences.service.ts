import {Injectable} from '@angular/core';
import {ApiService} from '../http/api.service';

@Injectable({
  providedIn: 'root',
})
export class IncomesRecurrencesService {

  constructor(public _apiService: ApiService) {
  }

  index(params?) {
    return this._apiService.get('incomes-recurrences', params);
  }

  show(id, params?) {
    return this._apiService.get('incomes-recurrences/' + id, params);
  }

  store(datos) {
    return this._apiService.post('incomes-recurrences', datos);
  }

  update(id, datos) {
    return this._apiService.put('incomes-recurrences/' + id, datos);
  }

  delete(id, params?) {
    return this._apiService.delete('incomes-recurrences/' + id, params);
  }
}
