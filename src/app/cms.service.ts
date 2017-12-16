import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CmsService {

  result: any;

  constructor(private _http: Http) { }

  // TODOS
  getUsers() {
    return this._http.get("/api/users")
      .map(result => this.result = result.json().data);
  }

  getPages() {
    return this._http.get("/api/pages")
      .map(result => this.result = result.json().data);
  }

}
