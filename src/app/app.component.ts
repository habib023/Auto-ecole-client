import {Component} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {NotificationService} from './service/notification.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private socket: Socket, private notifService: NotificationService) {
    this.socket.connect();
    notifService.setListener();
    if (localStorage.getItem('token')) {
      notifService.connect();
    }
  }
}
