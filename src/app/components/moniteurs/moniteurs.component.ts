import {Component, OnInit, ViewChild} from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MoniteursService} from '../../service/moniteur.service';
import {MoniteurModel} from '../../model/moniteur.model';
import {Admin} from '../../model/admin.model';

import {DisplayNotificationService} from '../../service/display-notification.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatTable} from '@angular/material';
import {AbsencesService} from '../../service/absence.service';
import {AbsenceModel} from '../../model/absence.model';
import {DatePipe} from '@angular/common';
import {SessionModel} from '../../model/session.model';
import {SessionsService} from '../../service/session.service';
import {CarService} from '../../service/car.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CarModel} from '../../model/car.model';

@Component({
  selector: 'app-moniteurs',
  templateUrl: './moniteurs.component.html',
  styleUrls: ['./moniteurs.component.scss'],
  providers: [MoniteursService],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MoniteursComponent implements OnInit {

  @ViewChild('monitorTab') table: MatTable<MonitorTable>;
  @ViewChild('absenceTab') tableAbsence: MatTable<AbsenceTable>;


  // Monitor list var
  moniteurs: MoniteurModel[];
  currentUser: Admin;
  users: Admin[] = [];
  addForm: FormGroup;
  submitted = false;
  _tmp: MoniteurModel;

  dataSource: MonitorTable[] = [];
  columnsToDisplay = ['cin', 'name', 'surname', 'phone', 'state', 'action'];
  MonitorColumnsNameInFr = {
    'cin': 'CIN',
    'name': 'Nom',
    'surname': 'Prénom',
    'phone': 'Telephone',
    'state': 'Status',
  };
  columnsToLoop = this.columnsToDisplay.slice(0, 5);
  expandedElement: MonitorTable | any;

  // Absence var
  absences: AbsenceModel[];
  dataSourceAbsence: AbsenceTable[] = [];
  columnsToDisplayAbsence = ['monitorFullName', 'monitorCin', 'debDate', 'endDate', 'action'];
  AbsenceColumnsNameInFr = {
    'monitorFullName': 'Nom',
    'monitorCin': 'CIN',
    'debDate': 'Date Debut',
    'endDate': 'Date Fin',
  };
  columnsToLoopAbsence = this.columnsToDisplayAbsence.slice(0, 4);
  expandedElementAbsence: AbsenceTable | null;
  cars: CarModel[] = [];
  sessions: SessionModel[] = [];
  private sessionsTmp: any;
  private tmp: MoniteurModel | any;

  constructor(
    private moniteursService: MoniteursService,
    private formBuilder: FormBuilder,
    private router: Router,
    private displayNotif: DisplayNotificationService,
    private serviceSession: SessionsService,
    private carService: CarService,
    private modalService: NgbModal,
    private monitorAbsenceService: AbsencesService,
  ) {
  }

  ngOnInit() {
    this.getAllSession();
    this.getAllCars();
    this.getAllMoniteurs();
    this.getAllAbsence();
    this.addForm = this.formBuilder.group({
      car: ['', Validators.required],
      moniteur: ['', Validators.required],
    });
  }

  getAllAbsence() {
    this.monitorAbsenceService.getAllAbsence().subscribe((data) => {
      this.absences = data;
      this.dataSourceAbsence = [];
      data.forEach(c => {
        this.dataSourceAbsence.push({
          debDate: new DatePipe('en-US').transform(c.debDate, 'EEEE dd MMMM yyyy   HH:MM'),
          endDate: new DatePipe('en-US').transform(c.endDate, 'EEEE dd MMMM yyyy   HH:MM'),
          monitorFullName: c.monitor.name + ' ' + c.monitor.surname,
          monitorCin: c.monitor.cin,
        });
      });
      this.tableAbsence.renderRows();
      console.log('absence list:', this.dataSourceAbsence);
    });
  }

  getAllMoniteurs(): void {
    this.moniteursService.getAllMoniteurs().subscribe(data => {
      this.moniteurs = data;
      this.dataSource = [];
      data.forEach(c => {
        this.dataSource.push({
          cin: c.cin,
          name: c.name,
          surname: c.surname,
          phone: c.phone,
          state: c.state,
        });
      });
      this.table.renderRows();
      console.log(this.dataSource);
    });
  }

  getAllSession(): void {
    this.serviceSession.getAllSession().subscribe((data) => {
      this.sessions = data.filter(c => c.state === 'APPROVED');

      console.log('les session', this.sessions);


    });
  }

  getAllCars(): void {
    this.carService.getAllCars().subscribe(data => {
      console.log(data);
      this.cars = data;
      // this.cars = this.cars.filter(item => item.state === 'Active'); // todo
    });
  }

  getMonitorWCin(cin) {
    if (!this._tmp) {
      this._tmp = this.moniteurs.filter(c => c.cin === cin)[0];
    }
    return this._tmp;
  }

  deleteMoniteur(cin) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet enregistrement?') === true) {
      const id = this.getMonitorWCin(cin)._id;
      this.moniteursService.deleteMoniteur(id).subscribe(data => {
        this.getAllMoniteurs();
        this.displayNotif.pushNotif('Opération réussie',
          'La supprimer du moniteur est effectue avec succès',
          4, 0);
      });
    }
  }

  async updateMoniteur(addMonitor, cin) {
    const monitor = this.moniteurs.filter(c => c.cin === cin)[0];
    this.modalService.open(addMonitor, {
      size: 'lg',
      windowClass: 'monitor-add-modal',
    });
    this.tmp = monitor;
  }

  updateSessions(session: SessionModel, moniteur, car) {
    session.car = this.cars[car];
    console.log('car id' + car);
    session.monitorId = this.moniteurs[moniteur]._id;
    console.log('monitor id' + moniteur._id);
    console.log('session: ', session);
    this.serviceSession.updateSession(session).subscribe((s) => {
      this.sessionsTmp.splice(this.sessionsTmp.indexOf(s), 1);
      this.getAllSession();
      console.log(s);
    });
  }

  cancelSessions(session: SessionModel) {
    if (confirm('Are you sure to cancel this record ?') === true) {
      this.serviceSession.cancelSession(session._id).subscribe(data => {
        console.log(data);
        this.sessionsTmp.splice(this.sessionsTmp.indexOf(session), 1);

        this.getAllSession();

      });
    }
  }

  selectDefaultMonitor(m, s, sl) {
    if (s.monitor && m.name === s.monitor.name) {
      sl.selectedIndex = this.moniteurs.indexOf(m);
    }
  }

  submitNewMonitor() {
    ;
  }

  openResolveAbsenceModal(content, absenceMatTableRow: AbsenceTable) {
    console.log('Testing OpenLg:');
    console.log('cinMonitor:', absenceMatTableRow.monitorCin);
    console.log('debDate:', new Date(absenceMatTableRow.debDate));
    console.log('endDate:', new Date(absenceMatTableRow.endDate));
    this.sessionsTmp = this.sessions.filter(item => {
        return item.monitor.cin === absenceMatTableRow.monitorCin &&
          new Date(item.reservationDate) > new Date(absenceMatTableRow.debDate) &&
          new Date(item.reservationDate) < new Date(absenceMatTableRow.endDate) &&
          item.state === 'APPROVED';
      }
    );


    this.modalService.open(content, {size: 'lg'});

  }

  openAddMonitorModal(addMonitor): void {
    // this.router.navigate(['admin/add-moniteur']);
    this.modalService.open(addMonitor, {
      size: 'lg',
      windowClass: 'monitor-add-modal',
    });
  }

}


export interface MonitorTable {
  cin: string;
  name: string;
  surname: string;
  phone: string;
  state: string;
}

export interface AbsenceTable {
  debDate: string;
  endDate: string;
  monitorFullName: string;
  monitorCin: string;
}
