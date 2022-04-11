import { UserRoutingConstant } from './user-route.constant';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}

  getUserDetail(username) {
    return this._http.get(`${UserRoutingConstant.GET_USER_INFO}${username}`);
  }

  updateUserDetail(formData) {
    return this._http.post(`${UserRoutingConstant.UPDATE_USER_INFO}`, formData);
  }
}
