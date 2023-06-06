import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharedServiceUsers } from '../SharedServiceUsers';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsersData } from '../users-data';
import { EditManagerComponent } from '../edit-manager/edit-manager.component';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
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
    this.sharedService.getAll().subscribe((data: any) => {
      this.users = data;
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
    this.sharedService.create(this.user);
    this.GetUser();
  }

  deleteUser(id: bigint) {
    this.sharedService.delete(id);
    this.ngOnInit();
    this.GetUser();
  }


}

