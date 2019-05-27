import {Client} from './client.model';
import {CarModel} from './car.model';
import {MoniteurModel} from './moniteur.model';
import {Agence} from './agence.model';


export class SessionModel {
    _id: string;
  reservationDate: Date;
  clientId: Client;
    car: CarModel ;
    moniteur: MoniteurModel;
    agency: Agence;
  state: string;
  monitorId: string;
  monitor: any;
}
