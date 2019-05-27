import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import * as jwt_decode from 'jwt-decode';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {

         return this.http.post(`${environment.apiUrl}/login`, { username: username, password: password }, {responseType: 'text'} )
            .pipe(map((token) => {
                // login successful if there's a jwt token in the response
                console.log('token: ' + token) ;
              if (token !== undefined) {
                    try {
                      const decToken = jwt_decode(token);
                      console.log('validate', token);
                      localStorage.setItem('token', token);
                      localStorage.setItem('username', decToken.username);

                    } catch (Error) {
                        console.log('errorr') ;
                    }
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                }
            }));
    }

    logout() {
      localStorage.clear();
    }
}

