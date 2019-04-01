import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "http://localhost:3000/api/user/register"
  private _loginUrl = "http://localhost:3000/api/authorize/login"

  constructor(
    private http: HttpClient,
    private _router: Router,
    private _snackBar: MatSnackBar,

  ) { }

  registerUser(user): Observable<any> {
    return this.http.post<any>(this._registerUrl, user)
  }

  loginUser(user): Observable<any> {

    return this.http.post<any>(this._loginUrl, user)
  }

  isAuthenticated() {
    return !!localStorage.getItem('token') //"!!" just return "true or false"
  }


  getLeftTime() {

    const _token = localStorage.getItem('token')
    if (_token) {
      const _decodedToken = this.parseJwt(_token);
      const _expTime = _decodedToken.exp * 1000;
      const _timeGap: number = (_expTime - (new Date().getTime())) / 1000;

      console.log((new Date().getTime()), " - ");
      console.log(_expTime);
      console.log("timeGap:", _timeGap);
      console.log("=======================");

      return _timeGap
    } else {
      return;
    }

  }

  isExpired() {
    const _timeGap = this.getLeftTime()
    var _isExpired = false;

    if ((_timeGap <= 0) || (_timeGap == undefined)) {
      _isExpired = true;
      // this.logoutUser();
    } else {
      _isExpired = false;
    }
    console.log("isExpired:", _isExpired);
    return _isExpired
  }

  logoutUser() {
    console.log("logoutUser");
    localStorage.clear();
    this._router.navigate(['/events'])

  }

  getToken() {
    return localStorage.getItem('token');
  }

  setToken(_token) {
    var tokenDecode = this.parseJwt(_token);
    var expireTime = tokenDecode.exp;
    var timeStamp = Math.floor(Date.now() / 1000);
    var timeLeft = expireTime - timeStamp;

    localStorage.setItem('token', _token);
    localStorage.setItem('token-decode', JSON.stringify(tokenDecode));

    console.log("Token:", tokenDecode);
  }


  parseJwt(token) {

    try {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      var base64atob = JSON.parse(atob(base64));

      return base64atob

    } catch (err) {
      console.log("parseJwt err:", err)

    }

  }

}
