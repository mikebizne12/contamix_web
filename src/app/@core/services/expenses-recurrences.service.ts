import {Injectable} from '@angular/core';
import {ApiService} from '../http/api.service';

@Injectable({
  providedIn: 'root',
})
export class ExpensesRecurrencesService {

  constructor(public _apiService: ApiService) {
  }

  index(params?) {
    return this._apiService.get('expenses-recurrences', params);
  }

  show(id, params?) {
    return this._apiService.get('expenses-recurrences/' + id, params);
  }

  store(datos) {
    return this._apiService.post('expenses-recurrences', datos);
  }

  update(id, datos) {
    return this._apiService.put('expenses-recurrences/' + id, datos);
  }

  delete(id, params?) {
    return this._apiService.delete('expenses-recurrences/' + id, params);
  }
}
