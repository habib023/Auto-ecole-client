import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ClientService} from '../../service/client.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Client} from '../../model/client.model';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'passive-client-update',
  templateUrl: './passive-client-update.component.html',
  styleUrls: ['./passive-client-update.component.scss']
})
export class PassiveClientUpdateComponent implements OnInit {

  client: Client;
  editForm: FormGroup;
  submitted = false;
  clientId;



  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private clientService: ClientService,
    private activeRoute: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.activeRoute.params.subscribe((data) => {
      if (!data) {
        console.log('Something wrong!');
        this.router.navigate(['']);
        return;
      }
       this.clientId = data['id'];
    });
    if (!this.clientId) {
      alert('Something wrong!');
      this.router.navigate(['']);
      return;
    }

    this.editForm = this.formBuilder.group({
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
      agency: jwt_decode(localStorage.getItem('token')).agency,
    });
    console.log('getting client info with this id:', this.clientId);
    this.clientService.getclientById(this.clientId).subscribe((data) => {
      this.client = data;
      this.editForm.patchValue(data); // Don't use editForm.setValue() as it will throw console error
    }, (err => console.log(err.message)));




  }

  get f() { return this.editForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.editForm.valid) {
      this.clientService.updateclientparAdmin(this.editForm.value,)
      .subscribe( data => {
        console.log('the result of the put request to car contoller is : ', data);
        this.router.navigate(['admin/passive-client']);
      });
    }
  }

}
