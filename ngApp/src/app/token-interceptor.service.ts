import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private injector: Injector,
    private _snackBar: MatSnackBar,
  ) { }
  snackBarMessage = '';

  intercept(req, next) {

    this.snackBarMessage = 'Intercept';

    console.log("intercept")

    this._snackBar.open(this.snackBarMessage, null, {
      duration: 1 * 1000,
    });


    let authService = this.injector.get(AuthService);

    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getToken()}`
      }
    });

    return next.handle(tokenizedReq);

  }
}
