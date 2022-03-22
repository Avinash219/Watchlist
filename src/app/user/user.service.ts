import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}

  getUserDetail(username) {
    return this._http.get(`http://localhost:3000/api/profile/user/${username}`);
  }

  updateUserDetail(formData) {
    return this._http.post(
      `http://localhost:3000/api/profile/user/update`,
      formData
    );
  }
}
