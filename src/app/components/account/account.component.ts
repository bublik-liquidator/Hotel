import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserInfo } from '../userInfo';
import { SharedServiceUsers } from '../SharedServiceUsers';
import { UsersData } from '../users-data';

import { User } from '../user/user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  constructor(private http: HttpClient, private sharedService: SharedServiceUsers) { }

  // user: User;
  // session: string;
  // test:string;
  // Activleuser = new UserInfo(); 
  user = new UsersData(); // оригинальная пользователь
  users: UsersData[] = [];
  editedUser = new UsersData(); // это редактируем
  
  isEdit: boolean = false;

  ngOnInit() {
 
    this.user = this.sharedService.getuser();
    this.users = JSON.parse(localStorage.getItem('users') || '[]');
   
  

  }
  EditButtonInfo() {
    this.isEdit = !this.isEdit;
  }

  Save(){
   // localStorage.setItem('0', JSON.stringify(this.Activleuser)); 
 
   this.users = this.users.filter((obj) => this.user.login != this.user.login);
   localStorage.setItem('users', JSON.stringify(this.users));    
   this.users.push(this.user);
   localStorage.setItem('users', JSON.stringify(this.users));
  //this.users = this.sharedService.getAll();
   //this.sharedService.save();
   
    return true;

   }
 

}
