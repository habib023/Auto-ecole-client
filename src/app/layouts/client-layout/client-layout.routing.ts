import {Routes} from '@angular/router';
import {ClientLayoutComponent} from './client-layout.component';
import {ClientProfileComponent} from '../../components/client/client-profile/client-profile.component';
import {AuthGuard} from '../../_guards';
import {AddSessionComponent} from '../../components/client/home-client/add-session/add-session.component';
import {HomeClientComponent} from '../../components/client/home-client/home-client.component';
import {SessionCalendarComponent} from '../../components/calendar/session-calendar/session-calendar.component';

export const ClientLayoutRoutes: Routes = [{
  path: 'client',
  component: ClientLayoutComponent,
  children: [{
      path: 'client-profile',
      component: ClientProfileComponent,
      canActivate: [AuthGuard],
      data: {role: 'client'}
    }, {
      path: 'add-session',
      component: AddSessionComponent,
    }, {
      path: 'home-client',
      component: HomeClientComponent,
      canActivate: [AuthGuard],
      data: {role: 'client'}
    },
    {
      path: 'client-calendar',
      component: SessionCalendarComponent,
      canActivate: [AuthGuard],
      data: {role: 'client'}
    },
  ]}
];
