import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbsenceModel} from '../model/absence.model';

@Injectable()
export class AbsencesService {

  baseurl = 'http://localhost:3000/';
  selectedabsence: AbsenceModel;

  constructor(private http: HttpClient) {
  }

  getAllAbsence() {
    return this.http.get<AbsenceModel[]>(this.baseurl + 'absence');
  }


  getAbsenceById(id: string) {
    return this.http.get<AbsenceModel>(this.baseurl + 'absence' + '/' + id);
  }

  addAbsence(absence: AbsenceModel) {
    console.log(absence);
    return this.http.post(this.baseurl + 'absence/reserve', {
      debDate: absence.debDate,
      endDate: absence.endDate,
      raison: absence.raison,
      monitorId: absence.monitorId,
    });
  }

  cancelabsence(_id: string) {
    return this.http.delete(this.baseurl + 'absence/' + _id, {});
  }
}
