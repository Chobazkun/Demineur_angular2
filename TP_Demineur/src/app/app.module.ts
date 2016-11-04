import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CaseComponent } from './case/case.component';
import { TabComponent } from './tab/tab.component';
import { SimpleNotificationsModule } from 'angular2-notifications/';

@NgModule({
  declarations: [
    AppComponent,
    CaseComponent,
    TabComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SimpleNotificationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
