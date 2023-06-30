import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharedServiceUsers } from '../SharedServiceUsers';
import { UsersData } from '../users-data';
import { Router } from '@angular/router';
import { RegistrationComponent } from '../registration/registration.component';
import { HeaderComponent } from '../header/header.component';
import { AccountComponent } from '../account/account.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private sharedService: SharedServiceUsers, private router: Router, private header: HeaderComponent, public matdialog: MatDialog
  ) { }

  informationError: string = 'Войдите в систему, пожалуйста)';
  user = new UsersData();
  test: UsersData;
  users: UsersData[] = [new UsersData()];
  isEdit: boolean;
  initChekButton: true
  Data: string;


  ngOnInit(): void {
    this.GetUsers();
    this.isEdit = JSON.parse(localStorage.getItem('Esidit') || '[]');
  }

  GetUsers() {
    this.sharedService.getAll().subscribe((data: any) => {
      this.users = data;
    });
  }

  Loginnn(user: UsersData) {
    this.GetUsers()
    const dialogRef = this.sharedService.getdialogRef();
    this.sharedService.putTokenUser(this.user);
    this.sharedService.puttTokenUser(this.user).subscribe((data: Object) => {
      this.Data = JSON.stringify(data);
      if (this.Data == null) {
        this.informationError = 'Вы не зарегестирирвоаны';
      }
      if (this.Data != null) {
        if(user.login=="admin"){
          //localStorage.setItem('rol', JSON.stringify("admin"));
          dialogRef.close('admin');
        }
        else if(user.login=="manager"){
         // localStorage.setItem('rol', JSON.stringify("manager"));
          dialogRef.close('manager');
        }
        else if(user.login=="user"){
        //  dialogRef.close('user');
        dialogRef.close('user');

          localStorage.setItem('rol', JSON.stringify("user"));

        }
        
        this.router.navigate(['/account']);
      }

    },
      error => {
        if (error.status === 401) {
          this.informationError = 'Вы не подтверждены';
        } 
      });



  }

  Registration() {
    this.matdialog.closeAll();
    this.matdialog.open(RegistrationComponent);//   this._router.navigate(['/registration']);

  }
}
