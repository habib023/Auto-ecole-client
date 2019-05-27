import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AbsenceModel} from '../../model/absence.model';
import * as jwt_decode from 'jwt-decode';


import {AbsencesService} from '../../service/absence.service';

import {AuthenticationService} from '../../service/authentication.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'absence-monitor',
  templateUrl: './absence-monitor.component.html',
  styleUrls: ['./absence-monitor.component.scss']
})
export class AbsenceMonitorComponent implements OnInit {

  absence: AbsenceModel[];
  currentUser: string;
  agency: string;
  addForm: FormGroup;
  submitted = false;

  constructor(
    private modalService: NgbModal,
    private authen: AuthenticationService,
    private serviceAbsence: AbsencesService,
    private router: Router,
    private formBuilder: FormBuilder) {
    const token = localStorage.getItem('token');
    const payload = jwt_decode(token);
    this.currentUser = payload._id;
    this.agency = payload.agency;
  }


  get f() {
    return this.addForm.controls;
  }

  ngOnInit() {
    this.getAllAbsence();
    this.addForm = this.formBuilder.group({
      endDate: ['', Validators.required],
      debDate: ['', Validators.required],
      raison: ['', Validators.required],
      monitorId: this.currentUser,
    });
  }

  getAllAbsence(): void {
    this.serviceAbsence.getAllAbsence().subscribe(data => {
      this.absence = data.filter(c => (new Date(c.endDate)).getTime() > Date.now());
      this.absence = this.absence.filter(item => item.monitor._id === this.currentUser); // todo    });

    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.addForm.valid) {
      this.serviceAbsence.addAbsence(this.addForm.value)
        .subscribe((data: AbsenceModel) => {
          console.log(data);
          this.absence.push(data);
          // this.router.navigate(['home-client']);
        }, (error) => {
          console.log(error);
        });
    }
  }

  openLg(content) {
    this.modalService.open(content, {size: 'lg'});
  }


  deleteAbsence(absence: AbsenceModel) {
    if (confirm('Are you sure to delete this record ?') === true) {
      this.serviceAbsence.cancelabsence(absence._id).subscribe((data) => {
        console.log(data);
        this.getAllAbsence();
      });
    }
  }


}
