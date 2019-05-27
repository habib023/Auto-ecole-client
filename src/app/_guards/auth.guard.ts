import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import * as jwt_decode from 'jwt-decode';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }


    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const token = localStorage.getItem('token');
        const payload = jwt_decode(token);
        const currentUser = payload.role;

       if (currentUser === next.data.role) {
      return true;
    }




        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login']);
        return false;
    }
}
