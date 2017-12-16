import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

// HTTP modules resolved based on these release logs
// https://github.com/angular/angular/issues/20096
// https://github.com/angular/angular-cli/issues/8858
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { CmsService } from './cms.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [CmsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
