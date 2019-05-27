import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminLayoutRoutes} from './admin-layout.routing';
import {DashboardComponent} from '../../components/dashboard/dashboard.component';
import {SessionValidationComponent} from '../../components/session/session-validation.component';
import {CarsComponent} from '../../components/cars/cars.component';
import {MoniteursComponent} from '../../components/moniteurs/moniteurs.component';
import {ChartsModule} from 'ng2-charts';
import {ToastrModule} from 'ngx-toastr';
import {AddCarComponent} from '../../components/cars/add-car/add-car.component';

import {EditCarComponent} from '../../components/cars/edit-car/edit-car.component';
import {EditMoniteurComponent} from '../../components/moniteurs/edit-moniteur/edit-moniteur.component';
import {AddMoniteurComponent} from '../../components/moniteurs/add-moniteur/add-moniteur.component';
import {AuthGuard} from '../../_guards/';
import {ErrorInterceptor, JwtInterceptor} from '../../_helpers/';
import {AuthenticationService} from '../../service/authentication.service';
import {AdminService} from '../../service/admin.service';
import {AlertService} from '../../service/alert.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {SharedModule} from '../../shared/shared.module';
import {AdminLayoutComponent} from './admin-layout.component';
import {ExamComponent} from '../../components/exam/exam.component';
import {PassiveClientComponent} from '../../components/passive-client/passive-client.component';
import {ExamResultComponent} from '../../components/exam-resultat/exam-result.component';
import {PassiveClientUpdateComponent} from '../../components/passive-client-update/passive-client-update.component';
import {AdminBreakdownComponent} from '../../components/admin-breakdown/admin-breakdown.component';
import {AdminAbsenceComponent} from '../../components/admin-absence/admin-absence.component';
import {MatChipsModule} from '@angular/material/chips';
import {Ng2SearchPipeModule} from 'ng2-search-filter';


@NgModule({
  imports: [
    CommonModule,
    Ng2SearchPipeModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    MatChipsModule,
    ToastrModule.forRoot(),
    // Custom module
    RouterModule.forChild(AdminLayoutRoutes),
    SharedModule,
  ],
  declarations: [
    DashboardComponent,
    SessionValidationComponent,
    CarsComponent,
    ExamResultComponent,
    AddCarComponent,
    EditCarComponent,
    PassiveClientUpdateComponent,
    MoniteursComponent,
    EditMoniteurComponent,
    AddMoniteurComponent,
    AdminLayoutComponent,
    ExamComponent,
    PassiveClientComponent,
    AdminBreakdownComponent,
    AdminAbsenceComponent,

  ],

  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    AdminService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
],

  entryComponents: [
    AddCarComponent,
  ]

})

export class AdminLayoutModule {}
