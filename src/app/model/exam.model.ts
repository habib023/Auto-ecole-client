import {Agence} from './agence.model';
import {Client} from './client.model';
import {CarModel} from './car.model';
import {MoniteurModel} from './moniteur.model';


export class ExamModel {

  _id: String;
  numexam: String;
  moniteur: MoniteurModel;
  client: Client;
  car: CarModel;
  state: String;
  examDate: Date;
  examinateur: String;
  agency: Agence;

}
