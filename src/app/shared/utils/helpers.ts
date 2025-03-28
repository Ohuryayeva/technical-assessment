import {HttpErrorResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';

export const handleError =
  (err: HttpErrorResponse, snackBar: MatSnackBar) => {
    const error = err.error.message || err.message || 'An error has occurred.';
    snackBar.open(error, 'Error', {
      duration: 3000
    });
  }
