import {Routes} from '@angular/router';

import {DashboardComponent} from '../../components/dashboard/dashboard.component';
import {SessionValidationComponent} from '../../components/session/session-validation.component';
import {CarsComponent} from '../../components/cars/cars.component';
import {MoniteursComponent} from '../../components/moniteurs/moniteurs.component';
import {AddCarComponent} from '../../components/cars/add-car/add-car.component';
import {EditCarComponent} from '../../components/cars/edit-car/edit-car.component';
import {EditMoniteurComponent} from '../../components/moniteurs/edit-moniteur/edit-moniteur.component';
import {AddMoniteurComponent} from '../../components/moniteurs/add-moniteur/add-moniteur.component';
import {AuthGuard} from '../../_guards';
import {AdminLayoutComponent} from './admin-layout.component';
import {SessionCalendarComponent} from '../../components/calendar/session-calendar/session-calendar.component';
import {ExamComponent} from '../../components/exam/exam.component';
import {PassiveClientComponent} from '../../components/passive-client/passive-client.component';
import {ExamResultComponent} from '../../components/exam-resultat/exam-result.component';
import {PassiveClientUpdateComponent} from '../../components/passive-client-update/passive-client-update.component';
import {AdminBreakdownComponent} from '../../components/admin-breakdown/admin-breakdown.component';
import {AdminAbsenceComponent} from '../../components/admin-absence/admin-absence.component';
import {ExameCalenderComponent} from '../../components/calendar/exame-calender/exame-calender.component';

export const AdminLayoutRoutes: Routes = [{
    path: 'admin',
    component: AdminLayoutComponent,
    children: [{
            path: 'dashboard',
            component: DashboardComponent ,
            canActivate: [AuthGuard],
            data: {role: 'admin'}
        },
        {
            path: 'planing',
            component: SessionValidationComponent,
            canActivate: [AuthGuard],
            data: {role: 'admin'}
        },
        {
            path: 'cars',
            component: CarsComponent,
            canActivate: [AuthGuard],
            data: {role: 'admin'}
        },
        {
            path: 'add-car',
            component: AddCarComponent
        },
        {
            path: 'edit-car/:id',
            component: EditCarComponent
        },
        {
            path: 'moniteurs',
            component: MoniteursComponent ,
            canActivate: [AuthGuard],
            data: {role: 'admin'}
        },
        {
            path: 'admin-calendar',
            component: SessionCalendarComponent,
            // canActivate: [AuthGuard],
            // data: {role: 'admin'}
        },
      {
        path: 'admin-calendarexame',
        component: ExameCalenderComponent,
        // canActivate: [AuthGuard],
        // data: {role: 'admin'}
      },
        {
            path: 'add-moniteur',
            component: AddMoniteurComponent
        },
        {
            path: 'edit-moniteur/:id',
            component: EditMoniteurComponent
        },
      {
        path: 'exam',
        component: ExamComponent,
        canActivate: [AuthGuard],
        data: {role: 'admin'}
      },
      {
        path: 'exam-result/:id',
        component: ExamResultComponent,
        canActivate: [AuthGuard],
        data: {role: 'admin'}
      },
      {
        path: 'passive-client',
        component: PassiveClientComponent,
        canActivate: [AuthGuard],
        data: {role: 'admin'}
      },
      {
        path: 'update-passive-client/:id',
        component: PassiveClientUpdateComponent
    },
      {
        path: 'admin-panne',
        component: AdminBreakdownComponent,
        canActivate: [AuthGuard],
        data: {role: 'admin'}
      },
      {
        path: 'admin-absence',
        component: AdminAbsenceComponent,
        canActivate: [AuthGuard],
        data: {role: 'admin'}
      },

    ]}

];
