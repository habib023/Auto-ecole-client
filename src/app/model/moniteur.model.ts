import {Agence} from './agence.model';


class Certification {

  certificationType: string;
  certificationDate: Date;
  certificationNum: string;
}



export class MoniteurModel {
    _id: string;
  name: string;
  username: string;
  surname: string;
  password: string;
  address: string;
  phone: string;
  postalCode: string;
    agency: Agence;
  email: string;
  state: string;
  birthday: Date;
  cin: string;
  cinDate: Date;
  drivingLicenceType: string;
  drivingLicenceNum: string;
  drivingLicenceDate: Date;
  certification: Certification[];
  newPassword: string;
  oldPassword: string;

}


