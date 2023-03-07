import {Injectable} from '@angular/core';
import {ApiService} from '../http/api.service';

@Injectable({
  providedIn: 'root',
})
export class TransfersService {

  constructor(public _apiService: ApiService) {
  }

  index(params?) {
    return this._apiService.get('transfers', params);
  }

  show(id, params?) {
    return this._apiService.get('transfers/' + id, params);
  }

  store(datos) {
    return this._apiService.post('transfers', datos);
  }

  update(id, datos) {
    return this._apiService.put('transfers/' + id, datos);
  }

  delete(id, params?) {
    return this._apiService.delete('transfers/' + id, params);
  }
}
