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
  headers: Array<any>;
  footers: Array<any>;
  pepperStatus: any;
  pepperSubscribers: Array<any>;
  pepperHistory: Array<any>;

  subscriberName = '';
  subscriberPhone = '';
  testPhone = '';
  newPageTitle = '';
  newPageContent = '';
  pepperMessage = '';

  constructor(private _cmsService: CmsService) {
    this.loadCmsData();
    this.loadPepperData();
  }

  loadCmsData() {
    this._cmsService.getUsers()
      .subscribe(res => this.users = res);

    this._cmsService.getPages()
      .subscribe(res => this.pages = res);

    this._cmsService.getHeaders()
      .subscribe(res => this.headers = res);

    this._cmsService.getFooters()
      .subscribe(res => this.footers = res);
  }

  loadPepperData() {
    this._cmsService.getPepperStatus()
      .subscribe(res => this.pepperStatus = res);

    this._cmsService.getPepperSubscribers()
      .subscribe(res => this.pepperSubscribers = res);

    this._cmsService.getPepperHistory()
      .subscribe(res => this.pepperHistory = res);
  }

  subscribeToPepper() {
    if (!this.subscriberPhone) {
      this.pepperMessage = 'Enter a phone number to subscribe.';
      return;
    }

    this._cmsService.subscribeToPepper(this.subscriberName, this.subscriberPhone)
      .subscribe(
        () => {
          this.pepperMessage = 'Subscribed to Pepper SMS alerts.';
          this.subscriberName = '';
          this.subscriberPhone = '';
          this.loadPepperData();
        },
        () => this.pepperMessage = 'Subscription failed.'
      );
  }

  sendPepperTest() {
    if (!this.testPhone) {
      this.pepperMessage = 'Enter a phone number for the test SMS.';
      return;
    }

    this._cmsService.sendPepperTest(this.testPhone)
      .subscribe(
        () => {
          this.pepperMessage = 'Test SMS queued.';
          this.testPhone = '';
          this.loadPepperData();
        },
        () => this.pepperMessage = 'Test SMS failed.'
      );
  }

  publishPage() {
    if (!this.newPageTitle) {
      this.pepperMessage = 'Enter a page title to publish.';
      return;
    }

    this._cmsService.createPage(this.newPageTitle, this.newPageContent)
      .subscribe(
        () => {
          this.pepperMessage = 'Page published. Pepper will notify subscribers.';
          this.newPageTitle = '';
          this.newPageContent = '';
          this.loadCmsData();
          this.loadPepperData();
        },
        () => this.pepperMessage = 'Page publish failed.'
      );
  }
}
