import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ClientService} from '../../service/client.service';


@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;


  constructor(
    private formBuilder: FormBuilder,
    private client: ClientService,
  ) {
  }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({

      email: ['', Validators.required]
    });

  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.client.forgetpassword(this.f.email.value)
      .subscribe(
        (data) => {
          console.log(data);
        },


        (error) => {
          this.loading = false;
          console.log('err', error);
        });
  }

}
