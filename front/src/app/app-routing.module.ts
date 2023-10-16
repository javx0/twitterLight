import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './mainApp/home/home.component';
import { BaseComponent } from './mainApp/base/base.component';
import { MessagesComponent } from './mainApp/messages/messages.component';
import { authGuard } from './guard/auth.guard';
import { ViewUserComponent } from './mainApp/view-user/view-user.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent},

  { path: '', component: BaseComponent,

  children: [
    {
      path: 'home/:id',
      component: HomeComponent,
    },
    {
      path: 'messages',
      component: MessagesComponent, 
    },
    {
      path: 'user/:name',
      component: ViewUserComponent,
    }
  ]
  , canActivate:[authGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
