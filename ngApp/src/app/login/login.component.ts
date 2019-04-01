import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {};
  snackBarDurationInSeconds = 1;
  snackBarMessage = '';

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _snackBar: MatSnackBar,

  ) { }

  ngOnInit() {
  }


  loginUser() {
    this._auth.loginUser(this.loginUserData)
      .subscribe(
        res => {
          console.log("Login res:", res);

          this._auth.setToken(res.token);
          this.snackBarMessage = res.message;

          this._snackBar.open(this.snackBarMessage, null, {
            duration: this.snackBarDurationInSeconds * 1000,
          });
          this._router.navigate(['/']);
        },

        err => {

          this.snackBarMessage = err.error.message;

          this._snackBar.open(this.snackBarMessage, null, {
            duration: this.snackBarDurationInSeconds * 1000,
          });


          console.log(err)
        }


      )
  }



}
