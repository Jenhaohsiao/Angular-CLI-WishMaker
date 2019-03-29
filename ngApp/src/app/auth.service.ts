import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "http://localhost:3000/api/authorize/register"
  private _loginUrl = "http://localhost:3000/api/authorize/login"

  constructor(
    private http: HttpClient,
    private _router: Router,
    private _snackBar: MatSnackBar,

  ) { }

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user)
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user)
  }

  isAuthenticated() {
    return !!localStorage.getItem('token') //"!!" just return "true or false"
  }


  logoutUser() {
    localStorage.removeItem('token');
    this._router.navigate(['/events'])

  }


  getToken() {
    return localStorage.getItem('token');
  }


}
