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
  smsStatus: any;
  smsSubscribers: Array<any>;
  smsHistory: Array<any>;

  subscriberName = '';
  subscriberPhone = '';
  testPhone = '';
  newPageTitle = '';
  newPageContent = '';
  smsMessage = '';

  constructor(private _cmsService: CmsService) {
    this.loadCmsData();
    this.loadSmsData();
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

  loadSmsData() {
    this._cmsService.getSmsStatus()
      .subscribe(res => this.smsStatus = res);

    this._cmsService.getSmsSubscribers()
      .subscribe(res => this.smsSubscribers = res);

    this._cmsService.getSmsHistory()
      .subscribe(res => this.smsHistory = res);
  }

  subscribeToSms() {
    if (!this.subscriberPhone) {
      this.smsMessage = 'Enter a phone number to subscribe.';
      return;
    }

    this._cmsService.subscribeToSms(this.subscriberName, this.subscriberPhone)
      .subscribe(
        () => {
          this.smsMessage = 'Subscribed to CMS SMS alerts.';
          this.subscriberName = '';
          this.subscriberPhone = '';
          this.loadSmsData();
        },
        () => this.smsMessage = 'Subscription failed.'
      );
  }

  sendSmsTest() {
    if (!this.testPhone) {
      this.smsMessage = 'Enter a phone number for the test SMS.';
      return;
    }

    this._cmsService.sendSmsTest(this.testPhone)
      .subscribe(
        () => {
          this.smsMessage = 'Test SMS queued.';
          this.testPhone = '';
          this.loadSmsData();
        },
        () => this.smsMessage = 'Test SMS failed.'
      );
  }

  publishPage() {
    if (!this.newPageTitle) {
      this.smsMessage = 'Enter a page title to publish.';
      return;
    }

    this._cmsService.createPage(this.newPageTitle, this.newPageContent)
      .subscribe(
        () => {
          this.smsMessage = 'Page published. Subscribers will be notified by SMS.';
          this.newPageTitle = '';
          this.newPageContent = '';
          this.loadCmsData();
          this.loadSmsData();
        },
        () => this.smsMessage = 'Page publish failed.'
      );
  }
}
