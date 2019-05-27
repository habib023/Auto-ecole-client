import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Agence} from '../model/agence.model';


@Injectable()
export class AgenceService {

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:no-inferrable-types
  baseurl: string = 'http://localhost:3000/';
  selectedAgence: Agence ;

  getAllAgence() {
    return this.http.get<Agence[]>(this.baseurl + 'agency');
  }

  getAgence(id: string) {
    return this.http.get<Agence>(this.baseurl + 'agency' + '/' + id);
  }

  addagence(agence: Agence) {

    return this.http.post(this.baseurl + 'agency', {
      title: agence.title,
      phone: agence.phone,
      email: agence.email,
      address: agence.address,
      postalCode:agence.postalCode,
      taxRegistrationNum: agence.taxRegistrationNum,
      taxRegistrationDate:agence.taxRegistrationDate,
      region: agence.region,
      cin: agence.cin,
      cinDate: agence.cinDate,



    });
  }



}
