import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserProfileResolverService implements Resolve<any> {
  constructor(private _user: UserService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._user.getUserDetail(localStorage.getItem('username')).pipe(
      catchError((error) => {
        return of('No data');
      })
    );
  }
}
