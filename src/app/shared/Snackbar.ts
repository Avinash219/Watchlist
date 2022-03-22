import { MatSnackBar } from '@angular/material/snack-bar';

export class Snackbar {
  snackBar: MatSnackBar;

  constructor(snackBar) {
    this.snackBar = snackBar;
  }

  successToast() {
    this.snackBar.open('User updated successfully', '', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 5 * 1000,
    });
  }

  errorToast(error) {
    this.snackBar.open(
      error.message ? error.message.toString() : error['error']['error'],
      '',
      {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration: 5 * 1000,
      }
    );
  }
}
