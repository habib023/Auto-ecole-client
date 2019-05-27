import {Component, OnInit} from '@angular/core';
import {Socket} from 'ngx-socket-io';

@Component({
  selector: 'client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.scss']
})
export class ClientLayoutComponent implements OnInit {

  constructor(private socket: Socket) {
  }

  ngOnInit() {
  }
}
