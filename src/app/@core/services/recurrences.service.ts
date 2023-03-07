import {Injectable} from '@angular/core';
import {ApiService} from '../http/api.service';

@Injectable({
  providedIn: 'root',
})
export class RecurrencesService {

  constructor(public _apiService: ApiService) {
  }

  index(params?) {
    return this._apiService.get('recurrences', params);
  }

  aux(params?) {
    return this._apiService.get('recurrences/aux', params);
  }

  nextDay(params) {
    return this._apiService.get('recurrences/next-day', params);
  }

}
