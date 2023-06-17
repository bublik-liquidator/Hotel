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
  constructor(private sharedService: SharedServiceUsers,private router: Router, private header: HeaderComponent, public matdialog: MatDialog
  ) { }

  informationError: string = 'Войдите в систему, пожалуйста)';
  user = new UsersData();
  test:UsersData;
  users: UsersData[] = [new UsersData()];
  isEdit: boolean;
  initChekButton:true
 

  ngOnInit(): void {
    this.GetUsers();
    this.isEdit= JSON.parse(localStorage.getItem('Esidit') || '[]');    
  }

  GetUsers() {
    this.sharedService.getAll().subscribe((data: any) => {
      this.users = data;
      console.log(this.users)
    });
  }

  Loginnn(user: UsersData) {
    this.GetUsers()
    // if ( !this.users) {
    // this.user = this.users.find((u: { login: string; }) => u.login === user.login);
    // }
        this.sharedService.putTokenUser(this.user)       
        setTimeout(() => {
          this.header.checLogin();
        }, 1000); // Вызов метода через 2 секунды
        document.location.reload();
        this.matdialog.closeAll(); 

    if ((user.password == '' && user.login == '') || (user.password != '' && user.login != '')) {
      this.informationError = 'Некорректный Password и Login';
    }
    if (user.login == '' && user.password != '') {
      this.informationError = 'Некорректный Login';
    }
    if (user.password == '' && user.login != '') {
      this.informationError = 'Некорректный Password';
    }
  }
  Registration() {
    this.matdialog.closeAll();
    this.matdialog.open(RegistrationComponent);//   this._router.navigate(['/registration']);

  }
}
