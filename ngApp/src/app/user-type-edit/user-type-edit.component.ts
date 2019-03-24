import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-type-edit',
  templateUrl: './user-type-edit.component.html',
  styleUrls: ['./user-type-edit.component.css']
})
export class UserTypeEditComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private _router: Router,
  ) { }

  ngOnInit() {
  }

  save() {
    console.log("usertypeedit save")
  }

  back() {
    console.log("usertypeedit save")
    this._router.navigate(['/usertypelist']);
  }

}
