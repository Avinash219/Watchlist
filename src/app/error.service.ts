import { MatSnackBar } from '@angular/material/snack-bar';
import { Snackbar } from './shared/Snackbar';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ErrorService extends Snackbar implements ErrorHandler {
  constructor(private injector: Injector, private _matSnackBar: MatSnackBar) {
    super(_matSnackBar);
  }

  handleError(error: any): void {
    const router = this.injector.get(Router);
    if (Error instanceof HttpErrorResponse) {
      console.log(error.status);
    } else {
      this.errorToast(error);
    }
  }
}
