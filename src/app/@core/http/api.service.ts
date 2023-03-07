import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders, HttpRequest} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable()
export class ApiService {
  private url: String = '';
  private form: any;

  constructor(public http: HttpClient) {
    this.url = `${environment.url}`;
  }


  createFormData() {
    this.form = new FormData();
  }

  addFormData(json) {
    for (let k in json) {
      this.form.append(k, json[k]);
    }
  }

  addFormDataFiles(attr, file) {
    this.form.append(attr, file, file.name);
  }

  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k]);
      }
    }

    // reqOpts.headers = ApiService.getHeader(null);
    return this.http.get(this.url + '/' + endpoint, reqOpts);
  }

  postForm(endpoint: string, body: any, reqOpts?: any) {
    return this.http.post(this.url + '/' + endpoint, this.form, reqOpts);
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    return this.http.post(this.url + '/' + endpoint, body, reqOpts);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }
    return this.http.patch(this.url + '/' + endpoint, body, reqOpts);
  }
}
