import { Injectable } from '@angular/core';
import { UsersData } from './users-data';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Injectable()
export class SharedServiceShowInfo {
  user = new UsersData();
  users: UsersData[] = [];
  ChekButton: string;
  editeduser = new UsersData();
  dialogRef: MatDialogRef<any>
  info: string;
  constructor(private http: HttpClient, private router: Router) {
  }

  initErrorInformation(info: string) {
    this.info = info;
  }
  gerErrorInformation() {
    return this.info
  }
}
