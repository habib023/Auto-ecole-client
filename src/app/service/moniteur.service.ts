import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MoniteurModel} from '../model/moniteur.model';

@Injectable({
  providedIn: 'root'
})
export class MoniteursService {

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:no-inferrable-types
  baseurl: string = 'http://localhost:3000/';
  selectedMoniteur: MoniteurModel ;

  getAllMoniteurs() {
    return this.http.get<MoniteurModel[]>(this.baseurl + 'monitor');
  }

  getMoniteurById(id: string) {
    return this.http.get<MoniteurModel>(this.baseurl + 'monitor');
  }

  getMoniteurByIdAdmin(id: string) {
    return this.http.get<MoniteurModel>(this.baseurl + 'monitor/' + id);
  }

  addMoniteur(moniteur: MoniteurModel) {
    console.log(moniteur);

    return this.http.post(this.baseurl + 'monitor',
    {
      name: moniteur.name,
      surname: moniteur.surname,
      birthday: moniteur.birthday,
      cin: moniteur.cin,
      cinDate: moniteur.cinDate,
      address: moniteur.address,
      phone: moniteur.phone,
      postalCode: moniteur.postalCode,
      drivingLicenceType: moniteur.drivingLicenceType,
      drivingLicenceNum: moniteur.drivingLicenceNum,
      drivingLicenceDate: moniteur.drivingLicenceDate,
      certification: moniteur.certification,
    });
  }

  deleteMoniteur(id: string) {
    return this.http.delete(this.baseurl + 'monitor' + '/' + id);
  }


  updateMoniteur(moniteur: MoniteurModel) {
    console.log(moniteur);
    return this.http.put(this.baseurl + 'Monitor',
      {
        name: moniteur.name,
        username: moniteur.username,
        cin: moniteur.cin,
        phone: moniteur.phone,
        surname: moniteur.surname,
        address: moniteur.address,
        postalCode: moniteur.postalCode,
        drivingLicenceType: moniteur.drivingLicenceType,
      }
    );
  }

  updateMoniteurAdmin(moniteur: MoniteurModel) {
    return this.http.put(this.baseurl + 'Monitor' + '/' + moniteur._id,
      {
        name: moniteur.name,
        surname: moniteur.surname,
        birthday: moniteur.birthday,
        cin: moniteur.cin,
        cinDate: moniteur.cinDate,
        address: moniteur.address,
        phone: moniteur.phone,
        postalCode: moniteur.postalCode,
        drivingLicenceType: moniteur.drivingLicenceType,
        drivingLicenceNum: moniteur.drivingLicenceNum,
        drivingLicenceDate: moniteur.drivingLicenceDate,
      }
    );
  }

  passwordupdate(moniteur: MoniteurModel) {
    return this.http.patch(this.baseurl + 'Monitor/password', {
      newPassword: moniteur.newPassword,
      oldPassword: moniteur.oldPassword,
    });
  }

  downloadHistoryPDF() {
    return this.http.get(this.baseurl + 'history/monitor', {responseType: 'blob'});
  }
}
