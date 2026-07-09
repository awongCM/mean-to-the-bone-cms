import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CmsService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private _http: Http) { }

  getUsers() {
    return this._http.get('/api/users')
      .map(result => result.json().data);
  }

  createUser(user: any) {
    return this._http.post('/api/users', user, this.options)
      .map(result => result.json());
  }

  updateUser(user: any) {
    return this._http.put('/api/users', user, this.options)
      .map(result => result.json());
  }

  deleteUser(id: string) {
    return this._http.delete(`/api/users/${id}`)
      .map(result => result.json());
  }

  getPages() {
    return this._http.get('/api/pages')
      .map(result => result.json().data);
  }

  createPage(page: any) {
    return this._http.post('/api/pages', page, this.options)
      .map(result => result.json());
  }

  updatePage(page: any) {
    return this._http.put('/api/pages', page, this.options)
      .map(result => result.json());
  }

  deletePage(id: string) {
    return this._http.delete(`/api/pages/${id}`)
      .map(result => result.json());
  }

  getHeaders() {
    return this._http.get('/api/headers')
      .map(result => result.json().data);
  }

  createHeader(header: any) {
    return this._http.post('/api/headers', header, this.options)
      .map(result => result.json());
  }

  updateHeader(header: any) {
    return this._http.put('/api/headers', header, this.options)
      .map(result => result.json());
  }

  deleteHeader(id: string) {
    return this._http.delete(`/api/headers/${id}`)
      .map(result => result.json());
  }

  getFooters() {
    return this._http.get('/api/footers')
      .map(result => result.json().data);
  }

  createFooter(footer: any) {
    return this._http.post('/api/footers', footer, this.options)
      .map(result => result.json());
  }

  updateFooter(footer: any) {
    return this._http.put('/api/footers', footer, this.options)
      .map(result => result.json());
  }

  deleteFooter(id: string) {
    return this._http.delete(`/api/footers/${id}`)
      .map(result => result.json());
  }
}
