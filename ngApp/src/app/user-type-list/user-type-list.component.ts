import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-type-list',
  templateUrl: './user-type-list.component.html',
  styleUrls: ['./user-type-list.component.css']
})
export class UserTypeListComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private _router: Router,
  ) { }


  ngOnInit() {
  }

  addNewType() {
    this._router.navigate(['/usertypeedit'])
  }

}
