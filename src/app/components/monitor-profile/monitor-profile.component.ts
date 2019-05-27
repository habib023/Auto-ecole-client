import {Component, OnInit} from '@angular/core';
import {MoniteursService} from '../../service/moniteur.service';
import {AuthenticationService} from '../../service/authentication.service';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient} from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'monitor-profile',
  templateUrl: './monitor-profile.component.html',
  styleUrls: ['./monitor-profile.component.scss']
})
export class MonitorProfileComponent implements OnInit {
  editForm: FormGroup;
  editFormprofile: FormGroup;

  id: string;
  currentUser: any;
  submitted = false;
  formupdate = false;
  addForm: FormGroup;
  payload;
  fileUrl: any;

  fileToUpload: File = null;
  form = new FormGroup({
    sampleFile: new FormControl('')
  });

  constructor(
    private userService: MoniteursService,
    private modalService: NgbModal,
    private authen: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
  ) {
  }

  get f() {
    return this.editForm.controls;
  }

  get p() {
    return this.editFormprofile.controls;
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    this.payload = jwt_decode(token);
    this.userService.getMoniteurByIdAdmin(this.payload._id).subscribe((data) => {
      this.currentUser = data;
      this.id = data._id;
      console.log('current user:', this.currentUser);
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
      phone: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      address: ['', Validators.required],
      postalCode: ['', Validators.required],
      drivingLicenceType: [''],
      agency: this.payload.agency,
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
      (err) => console.log(err),
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
    this.userService.getMoniteurByIdAdmin(this.payload._id).subscribe((data) => {
      this.currentUser = data;
      this.editFormprofile.patchValue(data);
      this.id = (localStorage.getItem('id'));
    });
    this.modalService.open(content, {size: 'lg'});
  }

  modifprofile() {
    this.formupdate = true;
    if (this.editFormprofile.valid) {

      this.currentUser = this.editFormprofile.value;
      this.userService.updateMoniteur(this.editFormprofile.value)
        .subscribe(data => {
          console.log(data);
        });
    }
  }


}
