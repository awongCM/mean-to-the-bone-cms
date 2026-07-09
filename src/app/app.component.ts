import { Component } from '@angular/core';
import { CmsService } from './cms.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  activeTab = 'pages';
  statusMessage = '';

  users: Array<any> = [];
  pages: Array<any> = [];
  headers: Array<any> = [];
  footers: Array<any> = [];

  draft = this.emptyContentDraft();
  userDraft = this.emptyUserDraft();
  editingId: string = null;

  constructor(private cmsService: CmsService) {
    this.loadAll();
  }

  emptyContentDraft() {
    return { title: '', content: '' };
  }

  emptyUserDraft() {
    return { name: '', username: '', password: '', admin: false };
  }

  setTab(tab: string) {
    this.activeTab = tab;
    this.cancelEdit();
  }

  loadAll() {
    this.cmsService.getUsers().subscribe(res => this.users = res || []);
    this.cmsService.getPages().subscribe(res => this.pages = res || []);
    this.cmsService.getHeaders().subscribe(res => this.headers = res || []);
    this.cmsService.getFooters().subscribe(res => this.footers = res || []);
  }

  currentItems() {
    if (this.activeTab === 'users') {
      return this.users;
    }
    if (this.activeTab === 'headers') {
      return this.headers;
    }
    if (this.activeTab === 'footers') {
      return this.footers;
    }
    return this.pages;
  }

  startEdit(item: any) {
    this.editingId = item._id;
    if (this.activeTab === 'users') {
      this.userDraft = {
        name: item.name || '',
        username: item.username || '',
        password: '',
        admin: !!item.admin
      };
      return;
    }

    this.draft = {
      title: item.title || '',
      content: item.content || ''
    };
  }

  cancelEdit() {
    this.editingId = null;
    this.draft = this.emptyContentDraft();
    this.userDraft = this.emptyUserDraft();
    this.statusMessage = '';
  }

  saveContent() {
    if (!this.draft.title) {
      this.statusMessage = 'Title is required.';
      return;
    }

    const payload = {
      title: this.draft.title,
      content: this.draft.content
    };

    let request;
    if (this.editingId) {
      const updatePayload = Object.assign({ _id: this.editingId }, payload);
      if (this.activeTab === 'pages') {
        request = this.cmsService.updatePage(updatePayload);
      } else if (this.activeTab === 'headers') {
        request = this.cmsService.updateHeader(updatePayload);
      } else {
        request = this.cmsService.updateFooter(updatePayload);
      }
    } else if (this.activeTab === 'pages') {
      request = this.cmsService.createPage(payload);
    } else if (this.activeTab === 'headers') {
      request = this.cmsService.createHeader(payload);
    } else {
      request = this.cmsService.createFooter(payload);
    }

    request.subscribe(
      () => {
        this.statusMessage = this.editingId ? 'Content updated.' : 'Content created.';
        this.cancelEdit();
        this.loadAll();
      },
      () => this.statusMessage = 'Save failed.'
    );
  }

  saveUser() {
    if (!this.userDraft.username || (!this.editingId && !this.userDraft.password)) {
      this.statusMessage = 'Username and password are required for new users.';
      return;
    }

    const payload: any = {
      name: this.userDraft.name,
      username: this.userDraft.username,
      admin: this.userDraft.admin
    };

    if (this.userDraft.password) {
      payload.password = this.userDraft.password;
    }

    const request = this.editingId
      ? this.cmsService.updateUser(Object.assign({ _id: this.editingId }, payload))
      : this.cmsService.createUser(payload);

    request.subscribe(
      () => {
        this.statusMessage = this.editingId ? 'User updated.' : 'User created.';
        this.cancelEdit();
        this.loadAll();
      },
      () => this.statusMessage = 'User save failed.'
    );
  }

  deleteItem(item: any) {
    let request;
    if (this.activeTab === 'users') {
      request = this.cmsService.deleteUser(item._id);
    } else if (this.activeTab === 'pages') {
      request = this.cmsService.deletePage(item._id);
    } else if (this.activeTab === 'headers') {
      request = this.cmsService.deleteHeader(item._id);
    } else {
      request = this.cmsService.deleteFooter(item._id);
    }

    request.subscribe(
      () => {
        this.statusMessage = 'Item deleted.';
        if (this.editingId === item._id) {
          this.cancelEdit();
        }
        this.loadAll();
      },
      () => this.statusMessage = 'Delete failed.'
    );
  }
}
