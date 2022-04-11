import { AuthenticateService } from './../authenticate/authenticate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-user-confirm',
  templateUrl: './user-confirm.component.html',
  styleUrls: ['./user-confirm.component.scss'],
})
export class UserConfirmComponent implements OnInit {
  confirmationCode: string;
  constructor(
    private _route: ActivatedRoute,
    private _auth: AuthenticateService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe((code) => {
      this.confirmationCode = code.code;
    });
  }

  verifyAccount() {
    this._auth.verifyAccount(this.confirmationCode).subscribe((response) => {
      if (response['user']) {
        this._auth.username = response['user']['username'];
        if (response['user']['role'] === 'ADMIN') {
          this._router.navigate(['admin']);
        } else {
          this._router.navigate(['user', response['user']['username']]);
        }
        let decodedInfo: string = jwt_decode(response['token']);
        localStorage.setItem('token', response['token']);
        this._auth.setLoggedInUser(decodedInfo);
        this._auth.loggedIn = true;
        this._auth.userInfo = decodedInfo;
        localStorage.setItem('userInfo', decodedInfo);
        localStorage.setItem('username', response['user']['username']);
      }
    });
  }
}
