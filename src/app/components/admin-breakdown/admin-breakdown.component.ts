import {Component, OnInit} from '@angular/core';
import {BreakdownService} from '../../service/breakdown.service';
import {breakdownModel} from '../../model/breakdown.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SessionModel} from '../../model/session.model';
import {SessionsService} from '../../service/session.service';
import {CarModel} from '../../model/car.model';
import {CarService} from '../../service/car.service';
import {MoniteurModel} from '../../model/moniteur.model';
import {MoniteursService} from '../../service/moniteur.service';

@Component({
  selector: 'admin-breakdown',
  templateUrl: './admin-breakdown.component.html',
  styleUrls: ['./admin-breakdown.component.scss']
})
export class AdminBreakdownComponent implements OnInit {


  elements: any = [];


  searchText;
  moniteurs: MoniteurModel[];
  cars: CarModel[];
  sessionsTmp: any [];
  sessions: SessionModel[];
  Breakdowns: breakdownModel[];
  agency: string;

  constructor(
    private breakdownService: BreakdownService,
    private serviceSession: SessionsService,
    private modalService: NgbModal,
    private carService: CarService,
    private moniteursService: MoniteursService,
  ) {
  }

  ngOnInit() {
    this.getAllbreakdwon();
    this.getAllSession();
    this.getAllMoniteurs();
    this.getAllCars();


    for (let i = 1; i <= 11; i++) {
      this.elements.push({
        id: i,
        first: {nick: 'Nick ' + i, name: 'Name ' + i},
        last: 'Name ' + i,
        handle: 'Handle ' + i
      });
    }
 
  }

  getAllCars(): void {
    this.carService.getAllCars().subscribe(data => {
      console.log(data);
      this.cars = data;
      // this.cars = this.cars.filter(item => item.state === 'Active'); // todo
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

  openLg(content, breakdown: breakdownModel) {
    this.sessionsTmp = this.sessions.filter(item =>
      item.car._id === breakdown.car._id
    );
    this.modalService.open(content, {size: 'lg'});
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


  getAllbreakdwon(): void {
    this.breakdownService.getAllbreakdow().subscribe(data => {
      this.Breakdowns = data;
    });
  }


  fixed(breakdown: breakdownModel) {
    if (confirm('Are you sure  this record is fixed ?') === true) {
      this.breakdownService.fixedbreakdow(breakdown._id).subscribe(data => {
        console.log(data);
        this.getAllbreakdwon();
      });

    }
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

  updateSessions(session: SessionModel, moniteur, car) {


    //session.reservationDate = this.addForm.value.reservationDate;

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


}
