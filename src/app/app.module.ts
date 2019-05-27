import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import du interceptor
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';

import {AppRoutingModule} from './app.routing';

import {AppComponent} from './app.component';
// importer les service
import {MoniteursService} from './service/moniteur.service';
import {CarService} from './service/car.service';
import {AuthenticationService} from './service/authentication.service';
import {AdminService} from './service/admin.service';
import {ClientService} from './service/client.service';

import {AlertService} from './service/alert.service';
// import for Admin authorization
import {AuthGuard} from './_guards/';
import {ErrorInterceptor, JwtInterceptor} from './_helpers/';
import {SessionsService} from './service/session.service';
import {AgenceService} from './service/agence.service';
import {DropdownModule} from 'primeng/dropdown';
import {AccueilComponent} from './components/accueil/accueil.component';
import {SharedModule} from './shared/shared.module';
import {LoginComponent} from './components/login/login.component';
import {RegisterClientComponent} from './components/register-client/register-client.component';
import {ExamService} from './service/exam.service';
import {AbsencesService} from './service/absence.service';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {AccountComponent} from './components/account/account.component';
import {RestPasswordComponent} from './components/rest-password/rest-password.component';
import {DisplayNotificationService} from './service/display-notification.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BreakdownService} from './service/breakdown.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    DropdownModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    SimpleNotificationsModule.forRoot(),
      // Custom module
    AppRoutingModule,
    SharedModule,
  ],
  declarations: [
    AppComponent,
    AccueilComponent,
    LoginComponent,
    RegisterClientComponent,
    ForgotPasswordComponent,
    AccountComponent,
    RestPasswordComponent,

  ],
  providers: [
    AbsencesService,
    AgenceService,
    BreakdownService,
    ExamService,
    ClientService,
    CarService,
    MoniteursService,
    SessionsService,
    AuthGuard,
    AlertService,
    AuthenticationService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AdminService,
    DisplayNotificationService,
    BreakdownService,
    NgbActiveModal,
  ],

  bootstrap: [AppComponent],
})
export class AppModule { }
