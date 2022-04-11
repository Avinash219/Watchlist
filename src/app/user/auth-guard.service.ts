import { AuthenticateService } from './../authenticate/authenticate.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private _router: Router, private _auth: AuthenticateService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this._auth.loggedIn) {
      this._router.navigate(['']);
      return false;
    }
    return true;
  }
}
