import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

import {AuthenticationService} from '../service/authentication.service';
import {DisplayNotificationService} from '../service/display-notification.service';


const errorMessage = [
  {key: 'num', message: '"Matricule" doit être un numéro de matricule tunisienne valide'},
  {key: 'exploitationCartNum', message: '"numéro du carte d\'exploitation" doit étre composer de 5 numéro'},
  {key: 'serialNum', message: '"numéro de sachet" doit étre composer 17 caractères'},
  {key: 'mark', message: '"marque" doit étre composer au moins de 2 caractères'},
  {key: 'name', message: '"nom"  doit étre composer au moins de 4 caractères'},
  {key: 'surname', message: '"Prénom"  doit étre composer au moins de 4 caractères'},
  {key: 'cin', message: '"CIN"  doit étre un numéro du CIN valide'},
  {key: 'phone', message: '"Tel"  doit étre un numéro du téléphone valide'},
  {key: 'address', message: '"Address"  doit étre composer au moins de 5 caractères'},
  {key: 'postalCode', message: '"Code Postal"  doit étre composer au moins de 4 numéro'},
  {key: 'drivingLicenceType', message: '"Type de permis de conduite"  doit étre composer au moins de 1 caractères'},
  {key: 'drivingLicenceNum', message: '"Numéro de permis de conduite"  doit étre composer au moins de 8 numéro'},
  {key: 'drivingLicence', message: '"List de permis de conduite"  est invalid'},
  {key: 'certificationNum', message: '"Numéro de certification de conduite"  doit étre composer au moins de 5 numéro'},
  {key: 'certificationType', message: '"Type de certification de conduite"  doit étre composer au moins de 1 caractères'},
  {key: 'certification', message: '"certification de conduite"  est obligatoire'},
];

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {


  constructor(private authenticationService: AuthenticationService,
              private displayNotif: DisplayNotificationService) {
  }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(
        retry(1),
        catchError(err => {
          let type = 3;
          let title = 'Unexpected Error';
          let msg = 'Le serveur est inaccessible';
          switch (err.status) {
            case 401: {
              // auto logout if 401 response returned from api
              this.authenticationService.logout();
              location.reload(true);
              break;
            }
            case 400: {
              // display BadRequest error message
              type = 3;
              title = 'information incorrect';
              let key = err.error.message.match(/^".*"/g).toString();
              console.log(err.error.message);
              key = key.replace(/"/g, '');
              console.log(key);
              const error = errorMessage.find(c => c.key === key);
              msg = (error) ? error.message : 'unhandled error';
              // error = err.error.message;
              break;
            }
          }
          this.displayNotif.pushNotif(title, msg, type, 0);
          return throwError(msg);
        }));
    }
}

/*
.pipe(
  retry(1),
  map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
          // this.errorDialogService.openDialog(event);
      }
      return event;
  }),
  catchError((error: HttpErrorResponse) => {
      let errorMessage;
      if (error.error instanceof HttpErrorResponse) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
      } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}`;
      }
      const type: any = this.types[1];
      this.notifConfig.icons = this.animationTypes[0];
      this.DisplayNotif.create(
        'information incorrect',
        errorMessage,
        type,
        this.notifConfig
      );
      return throwError(errorMessage);
  })
);*/
