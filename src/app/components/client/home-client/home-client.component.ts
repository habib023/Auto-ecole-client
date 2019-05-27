import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Client} from '../../../model/client.model';
import {SessionModel} from '../../../model/session.model';
import {ClientService} from '../../../service/client.service';
import {SessionsService} from '../../../service/session.service';
import {AuthenticationService} from '../../../service/authentication.service';
import * as jwt_decode from 'jwt-decode';


@Component({templateUrl: 'home-client.component.html',
styleUrls: ['./home-client.component.css']
})
export class HomeClientComponent implements OnInit {

    bool = false;
    session: SessionModel[];
    users: Client[] = [];
    currentUser: string;
    agency: string;
    addForm: FormGroup;
    submitted = false;

    constructor(private userService: ClientService,
     private authen: AuthenticationService,
                private serviceSession: SessionsService,
                private router: Router,
                private formBuilder: FormBuilder, ) {
      const token = localStorage.getItem('token');
      const payload = jwt_decode(token);
      this.currentUser = payload._id;
      this.agency = payload.agency;
    }

    ngOnInit() {
        // this.loadAllUsers();
        // TODO: place this is admin component
        this.getAllSession();
    }

    getAllSession(): void {
        this.serviceSession.getCurrentUserSession().subscribe(data => {
          this.session = data;
          this.session = this.session.filter(item => item.state === 'REQUESTED');
        });
      }

      addSession(): void {
        // this.router.navigate(['AddSessionComponent']);
        this.bool = true;
        this.addForm = this.formBuilder.group({
         // heure: ['', Validators.required],
         reservationDate: ['', Validators.required],
        });
      }

      onSubmit() {
        this.submitted = true;
        if (this.addForm.valid) {
          this.serviceSession.addSession(this.addForm.value)
          .subscribe( (data: any) => {
            console.log(data);
            this.session.push(data);
            this.bool = false;
            // this.router.navigate(['home-client']);
          }, (error) => {
              console.log(error);
          });
        }
      }

  deleteSession(session: SessionModel) {
        if (confirm('Are you sure to delete this session ?') === true) {
          this.serviceSession.deleteSession(session._id).subscribe((data) => {
          console.log(data);
          this.getAllSession();
          // M.toast({ html: 'Deleted successfully', classes: 'rounded' });

        });
      }
      }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }
    private llogout() {
this.authen.logout();
this.router.navigate(['/Login']);
    }
      // get the form short name to access the form fields
    get f() { return this.addForm.controls; }


}
