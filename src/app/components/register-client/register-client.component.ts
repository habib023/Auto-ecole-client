import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

import {ClientService} from '../../service/client.service';

import {AlertService} from '../../service/alert.service';
import {ActivatedRoute, Router} from '@angular/router';

import * as _ from 'lodash';

@Component({
  templateUrl: 'register-client.component.html',
  styleUrls: ['./register-client.component.scss'],
})

export class RegisterClientComponent implements OnInit {
  registrationForm: FormGroup;
    loading = false;
    submitted = false;
  agenceId: string;
  drivingLicense: [{
    drivingLicenceType: string,
    drivingLicenceNum: string,
    drivingLicenceDate: Date,
  }] | any[] = [];

  doYouHaveADrivingLicense = false;
  dLNumInvalid = false;
  dLTypeInvalid = false;
  dLDateInvalid = false;

    constructor(
      private activeRoute: ActivatedRoute,
      private formBuilder: FormBuilder,
      private router: Router,
      private clientService: ClientService,
      private alertService: AlertService) {
    }

  get f() {
    return this.registrationForm;
  }

  get dL() {
    return this.registrationForm.get('drivingLicense') as FormGroup;
  }

    ngOnInit() {
      this.activeRoute.params.subscribe(async (data) => {
        if (!data['id']) {
          console.log('Something wrong!');
          await this.router.navigate(['/login']);
          return;
        }
        this.agenceId = data['id'];
      });

      this.registrationForm = this.formBuilder.group({
        username: ['', [Validators.required, Validators.minLength(4)]],
        cin: ['', [Validators.required, Validators.pattern('[0-9]{8}')]],
        cinDate: ['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern('[0-9]{8}')]],
        name: ['', [Validators.required, Validators.minLength(4)]],
        birthday: ['', Validators.required],
        surname: ['', [Validators.required, Validators.minLength(4)]],
        address: ['', [Validators.required, Validators.minLength(5)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        postalCode: ['', [Validators.required, Validators.pattern('[0-9]{4}')]],
        drivingLicense: this.formBuilder.group({
          drivingLicenceType: [''],
          drivingLicenceNum: ['', [Validators.pattern('[0-9]{8}')]],
          drivingLicenceDate: [''],
        })
        });
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
      if (this.registrationForm.invalid ||
        (this.drivingLicense.length === 0 && this.doYouHaveADrivingLicense)) {
            return;
        }

        this.loading = true;
      console.log(this.registrationForm.value);
      this.registrationForm.value.drivingLicence = this.drivingLicense;
      this.registrationForm.value.agency = this.agenceId;
      const client = _.omit(this.registrationForm.value, 'drivingLicense');
      console.log(client);
      this.clientService.register(client)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });

    }

  addDrivingLicense() {
    if (this.doYouHaveADrivingLicense && this.dL.valid &&
      this.dL.value.drivingLicenceType && this.dL.value.drivingLicenceNum
      && this.dL.value.drivingLicenceDate) {
      this.drivingLicense.push({
        drivingLicenceType: this.dL.value.drivingLicenceType,
        drivingLicenceDate: this.dL.value.drivingLicenceDate,
        drivingLicenceNum: this.dL.value.drivingLicenceNum,
      });
      this.dL.reset();
    } else {
      if (!this.dL.value.drivingLicenceNum) {
        this.dLNumInvalid = true;
      }
      if (!this.dL.value.drivingLicenceType) {
        this.dLTypeInvalid = true;
      }
      if (!this.dL.value.drivingLicenceDate) {
        this.dLDateInvalid = true;
      }
    }
  }

  showSection() {
    this.doYouHaveADrivingLicense = true;
  }

  hideSection() {
    this.doYouHaveADrivingLicense = false;
  }
}
