import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CarModel} from '../model/car.model';
import {map} from 'rxjs/operators';
import {DisplayNotificationService} from './display-notification.service';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient,
              private _notifications: DisplayNotificationService) {
  }

  // tslint:disable-next-line:no-inferrable-types
  baseurl: string = 'http://localhost:3000/';
  selectedCar: CarModel ;

  getAllCars() {
    return this.http.get<CarModel[]>(this.baseurl + 'car');
  }

  getCarById(id: string) {
    return this.http.get<CarModel>(this.baseurl + 'car' + '/' + id);
  }

  addCar(car: CarModel) {
    return this.http.post(this.baseurl + 'car', {
       num: car.num,
       model: car.model,
       mark: car.mark,
      serialNum: car.serialNum,
      dateFirstRegistration: car.dateFirstRegistration,
      exploitationCartDate: car.exploitationCartDate,
      exploitationCartNum: car.exploitationCartNum,
    }).pipe(map(() =>
      this._notifications.pushNotif('Opération Réussite',
        'Le voiture a été ajouter avec succéss',
        4,
        0
      )));
  }

  deleteCar(id: string) {
    return this.http.delete(this.baseurl + 'car' + '/' + id).pipe(map(() =>
      this._notifications.pushNotif('Opération Réussite',
        'Le voiture a été supprimer avec succéss',
        4,
        0
      )));
  }


  updateCar(car: CarModel, id: String) {
    console.log(' carService: updateCar(' + id + ')');
    return this.http.put(this.baseurl + 'car' + '/' + id, {
            num: car.num,
            model: car.model,
            mark: car.mark,
      serialNum: car.serialNum,
      dateFirstRegistration: car.dateFirstRegistration,
      exploitationCartDate: car.exploitationCartDate,
      exploitationCartNum: car.exploitationCartNum,
    }).pipe(map(() =>
      this._notifications.pushNotif('Opération Réussite',
        'Le voiture a été modifier avec succéss',
        4,
        0
      )));
    ;
  }
}
