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

  parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    var base64atob = JSON.parse(atob(base64));

    return base64atob
  }

  loginUser() {
    this._auth.loginUser(this.loginUserData)
      .subscribe(
        res => {
          console.log("Login res:", res);
          localStorage.setItem('token', res.token)
          var expireTime = this.parseJwt(res.token);
          var timeStamp = Math.floor(Date.now() / 1000);
          var timeCheck = expireTime.exp - timeStamp

          console.log("timeCheck:", timeCheck)

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
