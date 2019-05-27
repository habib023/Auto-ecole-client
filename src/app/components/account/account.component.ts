import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {

  message = 5;
  x;

  constructor(private router: Router,) {
  }

  ngOnInit() {

    this.x = setInterval(() => {
      this.message--;
      if (this.message === 0) {
        this.router.navigate(['./login']);
      }
    }, 1000);

  }

  ngOnDestroy() {
    clearInterval(this.x);

  }

}


