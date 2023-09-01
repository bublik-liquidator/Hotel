import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharedServiceUsers } from '../SharedServiceUsers';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsersData } from '../users-data';
import { EditManagerComponent } from '../edit-manager/edit-manager.component';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  user = new UsersData();
  newuser = new UsersData();
  users: UsersData[] = [];
  isEdit: boolean = false;

  person: { id: string; age?: number };
  constructor(private matdialog: MatDialog, private sharedService: SharedServiceUsers, private http: HttpClient, private router: Router) {
  }

  isResultLoaded = false;
  StudentArray: string[] = [];

  ngOnInit(): void {
    this.GetUser();
  }

  GetUser() {
    const subscription = this.sharedService.getAll().subscribe((data: any) => {
      this.users = data;
      subscription.unsubscribe();
    });
  }



  AddButtonUser() {
    this.isEdit = !this.isEdit;
  }
  EditUser(user: UsersData) {
    this.matdialog.open(EditManagerComponent);
    this.sharedService.inituser(user);
  }
  AddUser() {
    this.sharedService.create(this.user).pipe(
      switchMap(() => this.sharedService.getAll())
    ).subscribe((data: any) => {
      this.users = data;
    });
  }

  deleteUser(id: bigint) {
    this.sharedService.delete(id).pipe(
      switchMap(() => this.sharedService.getAll())
    ).subscribe((data: any) => {
      this.users = data;
    });
  }


}

