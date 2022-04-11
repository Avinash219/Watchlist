import { ActivatedRoute } from '@angular/router';
import { AuthenticateService } from './../authenticate/authenticate.service';
import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [Validators.required]);
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
        email: this.emailFormControl.value,
        password: this.passwordFormControl.value,
      };
      this._auth.resetPassword(obj).subscribe((response) => {
        console.log(response);
      });
    } else {
      this._auth
        .generatePasswordLink(this.emailFormControl.value)
        .subscribe((response) => {
          console.log(response);
        });
    }
  }

  resetPassword() {
    let obj = {
      email: this.emailFormControl.value,
      token: this.token,
      password: this.passwordFormControl.value,
    };
    this._auth.resetPassword(obj).subscribe((response) => {
      console.log(response);
    });
  }
}
