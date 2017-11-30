import { Component } from '@angular/core';
import { CmsService } from './cms.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  users: Array<any>;

  constructor(private _cmsService: CmsService){
    this._cmsService.getUsers()
      .subscribe(res => this.users = res);
  }
}
