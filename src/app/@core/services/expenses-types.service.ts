import {Injectable} from '@angular/core';
import {ApiService} from '../http/api.service';

@Injectable({
  providedIn: 'root',
})
export class ExpensesTypesService {

  constructor(public _apiService: ApiService) {
  }

  index(params?) {
    return this._apiService.get('expenses-types', params);
  }

  show(id, params?) {
    return this._apiService.get('expenses-types/' + id, params);
  }

  store(datos) {
    return this._apiService.post('expenses-types', datos);
  }

  update(id, datos) {
    return this._apiService.put('expenses-types/' + id, datos);
  }

  delete(id, params?) {
    return this._apiService.delete('expenses-types/' + id, params);
  }
}
