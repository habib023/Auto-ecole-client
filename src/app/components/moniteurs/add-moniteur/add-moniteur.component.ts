import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MoniteursService} from '../../../service/moniteur.service';
import {Router} from '@angular/router';
import * as _ from 'lodash';
import {MoniteurModel} from '../../../model/moniteur.model';

@Component({
  selector: 'app-add-moniteur',
  templateUrl: './add-moniteur.component.html',
  styleUrls: ['./add-moniteur.component.scss']
})
export class AddMoniteurComponent implements OnInit {
  @Input() monitor: MoniteurModel | any;

  constructor(private formBuilder: FormBuilder, private router: Router, private moniteursService: MoniteursService ) { }

  certificationTag: any = ['Pizza', 'Pasta', 'Parmesan'];

  addForm: FormGroup;
  submitted = false;
  certification: any[] = [];
  drivingLicence: any[] = [];

  // get the form short name to access the form fields
  get f() {
    return this.addForm;
  }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      birthday: ['', Validators.required],
      cin: ['', Validators.required],
      cinDate: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      postalCode: ['', Validators.required],
      drivingLicenceType: ['', Validators.required],
      drivingLicenceNum: ['', Validators.required],
      drivingLicenceDate: ['', Validators.required],
      certificationType: ['', Validators.required],
      certificationDate: ['', Validators.required],
      certificationNum: ['', Validators.required],
    });

    if (this.monitor !== undefined) {
      this.monitor.birthday = new Date(this.monitor.birthday).toISOString().substring(0, 10);
      this.monitor.cinDate = new Date(this.monitor.cinDate).toISOString().substring(0, 10);
      this.addForm.patchValue(this.monitor);
      this.drivingLicence = this.monitor.drivingLicence;
      this.certification = this.monitor.certification;
    }
    console.log('This is me:', this.monitor);
  }

  submitCertif() {
    this.certification.push({
      certificationType: this.addForm.value.certificationType,
      certificationDate: this.addForm.value.certificationDate,
      certificationNum: this.addForm.value.certificationNum,
    });
    this.addForm.get('certificationDate').clearValidators();
    this.addForm.get('certificationNum').clearValidators();
  }

  submitLicence() {
    this.drivingLicence.push({
      drivingLicenceType: this.addForm.value.drivingLicenceType,
      drivingLicenceDate: this.addForm.value.drivingLicenceDate,
      drivingLicenceNum: this.addForm.value.drivingLicenceNum,
    });
    this.addForm.get('drivingLicenceDate').clearValidators();
    this.addForm.get('drivingLicenceNum').clearValidators();
  }

  onSubmit() {
    this.submitted = true;
    if (this.addForm.valid) {
      this.addForm.value.certification = this.certification;
      this.addForm.value.drivingLicence = this.drivingLicence;
      const client = _.omit(this.addForm.value, 'drivingLicenceType', 'drivingLicenceNum', 'drivingLicenceDate');
      this.moniteursService.addMoniteur(client)
        .subscribe(async (data) => {
          console.log(data);
          await this.router.navigate(['/admin/moniteurs']);
        }, (err) => console.log(err));
    }
  }


  deleteDrivingLicence(license) {
    this.drivingLicence = this.drivingLicence.filter(c => c !== license);
  }

  deleteCertif(certif) {
    this.certification = this.certification.filter(c => c !== certif);

  }
}
