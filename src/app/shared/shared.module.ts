import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SessionCalendarComponent} from '../components/calendar/session-calendar/session-calendar.component';
import {CalendarComponent} from '../components/calendar/calendar/calendar.component';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {RouterModule} from '@angular/router';
import {NgbModule, NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import {FooterComponent} from '../components/footer/footer.component';
import {NavbarComponent} from '../components/navbar/navbar.component';
import {SidebarComponent} from '../components/sidebar/sidebar.component';
import {CalendarHeaderComponent} from '../components/calendar/calendar-header/calendar-header.component';
import {CalenderFilterComponent} from '../components/calendar/calender-filtre/calender-filter.component';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {FormsModule} from '@angular/forms';
import {ExameCalenderComponent} from '../components/calendar/exame-calender/exame-calender.component';
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import {MatTableModule} from '@angular/material/table';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

const config: SocketIoConfig = {url: 'http://localhost:3000', options: {}};

@NgModule({
  declarations: [
    CalendarComponent,
    SessionCalendarComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    CalendarHeaderComponent,
    CalenderFilterComponent,
    ExameCalenderComponent,
  ],
  imports: [
    CommonModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    NgMultiSelectDropDownModule.forRoot(),
    RouterModule,
    NgbModule,
    FormsModule,
    SocketIoModule.forRoot(config),
    MatTableModule,
    MDBBootstrapModule.forRoot(),
  ],
  exports: [
    SessionCalendarComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ExameCalenderComponent,
    NgbPagination,
    MatTableModule,
  ],
})
export class SharedModule { }
