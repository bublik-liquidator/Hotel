import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SharedServiceUsers } from '../SharedServiceUsers';
import { UsersData } from '../users-data';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  constructor(private http: HttpClient, private sharedService: SharedServiceUsers) { }

  user = new UsersData(); // оригинальная пользователь
  users: UsersData[] = [];
  editedUser = new UsersData(); // это редактируем

  isEdit: boolean = false;

  ngOnInit() {
    this.getInfo()
  }
  getInfo() {
    this.user.id = JSON.parse(localStorage.getItem('activleUser') || '[]').id;
      this.sharedService.getById(this.user.id).subscribe((data: UsersData) => {
        this.user = data;
      });
  
  }
  EditButtonInfo() {
    this.isEdit = !this.isEdit;
  }

  Save() {
    this.users = this.users.filter((obj) => this.user.login != this.user.login);
    this.sharedService.save(this.user);
    this.isEdit = !this.isEdit;
    return true;

  }

}
