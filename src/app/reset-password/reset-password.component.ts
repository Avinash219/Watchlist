import { ActivatedRoute } from '@angular/router';
import { AuthenticateService } from './../authenticate/authenticate.service';
import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  email: any;
  password: any;
  token: any;
  decodedToken: any;
  constructor(
    private _auth: AuthenticateService,
    private _router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._router.params.subscribe((value) => {
      this.token = value.token;
    });
  }

  generatePasswordLink() {
    if (this.token) {
      let obj = {
        email: this.email,
        password: this.password,
      };
      this._auth.resetPassword(obj).subscribe((response) => {
        console.log(response);
      });
    } else {
      this._auth.generatePasswordLink(this.email).subscribe((response) => {
        console.log(response);
      });
    }
  }

  resetPassword() {
    let obj = {
      email: this.email,
      token: this.token,
      password: this.password,
    };
    this._auth.resetPassword(obj).subscribe((response) => {
      console.log(response);
    });
  }
}
