import {Injectable} from '@angular/core';
import {ApiService} from '../http/api.service';

@Injectable({
  providedIn: 'root',
})
export class IconsService {

  constructor(public _apiService: ApiService) {
  }

  index(params?) {
    return this._apiService.get('icons', params);
  }

}
