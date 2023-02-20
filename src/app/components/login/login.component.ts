import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharedServiceUsers } from '../SharedServiceUsers';
import { UsersData } from '../users-data';
import { Router } from '@angular/router';
import { RegistrationComponent } from '../registration/registration.component';
import { HeaderComponent } from '../header/header.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private sharedService: SharedServiceUsers, private header: HeaderComponent, public matdialog: MatDialog, private _router: Router
  ) { }

  informationError: string = 'Войдите в систему, пожалуйста)';
  userr = new UsersData();
  users: UsersData[] = [];

  ngOnInit(): void {
    // this.users = this.sharedService.getAll();
    this.userr.login = "";
    this.userr.password = "";
    this.users = JSON.parse(localStorage.getItem('users') || '[]');
    //this.sharedService.initChekButton(this.isEdit);

  }

  Loginnn(user: UsersData) {

    //this.log = this.users[0].login
    console.log(this.users.find(({ login }) => login == user.login));
    if (this.users.find(({ login }) => login === user.login)) {
      if (this.users.find(({ password }) => password === user.password)) {
        //this.sharedService.session(userLogin);       
        user = this.users.find(({ login }) => login === user.login)!;

        // this.user1 = this.SharedServiceUser.getByName(userLogin);
        //this.sharedService.inituser(this.userse);



        this.header.ChekButton();
       
        //localStorage.setItem('activnast', JSON.stringify(this.user.login));

        this.sharedService.inituser(user);
        this.matdialog.closeAll();
        //this._router.navigate(['/account']);


      }
    }

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
