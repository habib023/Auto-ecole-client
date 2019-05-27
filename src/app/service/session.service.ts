import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SessionModel} from '../model/session.model';

@Injectable()
export class SessionsService {

  constructor(private http: HttpClient) { }

  baseurl = 'http://localhost:3000/';
  selectedSession: SessionModel ;

  getAllSession() {
    return this.http.get<SessionModel[]>(this.baseurl + 'session');
  }

  getClientSession() {
    return this.http.get<SessionModel[]>
      (this.baseurl + 'session/client');
  }
  getMonitorSession() {
    return this.http.get<SessionModel[]>
      (this.baseurl + 'session/monitor');
  }
  getCurrentUserSession() {
    return this.http.get<SessionModel[]>
      (this.baseurl + 'session/client');
  }

  getSessionById(id: string) {
    return this.http.get<SessionModel>
      (this.baseurl + 'session' + '/' + id);
  }

  addSession(session: SessionModel) {
    console.log(session);
    return this.http.post(this.baseurl + 'session/reserve', {
      reservationDate: session.reservationDate,
      clientId: session.clientId,
    });
  }


  addSessionmonitoradmin(session: SessionModel) {
    console.log(session);
    return this.http.post(this.baseurl + 'session/reserve', {
      reservationDate: session.reservationDate,
      clientId: session.clientId._id,
      carId: session.car._id,
      monitorId: session.monitorId,
    });
  }


  deleteSession(_id: string) {
    return this.http.delete(this.baseurl + 'session/reject' + '/' + _id);
  }

  cancelSession(_id: string) {
    return this.http.patch(this.baseurl + 'session/cancel/' + _id, {});
  }


  updateSession(session: SessionModel) {
    const data = {
      reservationDate: session.reservationDate,
      carId: session.car._id,
      monitorId: session.monitorId,
    };
    return this.http.patch(this.baseurl + 'session/update/' + session._id, data);
  }

  approveSession(session: SessionModel) {
    return this.http.patch(this.baseurl + 'session/approve/' + session._id, {
      carId: session.car._id,
      monitorId: session.moniteur._id
    });
  }
}
