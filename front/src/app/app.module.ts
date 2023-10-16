import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './mainApp/home/home.component';
import { JwtInterceptor } from './interceptor/jwt.interceptor';
import { MessagesComponent } from './mainApp/messages/messages.component';
import { BaseComponent } from './mainApp/base/base.component';

import { ColorTheme, NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { envelope, boxArrowLeft, x, house,arrowRightCircle, personAdd, personFillDash, plusCircleFill, personPlusFill, send } from 'ngx-bootstrap-icons';
import { ViewUserComponent } from './mainApp/view-user/view-user.component';

const icons = {
  envelope,
  boxArrowLeft,
  x,
  house,
  arrowRightCircle,
  personAdd,
  personFillDash,
  plusCircleFill,
  personPlusFill,
  send
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MessagesComponent,
    BaseComponent,
    ViewUserComponent
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    NgxBootstrapIconsModule.pick(icons, {
      width: '1em',
      height: '1em',
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
