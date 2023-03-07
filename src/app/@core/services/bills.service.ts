import {Injectable} from '@angular/core';
import {ApiService} from '../http/api.service';

@Injectable({
  providedIn: 'root',
})
export class BillsService {

  constructor(public _apiService: ApiService) {
  }

  index(params?) {
    return this._apiService.get('bills', params);
  }

  show(id, params?) {
    return this._apiService.get('bills/' + id, params);
  }

  store(datos) {
    return this._apiService.post('bills', datos);
  }

  update(id, datos) {
    return this._apiService.put('bills/' + id, datos);
  }

  delete(id, params?) {
    return this._apiService.delete('bills/' + id, params);
  }
}
