import { Roles } from './../roles';
import { appConstant } from './../../app.constant';
import { AuthenticateService } from './../authenticate.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forbiddenName } from '../AuthCustomValidator.directive';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  roles = Roles;
  constructor(private _fb: FormBuilder, private _auth: AuthenticateService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.registerForm = this._fb.group({
      name: ['', [Validators.required, forbiddenName(/bob/i)]],
      email: [
        '',
        [Validators.required, Validators.pattern(appConstant.emailPattern)],
      ],
      password: ['', [Validators.required]],
      role: ['', Validators.required],
    });
  }

  registerUser() {
    this._auth
      .register(this.registerForm.getRawValue())
      .subscribe((response) => {
        console.log(response);
      });
  }

  get name() {
    return this.registerForm.get('name');
  }
}
