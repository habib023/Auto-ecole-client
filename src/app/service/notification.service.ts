import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import * as jwt_decode from 'jwt-decode';
import {NotificationsService} from 'angular2-notifications';
import {Notif} from '../model/notif.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  types = ['alert', 'error', 'info', 'warn', 'success'];
  animationTypes = ['fromRight', 'fromLeft', 'scale', 'rotate'];
  notifConfig: any = {
    timeOut: 5000,
    pauseOnHover: true,
    clickToClose: true,
  };

  constructor(private socket: Socket,
              private _notifications: NotificationsService) {
  }

  setListener() {
    console.log('Set Listener');

    this.socket.on('ping', (data: any) => {
        if (data) {
          console.log('ping-client:', data);
          const type: any = this.types[2];
          this.notifConfig.icons = this.animationTypes[0];
          this._notifications.create(
            'connected to notif channel',
            data.greeting,
            type,
            this.notifConfig
          );
        }
      }
    );

    this.socket.on('news', (data: Notif) => {
      console.log('news-client:', data);
      const type: any = this.types[4];
      this.notifConfig.icons = this.animationTypes[0];
      this._notifications.create(data.action, data.subject, type, this.notifConfig);
    });

    this.socket.on('disconnect', function () {
      console.log('disconnected from server');
    });

  }

  connect() {

    const token = localStorage.getItem('token');
    const payload = jwt_decode(token);
    // first emit
    this.socket.emit('save-user', {
      _id: payload._id,
      role: payload.role,
      agency: payload.agency,
    });
    // emit on every reconnect
    this.socket.on('connection', () => {
      console.log('connected to server');
      this.socket.emit('save-user', {
        _id: payload._id,
        role: payload.role,
        agency: payload.agency,
      });
    });

  }
}
