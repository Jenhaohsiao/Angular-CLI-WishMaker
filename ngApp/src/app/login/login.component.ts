import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {};
  snackBarDurationInSeconds = 1;
  snackBarMessage = 'ABC';

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private snackBar: MatSnackBar,

  ) { }

  ngOnInit() {
  }

  loginUser() {
    this._auth.loginUser(this.loginUserData)
      .subscribe(
        res => {
          console.log("Login res:", res);
          localStorage.setItem('token', res.token)
          this._router.navigate(['/']);
        },
        // err => {
        //   console.log(err.error.message)
        //   this.snackBarMessage = err.error.message;
        // }

        err => {

          this.snackBarMessage = err.error.message;

          this.snackBar.open(this.snackBarMessage, null, {
            duration: this.snackBarDurationInSeconds * 1000,
          });


          console.log(err)
        }


      )
  }



}
