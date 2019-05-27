import {Component, OnInit} from '@angular/core';
import {Client} from '../../model/client.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ClientService} from '../../service/client.service';
import {Router} from '@angular/router';
import {AlertService} from '../../service/alert.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Agence} from '../../model/agence.model';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'passive-client',
  templateUrl: './passive-client.component.html',
  styleUrls: ['./passive-client.component.scss']
})
export class PassiveClientComponent implements OnInit {

  searchText;

  closeResult: string;
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  currentAgenc = Agence;
  clients: Client[] = [];
  client: Client;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private router: Router,
    private clientService: ClientService,
    private alertService: AlertService) {
  }

// convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      cin: ['', Validators.required],
      birthday: ['', Validators.required],
      cinDate: ['', Validators.required],
      phone: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      postalCode: ['', Validators.required],
      drivingLicenceType: [''],
      drivingLicenceNum: [''],
      agency: jwt_decode(localStorage.getItem('token')).agency,
    });
    this.loadAllUsers();
  }

  openLg(content) {
    this.modalService.open(content, {size: 'lg'});
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    console.log(this.registerForm.value);
    this.clientService.registerclientpassiv(this.registerForm.value)
      .subscribe(
        (data) => {
          this.alertService.success('Registration successful', true);
          this.loadAllUsers();
        },
        (error) => {
          this.alertService.error(error);
          this.loading = false;
          console.log('er' + error);
        });

  }

  deleteclient(client: Client) {
    console.log(client);
    if (confirm('Are you sure to delete this record ?') === true) {
      this.clientService.suspended(client._id).subscribe((data) => {
        console.log(client);
        this.loadAllUsers();
      });
    }
  }

  private loadAllUsers() {
    this.clientService.getAll().subscribe(clients => {
      this.clients = clients;
    });
  }


  updateClient(client: Client) {
    console.log('updating client with id:', client._id);
    this.router.navigate(['admin/update-passive-client', client._id]);
  }


}
