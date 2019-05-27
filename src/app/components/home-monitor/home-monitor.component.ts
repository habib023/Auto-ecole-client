import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SessionModel} from '../../model/session.model';
import {ClientService} from '../../service/client.service';
import {SessionsService} from '../../service/session.service';
import {CarService} from '../../service/car.service';
import {MoniteursService} from '../../service/moniteur.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Client} from '../../model/client.model';
import {CarModel} from '../../model/car.model';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Router} from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'home-monitor',
  templateUrl: './home-monitor.component.html',
  styleUrls: ['./home-monitor.component.scss']
})
export class HomeMonitorComponent implements OnInit {

  sessions: SessionModel[];
  addForm: FormGroup;
  users: Client[] = [];
  clients: Client[] = [];
  cars: CarModel[] = [];
  private fileUrl: SafeResourceUrl;


  constructor(
    private modalService: NgbModal,
    private moniteursService: MoniteursService,
    private carService: CarService,
    private userService: ClientService,
    private formBuilder: FormBuilder,
    private serviceSession: SessionsService,
    private sanitizer: DomSanitizer,
    private router: Router,
  ) {
  }

  get f() {
    return this.addForm.controls;
  }

  ngOnInit() {
    this.getAllSession();
    this.getAllCars();
    this.loadAllUsers();
    this.addForm = this.formBuilder.group({
      client: ['', Validators.required],
      car: ['', Validators.required],
      reservationDate: ['', Validators.required],
    });
  }

  getAllSession(): void {
    this.serviceSession.getMonitorSession().subscribe(
      (data: any []) => this.sessions = data
        .filter(c => c.state !== 'FINISHED'),
      err => console.log(err),
    );
  }

  openLg(content) {
    this.modalService.open(content, {size: 'lg'});
  }


  getAllCars(): void {
    this.carService.getAllCars().subscribe(data => {
      this.cars = data;
      this.cars = this.cars.filter(item => item.state === 'Active'); // todo

    });
  }

  onSubmit(reservationDate, user, car) {
    const session = new SessionModel;
    session.reservationDate = this.addForm.value.reservationDate;
    session.clientId = this.users[user];
    console.log('client index' + user);
    session.car = this.cars[car];
    console.log('car index' + car);
    const token = localStorage.getItem('token');
    const payload = jwt_decode(token);
    session.monitorId = payload._id;
    this.serviceSession.addSessionmonitoradmin(session).subscribe(() => {
      this.getAllSession();
    });
  }

  private loadAllUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.users = users;
    });
  }

  getHistoryPDF() {
    this.moniteursService.downloadHistoryPDF().subscribe((data: Blob) => {
      this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        window.URL.createObjectURL(new Blob([data], {type: 'application/pdf'})
        ));
      console.log(this.fileUrl);
    }, err => console.log('download failed!!'));
  }
}
