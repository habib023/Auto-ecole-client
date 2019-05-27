import {Routes} from '@angular/router';
import {MonitorLayoutComponent} from './monitor-layout.component';
import {SessionCalendarComponent} from '../../components/calendar/session-calendar/session-calendar.component';
import {AuthGuard} from '../../_guards';
import {HomeMonitorComponent} from '../../components/home-monitor/home-monitor.component';
import {MonitorProfileComponent} from '../../components/monitor-profile/monitor-profile.component';
import {AbsenceMonitorComponent} from '../../components/absence-monitor/absence-monitor.component';
import {BreakdownComponent} from '../../components/breakdown/breakdown.component';

export const MonitorLayoutRoutes: Routes = [{
  path: 'monitor',
  component: MonitorLayoutComponent,
  children: [
    {
      path: 'monitor-profile',
      component: MonitorProfileComponent,
      canActivate: [AuthGuard],
      data: {role: 'monitor'}
    },
    {
      path: 'absence-monitor',
      component: AbsenceMonitorComponent,
      canActivate: [AuthGuard],
      data: {role: 'monitor'}
    },
    {
      path: 'home-monitor',
      component: HomeMonitorComponent,
      canActivate: [AuthGuard],
      data: {role: 'monitor'}
    },
    {
      path: 'monitor-calendar',
      component: SessionCalendarComponent,
      canActivate: [AuthGuard],
      data: {role: 'monitor'}
    },
    {
      path: 'panne-car',
      component: BreakdownComponent,
      canActivate: [AuthGuard],
      data: {role: 'monitor'}
    },
  ]
}];
