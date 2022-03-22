import { AuthenticateConstant } from './authenticate-constant';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  username: string = null;
  userInfo = null;
  loggedInUser$ = new BehaviorSubject(null);
  loggedIn: boolean = false;
  constructor(private _http: HttpClient) {}

  login(body) {
    return this._http.post(AuthenticateConstant.LOGIN, body);
  }

  register(body) {
    return this._http.post(AuthenticateConstant.REGISTER, body);
  }

  validateToken(body) {
    return this._http.post(AuthenticateConstant.VERIFY_TOKEN, { token: body });
  }
  setLoggedInUser(userInfo) {
    this.loggedInUser$.next(userInfo);
  }

  getLoggedInUser() {
    return this.loggedInUser$.asObservable();
  }

  verifyAccount(code) {
    return this._http.get(`${AuthenticateConstant.VERIFY_ACCOUNT}/${code}`);
  }

  generatePasswordLink(email) {
    return this._http.post(AuthenticateConstant.GENERATE_PASSWORD_LINK, {
      email: email,
    });
  }

  resetPassword(obj) {
    return this._http.post(AuthenticateConstant.RESET_PASSWORD, obj);
  }
}
