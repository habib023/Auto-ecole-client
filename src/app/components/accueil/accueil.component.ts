import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {AgenceService} from '../../service/agence.service';
import {Agence} from '../../model/agence.model';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  agences: Agence[];

  agence: Agence;

  constructor(private activeRoute: ActivatedRoute,
              private agenceService: AgenceService, private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit() {


    this.getAllAgence();
  }

getAllAgence(): void {
    this.agenceService.getAllAgence().subscribe(data => {
      this.agences = data;
      console.log(this.agences);
    });
  }
  getinto(agence: Agence) {
    this.router.navigate(['register-client', agence._id]);
  }

  login() {

    this.router.navigate(['login']);
  }


}
