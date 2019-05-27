import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SessionsService} from '../../../../service/session.service';
import {Router} from '@angular/router';
import * as jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-add-session.',
  templateUrl: './add-session.component.html',
  styleUrls: ['./add-session.component.css']
})
export class AddSessionComponent implements OnInit {
  currentUser: string;
  agency: string;

  constructor(private formBuilder: FormBuilder, private router: Router, private sessionsService: SessionsService ) {
    const token = localStorage.getItem('token');
    const payload = jwt_decode(token);
    this.currentUser = payload._id;
    this.agency = payload.role;
   }

  addForm: FormGroup;
  submitted = false;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      _id: [],
     reservationDate: ['', Validators.required],
     clientId: this.currentUser,
     agency: this.agency,
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.addForm.valid) {
      this.sessionsService.addSession(this.addForm.value)
      .subscribe( data => {
        console.log(data);
        this.router.navigate(['home-client']);
      });
    }
  }

  get f() { return this.addForm.controls; }

}
