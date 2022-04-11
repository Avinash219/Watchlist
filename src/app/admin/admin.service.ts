import { AdminRouteConstant } from './admin-route.constant';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private _http: HttpClient, private domSanitizer: DomSanitizer) {}

  getAllRefData() {
    return this._http.get(`${AdminRouteConstant.GET_ALL_REF_DATA}`);
  }

  addRefData(body) {
    return this._http.post(`${AdminRouteConstant.ADD_REF_DATA}`, body);
  }

  addRefDataValue(refDataType, body) {
    return this._http.put(
      `${AdminRouteConstant.ADD_REF_DATA_VALUE}/${refDataType}`,
      body
    );
  }
}
