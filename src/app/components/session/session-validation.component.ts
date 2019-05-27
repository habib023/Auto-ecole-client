import {Component, OnInit} from '@angular/core';
import {ClientService} from '../../service/client.service';
import {SessionsService} from '../../service/session.service';
import {MoniteursService} from '../../service/moniteur.service';
import {CarService} from '../../service/car.service';
import {CarModel} from '../../model/car.model';
import {Client} from '../../model/client.model';
import {MoniteurModel} from '../../model/moniteur.model';
import {SessionModel} from '../../model/session.model';
import {first} from 'rxjs/operators';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

declare var M: any;




@Component({
  selector: 'app-planing',
  templateUrl: './session-validation.component.html',
  styleUrls: ['./session-validation.component.css']
})
export class SessionValidationComponent implements OnInit {


  searchText;

   
  isSelected = true;

  title = 'app';
  sessions: SessionModel[];
  currentUser: Client;
  users: Client[] = [];
  moniteurs: MoniteurModel[];
  cars: CarModel[];
  pageSize = 5;
  page = 1;
  length: Number;


  addForm: FormGroup;

  clients: Client[] = [];
  monitorSelect;
  carSelect;
  private monitorSelectForm;

  constructor(
    private modalService: NgbModal,
    private userService: ClientService,
    private serviceSession: SessionsService,
    private router: Router,
    private formBuilder: FormBuilder,
    private moniteursService: MoniteursService,
    private carService: CarService) { }

  ngOnInit() {
    this.loadAllUsers();
    this.getAllSession();
    this.getAllMoniteurs();
    this.getAllCars();
    this.addForm = this.formBuilder.group({
      client: ['', Validators.required],
      car: ['', Validators.required],
      moniteur: ['', Validators.required],
      reservationDate: ['', Validators.required],
    });
  }

  openBackDropCustomClass(content) {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }

  loadAllUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.users = users;
    });
  }

  getAllSession(): void {
    this.serviceSession.getAllSession().subscribe((data) => {
      this.sessions = data;
      this.sessions = this.sessions.filter(item => item.state === 'REQUESTED'); // todo
      console.log(this.sessions.length, data);
      this.length = this.sessions.length;
    });
  }

  deleteUser(id: number) {
    console.log(this.users);
    this.userService.delete(id).pipe(first()).subscribe(() => {
      this.loadAllUsers();
    });

  }

  getAllMoniteurs(): void {
    this.moniteursService.getAllMoniteurs().subscribe(data => {

      this.moniteurs = data;
    });
  }

  getAllCars(): void {
    this.carService.getAllCars().subscribe(data => {
      this.cars = data;
      this.cars = this.cars.filter(item => item.state === 'Active'); // todo
    });
  }

  deleteSessions(session: SessionModel) {
    if (confirm('Are you sure to delete this record ?') === true) {
    this.serviceSession.deleteSession(session._id).subscribe(data => {
      console.log(data);
      this.getAllSession();
      M.toast({ html: 'Deleted successfully', classes: 'rounded' });

    });
  }
  }

  canceleSessions(session: SessionModel) {
    if (confirm('Are you sure to cancel this record ?') === true) {
      this.serviceSession.cancelSession(session._id).subscribe(data => {
        console.log(data);
        this.getAllSession();
      });
    }
  }

  updateSessions(session: SessionModel , moniteur , car) {
   session.car =  this.cars[car];
   session.moniteur = this.moniteurs[moniteur];

   this.serviceSession.approveSession(session).subscribe( data => {
     this.getAllSession();

   });

  }

  onSubmit(reservationDate, user, car, moniteur) {
    const session = new SessionModel;

    session.reservationDate = this.addForm.value.reservationDate;
    session.clientId = this.users[user];
    console.log('client index' + user);
    session.car = this.cars[car];
    console.log('car index' + car);
    session.monitorId = this.moniteurs[moniteur]._id;
    session.clientId = this.users[user];
    this.serviceSession.addSessionmonitoradmin(session)
      .subscribe((s: SessionModel) => {
        this.serviceSession.approveSession(s) // TODO refactor this
          .subscribe(() => this.getAllSession());
        console.log(s);
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


