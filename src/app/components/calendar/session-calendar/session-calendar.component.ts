import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {addHours} from 'date-fns';
import {SessionsService} from '../../../service/session.service';
import * as jwt_decode from 'jwt-decode';
import {CalendarEvent, CalendarEventAction} from 'angular-calendar';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CarService} from '../../../service/car.service';
import {MoniteursService} from '../../../service/moniteur.service';
import {SessionModel} from '../../../model/session.model';
import {CarModel} from '../../../model/car.model';
import {MoniteurModel} from '../../../model/moniteur.model';
import {Observable} from 'rxjs';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};


@Component({
  selector: 'app-session-calendar',
  templateUrl: './session-calendar.component.html',
  styleUrls: ['./session-calendar.component.scss']
})
export class SessionCalendarComponent implements OnInit {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  sessionsEvent: CalendarEvent[] = [];
  filteredSession = new Set(); // This should be a set to prevent duplication
  sessions: any[] = [];
  payload;
  modalData: {
    session$: Observable<SessionModel>,
    cars$: Observable<CarModel[]>,
    monitors$: Observable<MoniteurModel[]>
  };
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.handleEvent('Edit', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({event}: { event: CalendarEvent }): void => {
        if (confirm('Are you sure to cancel this record ?') === true) {
          this.sessionsEvent = this.sessionsEvent.filter(iEvent => iEvent !== event);
        }
        this.handleEvent('Delete', event);
      }
    }
  ];

  constructor(private sessionService: SessionsService,
              private modal: NgbModal,
              private carService: CarService,
              private monitorService: MoniteursService) {
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    this.payload = jwt_decode(token);
    switch (this.payload.role) {
      case 'admin': {
        this.sessionService.getAllSession().subscribe((data) => {
          this.sessions = data.filter(c => c.state !== 'REQUESTED');
          this.processRequest(this.sessions);
        });
        break;
      }
      case 'client': {
        this.sessionService.getClientSession().subscribe((data) => {
          this.sessions = data.filter(c => c.state !== 'REQUESTED');
          this.processRequest(this.sessions);
        });
        break;
      }
      case 'monitor': {
        this.sessionService.getMonitorSession().subscribe((data) => {
          this.sessions = data.filter(c => c.state !== 'REQUESTED');
          this.processRequest(this.sessions);
        });
        break;
      }
    }
  }

  processRequest(data: any[]) {
    console.log('Processing the data to be published in the calendar');
    this.sessionsEvent = [];
    data.forEach((session) => {
      if (['APPROVED', 'PENDING'].indexOf(session.state) > -1) {
        this.sessionsEvent.push({
          id: session._id,
          title: ' C:' + session.client.name + ' ' + session.client.surname +
            ' M:' + session.monitor.name + ' ' + session.monitor.surname +
            ' V:' + session.car.mark + ' ' + session.car.model + ' ' + session.car.serialNum,
          color: (session.client.state.indexOf('DRIVING') > -1) ? colors.yellow : colors.red,
          start: addHours(session.reservationDate, 0),
          end: addHours(session.reservationDate, 1),
          actions: (this.payload.role !== 'client') ? this.actions : [this.actions[1]],
        });
      }
    });
    console.log('sessionEvent: ', this.sessionsEvent);
    console.log('session list: ', this.sessions);
  }

  filterSessions(items: any) {
    let i = 0;
    this.filteredSession.clear();
    console.log('emitted data', items);
    Object.keys(items).forEach((key) => {
      console.log('current key', key);
      i += items[key].length;
      if (items[key].length !== 0) {
        this.sessions.filter(c => {
          console.log('key inside filter', key, ' value of c: ', c);
          console.log('tmp array value inside filter', this.filteredSession);
          if (key === 'type') {
            return items[key].map(x => x.value).indexOf(c.client.state) > -1;
          }
          return items[key].map(x => x.id).indexOf(c[key]._id) > -1;
        })
          .forEach(c => this.filteredSession.add(c));
      }
    });
    console.log('Data emitted length: ' + i);
    console.log('Filtering result: ', this.filteredSession);
    this.processRequest((i) ? Array.from(this.filteredSession) : this.sessions);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    setTimeout(() => {
      switch (action) {
        case 'Edit' : {
          this.modalData = {
            session$: this.sessionService.getSessionById(event.id.toString()),
            cars$: this.carService.getAllCars(),
            monitors$: this.monitorService.getAllMoniteurs(),
          };
          this.modal.open(this.modalContent, {size: 'lg'});
          break;
        }
        case 'Delete' : {
          this.sessionService.cancelSession(event.id.toString())
            .subscribe(data => console.log(data),
              err => console.log(err));
          break;
        }
      }
    }, 0);
  }

  updateSessions(session: SessionModel, monitor: MoniteurModel, car: CarModel) {
    console.log('The click event work');
    session.moniteur = monitor;
    session.car = car;
    this.sessionService.updateSession(session).subscribe(
      (data) => {
        this.sessions[this.sessions.findIndex((c) => c._id === session._id)] = data;
        this.processRequest(this.sessions);
      },
      (err) => console.log(err),
      () => console.log('session updated')
    );
  }
}
