import { MatSnackBar } from '@angular/material/snack-bar';
import { Snackbar } from './../../shared/Snackbar';
import { DialogService } from './../dialog.service';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  ActivatedRoute,
  ParamMap,
  Router,
  CanDeactivate,
} from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent extends Snackbar implements OnInit {
  profileInfo: FormGroup;
  longText: string = 'Text';
  imageInfo;
  reader = new FileReader();
  constructor(
    private _userService: UserService,
    private _fb: FormBuilder,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _activatedRoute: ActivatedRoute,
    private _dialogService: DialogService
  ) {
    super(_snackBar);
  }

  ngOnInit(): void {
    this.initForm();
    this._activatedRoute.data.subscribe((response) => {
      console.log(response);
      this.profileInfo.patchValue(response['userDetail']['user']);
      console.log(this.profileInfo.get('imageDetails').value);
      this.imageInfo = this.profileInfo.get('imageDetails').value;
    });
  }

  initForm() {
    this.profileInfo = this._fb.group({
      name: [''],
      email: [{ value: '', disabled: true }],
      username: [{ value: '', disabled: true }],
      imageDetails: [''],
      about: [''],
    });
  }

  csvInputChange(event) {
    event.stopPropagation();
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.profileInfo.get('imageDetails').setValue(file);
      this.reader.readAsDataURL(file);
      this.reader.onload = () => {
        this.imageInfo = this.reader.result;
      };
    }
  }

  updateProfile() {
    const formData = new FormData();
    formData.append('name', this.profileInfo.get('name').value);
    formData.append('email', this.profileInfo.get('email').value);
    formData.append('username', this.profileInfo.get('username').value);
    formData.append('imageDetails', this.profileInfo.get('imageDetails').value);
    formData.append('about', this.profileInfo.get('about').value);
    this._userService.updateUserDetail(formData).subscribe((response) => {
      if (response && response['user']) {
        this._router.navigate([response['user']['profile']]);
        this.successToast();
      }
    });
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.profileInfo.dirty) {
      return this._dialogService.confirm(
        'Are you sure you want to move away from the Page?'
      );
    }
  }
}
