import {Injectable} from '@angular/core';
import {ApiService} from '../http/api.service';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {

  constructor(public _apiService: ApiService) {
  }

  index(params?) {
    return this._apiService.get('expenses', params);
  }

  show(id, params?) {
    return this._apiService.get('expenses/' + id, params);
  }

  store(datos) {
    return this._apiService.post('expenses', datos);
  }

  update(id, datos) {
    return this._apiService.put('expenses/' + id, datos);
  }

  delete(id, params?) {
    return this._apiService.delete('expenses/' + id, params);
  }
}
