import {Component, OnInit, ViewChild} from '@angular/core';
import {ClientService} from '../../../service/client.service';
import {Client} from '../../../model/client.model';
import {AuthenticationService} from '../../../service/authentication.service';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';
import * as jwt_decode from 'jwt-decode';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {SessionsService} from '../../../service/session.service';
import {SessionModel} from '../../../model/session.model';
import {MatTable} from '@angular/material';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


export class ClientProfileComponent implements OnInit {

  @ViewChild(MatTable) table: MatTable<PeriodicElement>;

  dataSource: PeriodicElement[] = [];
  columnsToDisplay = ['date', 'monitor', 'car'];

  editForm: FormGroup;
  editFormprofile: FormGroup;

  fileToUpload: File = null;
  form = new FormGroup({
    sampleFile: new FormControl('')
  });
  id: string;
  currentUser: Client;
  submitted = false;
  formupdate = false;
  addForm: FormGroup;
  fileUrl: any;
  payload;

  constructor(private userService: ClientService,
              private modalService: NgbModal,
              private authen: AuthenticationService,
              private router: Router,
              private formBuilder: FormBuilder,
              private http: HttpClient,
              private sanitizer: DomSanitizer,
              private sessionsService: SessionsService
  ) {
    const token = localStorage.getItem('token');
    this.payload = jwt_decode(token);
  }

  get f() {
    return this.editForm.controls;
  }

  get p() {
    return this.editFormprofile.controls;
  }

  ngOnInit() {

    this.userService.getById(this.payload._id).subscribe((data) => {
      this.currentUser = data;
      this.id = this.payload._id;

      this.sessionsService.getCurrentUserSession().subscribe((response: SessionModel[]) => {
        (response.filter(item => item.state !== 'REQUESTED'))
          .sort((a, b) => {
            if (a.reservationDate > b.reservationDate) {
              return 1;
            }
            if (a.reservationDate < b.reservationDate) {
              return -1;
            }
            if (a.reservationDate === b.reservationDate) {
              return 0;
            }
          })
          .slice(5).forEach(
          (c) => {
            this.dataSource.push({
              date: new DatePipe('en-US').transform(c.reservationDate, 'EEEE dd MMMM yyyy   HH:MM'),
              monitor: c.monitor.name + ' ' + c.monitor.surname,
              car: c.car.mark + ' ' + c.car.model,
            });
          });
        this.table.renderRows();
        console.log(this.dataSource);
      });
    });

    this.editForm = this.formBuilder.group({
      _id: [],
      newPassword: ['', Validators.required],
      oldPassword: ['', Validators.required],
    });

    this.editFormprofile = this.formBuilder.group({
      _id: [],
      username: ['', Validators.required],
      cin: ['', Validators.required],
      cinDate: ['', Validators.required],
      phone: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      postalCode: ['', Validators.required],
      drivingLicenceType: [''],
      drivingLicenceNum: [''],
      agency: this.payload._id,
    });
  }

  handleFileInput(files: any) {
    this.fileToUpload = files.item(0);
  }

  uploadFileToActivity() {
    const endpoint = 'http://localhost:3000/upload/cin';
    const formData: FormData = new FormData();
    console.log('we are ready o upload file!', this.fileToUpload.name);
    formData.append('sampleFile', this.fileToUpload, this.fileToUpload.name);
    return this.http.post(endpoint, formData, {responseType: 'blob'}).subscribe(
      (data) => console.log('Ok'),
      (err) => console.log('No ok!!'),
    );
  }


  uploadFile2ToActivity() {
    const endpoint = 'http://localhost:3000/upload/license';
    const formData: FormData = new FormData();
    console.log('we are ready o upload file!', this.fileToUpload.name);
    formData.append('sampleFile', this.fileToUpload, this.fileToUpload.name);
    return this.http.post(endpoint, formData, {responseType: 'blob'}).subscribe(
      (data) => console.log('Ok'),
      (err) => console.log('No ok!!'),
    );
  }

  onSubmit() {
    this.submitted = true;

    if (this.editForm.valid) {
      this.userService.passwordupdate(this.editForm.value)
        .subscribe(data => {
          console.log(data);
        });
    }
  }

  openLg(content) {
    this.userService.getById(this.payload._id).subscribe((data) => {
      this.currentUser = data;
      this.editFormprofile.patchValue(data);
      this.id = this.payload._id;
    });
    this.modalService.open(content, {size: 'lg'});
  }

  modifprofile() {
    this.formupdate = true;
    if (this.editFormprofile.valid) {
      this.currentUser = this.editFormprofile.value;
      this.userService.update(this.editFormprofile.value)
        .subscribe(data => {
          console.log(data);
        });
    }
  }

  private llogout() {
    this.authen.logout();
    this.router.navigate(['/Login']);
  }

  getTimetablePDF() {
    this.userService.downloadTimeTablePDF().subscribe((data: Blob) => {
      this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        window.URL.createObjectURL(new Blob([data], {type: 'application/pdf'})
        ));
      console.log(this.fileUrl);
    }, err => console.log('download failed!!'));
  }
}


export interface PeriodicElement {
  date: string;
  monitor: string;
  car: string;
}
