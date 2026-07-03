import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CmsService {

  result: any;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private _http: Http) { }

  getUsers() {
    return this._http.get("/api/users")
      .map(result => this.result = result.json().data);
  }

  getPages() {
    return this._http.get("/api/pages")
      .map(result => this.result = result.json().data);
  }

  getHeaders() {
    return this._http.get("/api/headers")
      .map(result => this.result = result.json().data);
  }

  getFooters() {
    return this._http.get("/api/footers")
      .map(result => this.result = result.json().data);
  }

  getPepperStatus() {
    return this._http.get("/api/pepper/status")
      .map(result => result.json().data);
  }

  getPepperSubscribers() {
    return this._http.get("/api/pepper/subscribers")
      .map(result => result.json().data);
  }

  getPepperHistory() {
    return this._http.get("/api/pepper/history")
      .map(result => result.json().data);
  }

  subscribeToPepper(name: string, phone: string) {
    return this._http.post("/api/pepper/subscribe", { name, phone }, this.options)
      .map(result => result.json());
  }

  sendPepperTest(phone: string) {
    return this._http.post("/api/pepper/test", { phone }, this.options)
      .map(result => result.json());
  }

  createPage(title: string, content: string) {
    return this._http.post("/api/pages", { title, content }, this.options)
      .map(result => result.json());
  }

}
