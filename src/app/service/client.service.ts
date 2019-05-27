import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Client} from '../model/client.model';


@Injectable()
export class ClientService {


    files = [];
    file = null;

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Client[]>(`${environment.apiUrl}/client`);
    }

    getById(id: String) {
        console.log(`${environment.apiUrl}/client/` + id);
        return this.http.get<Client>(`${environment.apiUrl}/client`);
    }
    getclientById(id: String) {
      console.log(`${environment.apiUrl}/client/` + id);
      return this.http.get<Client>(`${environment.apiUrl}/client/` +id);
  }

    register(client: Client) {
        return this.http.post(`${environment.apiUrl}/client`, client);
    }

    registerclientpassiv(client: Client) {
      // @ts-ignore
      const requestBody: Client = {
        name: client.name,
        username: client.username,
        cin: client.cin,
        cinDate: client.cinDate,
        password: client.password,
        phone: client.phone,
        surname: client.surname,
        address: client.address,
        email: client.email,
        postalCode: client.postalCode,
        birthday:client.birthday,
        agency: client.agency
      };
      if (client.drivingLicenceType) {
        requestBody.drivingLicenceType = client.drivingLicenceType;
      }
      if (client.drivingLicenceNum) {
        requestBody.drivingLicenceNum = client.drivingLicenceNum;
      }
      return this.http.post(`${environment.apiUrl}/client`, requestBody);
    }


    updateAdmin(client: Client) {
        return this.http.put(`${environment.apiUrl}/client/` + client._id, client);
    }


    update(client: Client) {
        return this.http.put(`${environment.apiUrl}/client`,
          {
              name: client.name,
              username: client.username,
              cin: client.cin,
              cinDate: client.cinDate,
              phone: client.phone,
              surname: client.surname,
              address: client.address,
              email: client.email,
              postalCode: client.postalCode,
              drivingLicenceType: client.drivingLicenceType,
              drivingLicenceNum: client.drivingLicenceNum,
              birthday:client.birthday,
              agency: client.agency
          });
    }

    updateclientparAdmin(client: Client) {
      console.log(client._id)
      return this.http.put(`${environment.apiUrl}/client/`+ client._id ,
        {
            name: client.name,
            username: client.username,
            cin: client.cin,
            cinDate: client.cinDate,
            phone: client.phone,
            surname: client.surname,
            address: client.address,
            email: client.email,
            postalCode: client.postalCode,
            drivingLicenceType: client.drivingLicenceType,
            drivingLicenceNum: client.drivingLicenceNum,
            birthday:client.birthday,
            agency: client.agency
        });
  }

    passwordupdate(client: Client) {
        return this.http.patch(`${environment.apiUrl}/client/password`, {
            newPassword: client.newPassword,
            oldPassword: client.oldPassword,
        });
    }
    

    Delate(id: String) {
        return this.http.delete(`${environment.apiUrl}/client` + '/' + id);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/client/` + id);
    }
    suspended(id: String) {
      console.log(id)
      return this.http.put(`${environment.apiUrl}/client/suspended/` + id, {});
      
  }

  downloadTimeTablePDF() {
    return this.http.get(`${environment.apiUrl}/timetable/client`, {responseType: 'blob'});
  }

  forgetpassword(email: string) {
    return this.http.post(`${environment.apiUrl}/client/password/reset`, {email: email}
    );
  }

  resetpassword(token: String, password: string) {
    return this.http.patch(`${environment.apiUrl}/client/password/reset/` + token, {
      password: password
    });
  }


  
  
}
