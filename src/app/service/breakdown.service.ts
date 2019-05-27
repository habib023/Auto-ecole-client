import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {breakdownModel} from '../model/breakdown.model';

@Injectable()
export class BreakdownService {

  baseurl = 'http://localhost:3000/';
  breakdownModel: breakdownModel;

  constructor(private http: HttpClient) {
  }

  getAllbreakdow() {
    return this.http.get<breakdownModel[]>(this.baseurl + 'breakdown');
  }


  getbreakdowById(id: string) {
    return this.http.get<breakdownModel>(this.baseurl + 'breakdown' + '/' + id);
  }

  addbreakdow(breakdown: breakdownModel) {
    console.log(breakdown);
    return this.http.post(this.baseurl + 'breakdown/announced', {

      carId: breakdown.carId,
      raisonbreakdown: breakdown.raisonbreakdown,
      monitorId: breakdown.monitorId,
    });
  }

  cancelbreakdow(_id: string) {
    return this.http.delete(this.baseurl + 'breakdown/' + _id, {});
  }

  iscriticalbreakdow(_id: string) {
    return this.http.patch(this.baseurl + 'breakdown/iscritical/' + _id, {});
  }

  fixedbreakdow(_id: string) {
    return this.http.patch(this.baseurl + 'breakdown/fixed/' + _id, {});
  }
}
