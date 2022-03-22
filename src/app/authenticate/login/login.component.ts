import { ResetPasswordComponent } from './../../reset-password/reset-password.component';
import { appConstant } from './../../app.constant';
import { Router } from '@angular/router';
import { AuthenticateService } from './../authenticate.service';
import { RegisterComponent } from './../register/register.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private _fb: FormBuilder,
    public dialog: MatDialog,
    private _auth: AuthenticateService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this._fb.group({
      email: [
        '',
        [Validators.required, Validators.pattern(appConstant.emailPattern)],
      ],
      password: ['', [Validators.required]],
    });
  }

  loginUser() {
    console.log('Submit fired');
    this._auth.login(this.loginForm.getRawValue()).subscribe((response) => {
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

  openDialog() {
    const dialogRef = this.dialog.open(RegisterComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  resetPassword() {
    const dialogRef = this.dialog.open(ResetPasswordComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
