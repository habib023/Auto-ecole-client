import {Agence} from './agence.model';
import {CarModel} from './car.model';
import {MoniteurModel} from './moniteur.model';


// tslint:disable-next-line: class-name
export class breakdownModel {
  _id: string;
  monitorId: String;
  carId: String;
  car: CarModel;
  raisonbreakdown: String;
  iscritical: Boolean;
  state: String;
  agency: Agence;
  monitor: MoniteurModel;


}
