import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ClientService} from '../../service/client.service';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'rest-password',
  templateUrl: './rest-password.component.html',
  styleUrls: ['./rest-password.component.scss']
})
export class RestPasswordComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  token: string;

  constructor(private client: ClientService,
              private formBuilder: FormBuilder,
              private activeRouter: ActivatedRoute,
  ) {
  }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.activeRouter.params.subscribe((data) => {
      console.log(data);

      this.token = data['token'];
    });


    this.loginForm = this.formBuilder.group({
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.client.resetpassword(this.token, this.f.password.value)
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



