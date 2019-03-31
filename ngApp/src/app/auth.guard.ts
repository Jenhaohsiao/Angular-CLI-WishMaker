import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _snackBar: MatSnackBar,

  ) { }

  canActivate(): boolean {
    if (this._authService.isAuthenticated()) {
      return true
    } else {
      this._snackBar.open("Please Login first", null, {
        duration: 1 * 1000,
      });
      this._router.navigate(['/login']);
      return false
    }

  }

}
