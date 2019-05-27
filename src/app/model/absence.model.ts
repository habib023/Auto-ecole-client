import {Agence} from './agence.model';
import {MoniteurModel} from './moniteur.model';


export class AbsenceModel {
  _id: string;
  endDate: Date;
  debDate: Date;
  raison: String;

  monitorId: String;
  monitor: MoniteurModel;

  agency: Agence;


}
