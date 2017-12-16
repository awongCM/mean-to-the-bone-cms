import { Component } from '@angular/core';
import { CmsService } from './cms.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  users: Array<any>;
  pages: Array<any>;

  // TODOS
  constructor(private _cmsService: CmsService) {
    this._cmsService.getUsers()
      .subscribe(res => this.users = res);
    
    this._cmsService.getPages()
      .subscribe(res => this.pages = res);
  }
}
