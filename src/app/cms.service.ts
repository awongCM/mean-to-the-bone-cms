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

  getSmsStatus() {
    return this._http.get("/api/sms/status")
      .map(result => result.json().data);
  }

  getSmsSubscribers() {
    return this._http.get("/api/sms/subscribers")
      .map(result => result.json().data);
  }

  getSmsHistory() {
    return this._http.get("/api/sms/history")
      .map(result => result.json().data);
  }

  subscribeToSms(name: string, phone: string) {
    return this._http.post("/api/sms/subscribe", { name, phone }, this.options)
      .map(result => result.json());
  }

  sendSmsTest(phone: string) {
    return this._http.post("/api/sms/test", { phone }, this.options)
      .map(result => result.json());
  }

  createPage(title: string, content: string) {
    return this._http.post("/api/pages", { title, content }, this.options)
      .map(result => result.json());
  }

}
