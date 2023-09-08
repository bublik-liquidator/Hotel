import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharedServiceUsers } from '../SharedServiceUsers';
import { UsersData } from '../users-data';
@Component({
  selector: 'app-edit-manager',
  templateUrl: './edit-manager.component.html',
  styleUrls: ['./edit-manager.component.css']
})
export class EditManagerComponent implements OnInit {
  user = new UsersData(); // оригинальная юзер
  edituser = new UsersData(); // это редактируем
  users: UsersData[] = [];
  isEdit: boolean = false;

  constructor(private sharedService: SharedServiceUsers, public matdialog:MatDialog) {}

  ngOnInit(): void {
    this.user = this.sharedService.getuser();
    UsersData.copyFieldsValuesTo(this.user, this.edituser);
  }
  

  savehotelsToStorage() {
    if(this.edituser.username==null||this.edituser.login ==null){
      alert("Некоректный ввод данны");
      return 0;
     } 
     else{
   // console.log(this.edituser instanceof UsersData);
    UsersData.copyFieldsValuesTo(this.edituser, this.user);
    this.sharedService.inituser(this.edituser);
   
    this.sharedService.save(this.user).subscribe( data => console.log( data ) );;
    this.matdialog.closeAll();
    return true;
    }
  }
  Cancel() {    
    this.edituser.username = this.user.username;
    this.edituser.login = this.user.login;
    this.edituser.photo  = this.user.photo ;
    this.matdialog.closeAll();
  }

}

