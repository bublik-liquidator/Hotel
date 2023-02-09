import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserInfo } from '../userInfo';
import { SharedService } from '../SharedService';
import { User } from '../user/user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  constructor(private http: HttpClient, private sharedService: SharedService) { }

  user: User;
  session: string;
  test:string;
  Activleuser = new UserInfo(); 

  isEdit: boolean = false;

  ngOnInit() {
    this.Activleuser.name="kekk";
    this.Activleuser.birthday="10.11.23";
    this.Activleuser.email="asdkdd@mail.ru";
    this.Activleuser.many="500$";
    this.Activleuser.phoneNomber="+3745156656";
    this.Activleuser.photo="/path pohot";
    this.session = JSON.parse(localStorage.getItem('session') || '[]');
    //this.Activleuser = JSON.parse(localStorage.getItem('Activleuser') || '[]');
  

  }
  EditButtonInfo() {
    this.isEdit = !this.isEdit;
  }


 

}
