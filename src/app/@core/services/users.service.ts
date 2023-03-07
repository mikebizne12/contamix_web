import {Injectable} from '@angular/core';
import {ApiService} from "../http/api.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(public _apiService: ApiService) {
  }

  index(params?) {
    return this._apiService.get('users', params);
  }

  statistics(params?) {
    return this._apiService.get('users/statistics', params);
  }

  show(id, params?) {
    return this._apiService.get('users/' + id, params);
  }

  store(datos) {
    this._apiService.createFormData();
    this._apiService.addFormData(datos);
    return this._apiService.postForm('users', datos);
  }

  update(id, datos) {
    // this._apiService.createFormData();
    // this._apiService.addFormData(datos);
    return this._apiService.put('users/' + id, datos);
    //return this._apiService.put('services/' + id, params);
  }

  destroy(id, params?) {
    return this._apiService.delete('services/' + id, params);
  }
}
