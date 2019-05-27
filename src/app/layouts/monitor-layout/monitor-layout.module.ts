import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MonitorLayoutComponent} from './monitor-layout.component';
import {MonitorLayoutRoutes} from './monitor-layout.routing';
import {SharedModule} from '../../shared/shared.module';
import {HomeMonitorComponent} from '../../components/home-monitor/home-monitor.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MonitorProfileComponent} from '../../components/monitor-profile/monitor-profile.component';
import {AbsenceMonitorComponent} from '../../components/absence-monitor/absence-monitor.component';
import {BreakdownComponent} from '../../components/breakdown/breakdown.component';


@NgModule({
  imports: [
    RouterModule.forChild(MonitorLayoutRoutes),
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    AbsenceMonitorComponent,
    MonitorLayoutComponent,
    HomeMonitorComponent,
    MonitorProfileComponent,
    BreakdownComponent,
  ]
})
export class MonitorLayoutModule {
}
