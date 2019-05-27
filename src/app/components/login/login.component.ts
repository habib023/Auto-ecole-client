import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../service/authentication.service';
import {AlertService} from '../../service/alert.service';
import * as jwt_decode from 'jwt-decode';
import {Socket} from 'ngx-socket-io';
import {NotificationService} from '../../service/notification.service';

@Component({templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss'],

})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private alertService: AlertService,
      private socket: Socket,
      private notifService: NotificationService) {
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .subscribe(
              () => {
                // connect to notification socket
                this.notifService.connect();
                  const token = localStorage.getItem('token');
                  const payload = jwt_decode(token);
                  const role = payload.role;

                if (role.toLowerCase() === 'client') {
                  this.router.navigate(['client/home-client']);
                }
                if (role.toLowerCase() === 'monitor') {
                  this.router.navigate(['monitor/home-monitor']);
                }
                if (role.toLowerCase() === 'admin') {
                    this.router.navigate(['admin/dashboard']);
                    }
                },
              (error: { message: string }) => {
                console.log('error message:', error.message);
                this.loading = false;
                });
    }
}
