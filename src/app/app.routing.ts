import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {RegisterClientComponent} from './components/register-client/register-client.component';
import {SessionCalendarComponent} from './components/calendar/session-calendar/session-calendar.component';
import {AccueilComponent} from './components/accueil/accueil.component';
import {LoginComponent} from './components/login/login.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {AccountComponent} from './components/account/account.component';
import {RestPasswordComponent} from './components/rest-password/rest-password.component';


const routes: Routes = [

  {
    path: '',
    loadChildren: './layouts/super-admin-layout/super-admin-layout.module#SuperAdminLayoutModule'
  },

  {
    path: 'reset-password/:token',
    component: RestPasswordComponent
  },
  {
    path: 'account-validation',
    component: AccountComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
   {
    path: 'accueil',
    component: AccueilComponent
  }, {
    path: 'register-client/:id',
    component: RegisterClientComponent
  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'client-calendar',
    component: SessionCalendarComponent
  }, {
    path: '',
    loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }, {
    path: '',
    loadChildren: './layouts/client-layout/client-layout.module#ClientLayoutModule'
  }, {
    path: '',
    loadChildren: './layouts/monitor-layout/monitor-layout.module#MonitorLayoutModule'
  },
   {
    path: '**',
    redirectTo: '/login'
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
