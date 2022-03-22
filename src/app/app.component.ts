import { Router } from '@angular/router';
import { AuthenticateService } from './authenticate/authenticate.service';
import { Component, Sanitizer } from '@angular/core';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private _auth: AuthenticateService, private _router: Router) {}
  ngOnInit() {
    this.validateUser();
  }

  validateUser() {
    if (localStorage.getItem('token')) {
      let decodedInfo: string = jwt_decode(localStorage.getItem('token'));
      console.log(decodedInfo);
      this._auth.loggedIn = true;
      this._auth.userInfo = localStorage.getItem('token');
      this._router.navigate(['user', localStorage.getItem('username')]);
    } else {
      localStorage.removeItem('userInfo');
      this._auth.setLoggedInUser(null);
      this._auth.loggedIn = false;
      this._router.navigate(['']);
    }
  }

  verifyToken() {
    const currentTime = Math.round(new Date().getTime() / 1000);
    let decodedInfo: string = jwt_decode(localStorage.getItem('token'));
    console.log('Current Time', currentTime);
    console.log('Expires in', decodedInfo['exp']);
    if (decodedInfo['exp'] < currentTime) {
      return true;
    } else {
      return false;
    }
  }
}
