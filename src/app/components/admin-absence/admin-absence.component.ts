import {Component, OnInit} from '@angular/core';
import {AbsencesService} from '../../service/absence.service';
import {AbsenceModel} from '../../model/absence.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SessionsService} from '../../service/session.service';
import {SessionModel} from '../../model/session.model';
import {CarModel} from '../../model/car.model';
import {CarService} from '../../service/car.service';
import {MoniteurModel} from '../../model/moniteur.model';
import {MoniteursService} from '../../service/moniteur.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'admin-absence',
  templateUrl: './admin-absence.component.html',
  styleUrls: ['./admin-absence.component.scss']
})
export class AdminAbsenceComponent implements OnInit {

  searchText;

  absence: AbsenceModel[];
  sessions: SessionModel[];
  cars: CarModel[];
  moniteurs: MoniteurModel[];
  sessionsTmp: any [];

  addForm: FormGroup;


  constructor(private serviceAbsence: AbsencesService,
              private modalService: NgbModal,
              private serviceSession: SessionsService,
              private carService: CarService,
              private moniteursService: MoniteursService,
              private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.getAllAbsence();
    this.getAllSession();
    this.getAllMoniteurs();
    this.getAllCars();
    this.addForm = this.formBuilder.group({

      car: ['', Validators.required],
      moniteur: ['', Validators.required],

    });


  }

  openLg(content, absence: AbsenceModel) {
    this.sessionsTmp = this.sessions.filter(item =>
      item.monitor._id === absence.monitor._id &&
      item.reservationDate > absence.debDate &&
      item.reservationDate < absence.endDate
    );


    this.modalService.open(content, {size: 'lg'});

  }


  getAllAbsence(): void {
    this.serviceAbsence.getAllAbsence().subscribe(data => {
      this.absence = data.filter(c => (new Date(c.endDate)).getTime() > Date.now());
    });
  }

  getAllSession(): void {
    this.serviceSession.getAllSession().subscribe((data) => {
      this.sessions = data.filter(c => c.state === 'APPROVED');

      console.log('les session', this.sessions);


    });
  }

  getAllMoniteurs(): void {
    this.moniteursService.getAllMoniteurs().subscribe(data => {

      console.log(data);
      this.moniteurs = data;
    });
  }

  getAllCars(): void {
    this.carService.getAllCars().subscribe(data => {
      console.log(data);
      this.cars = data;
      // this.cars = this.cars.filter(item => item.state === 'Active'); // todo
    });
  }


  canceleSessions(session: SessionModel) {
    if (confirm('Are you sure to cancel this record ?') === true) {
      this.serviceSession.cancelSession(session._id).subscribe(data => {
        console.log(data);
        this.sessionsTmp.splice(this.sessionsTmp.indexOf(session), 1);

        this.getAllSession();

      });
    }
  }

  updateSessions(session: SessionModel, moniteur, car) {
    session.car = this.cars[car];
    console.log('car index' + car);
    session.monitorId = this.moniteurs[moniteur]._id;
    console.log('car index' + moniteur._id);
    this.serviceSession.updateSession(session).subscribe((session) => {
      this.sessionsTmp.splice(this.sessionsTmp.indexOf(session), 1);
      this.getAllSession();
      console.log(session);
    });
  }

  selectDefaultMonitor(m, s, sl) {
    if (s.monitor && m.name === s.monitor.name) {
      sl.selectedIndex = this.moniteurs.indexOf(m);
    }
  }

  selectDefaultCar(m, s, sl) {
    if (s.car && m.num === s.car.num) {
      sl.selectedIndex = this.cars.indexOf(m);
    }
  }

}
