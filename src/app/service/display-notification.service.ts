import {Injectable} from '@angular/core';
import {NotificationsService, NotificationType} from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class DisplayNotificationService {

  types = ['alert', 'error', 'info', 'warn', 'success'];
  animationTypes = ['fromRight', 'fromLeft', 'scale', 'rotate'];
  notifConfig: any = {
    timeOut: 5000,
    pauseOnHover: true,
    clickToClose: true,
  };

  constructor(private _notifications: NotificationsService) {
  }

  pushNotif(title: string, message: String, type: any, icon: number) {
    console.log('displayNotifService');
    this.notifConfig.icons = this.animationTypes[icon];
    this._notifications.create(
      title,
      message,
      (<NotificationType>this.types[type]),
      this.notifConfig
    );
  }
}
