import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from '../SharedService';
import { UsersData } from '../users-data';
import { Router } from '@angular/router';
import { RegistrationComponent } from '../registration/registration.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private sharedService: SharedService,public matdialog: MatDialog,private _router: Router
  ) {}

  informationError: string = 'Войдите в систему, пожалуйста)';
  user = new UsersData();
  users: UsersData[] = [];

  ngOnInit(): void {
    this.user.login="";
    this.user.password="";
  }

  Loginnn(userLogin: string, userPassword: string) {
    this.users = JSON.parse(localStorage.getItem('users') || '[]');
    console.log(this.users.find(({ login }) => login === userLogin));
    if (this.users.find(({ login }) => login === userLogin)) {
      if (this.users.find(({ password }) => password === userPassword)) {
        this._router.navigate(['/account']);
        this.sharedService.session(userLogin);
        this.matdialog.closeAll();
         

      }
    }

    if ((userPassword == '' && userLogin == '') ||  (userPassword != '' && userLogin != '')) {
      this.informationError = 'Некорректный Password и Login';
    }
    if (userLogin == '' && userPassword != '') {
      this.informationError = 'Некорректный Login';
    }
    if (userPassword == '' && userLogin != '') {
      this.informationError = 'Некорректный Password';
    }
  }
  Registration() {
    this.matdialog.closeAll();
    this.matdialog.open(RegistrationComponent);//   this._router.navigate(['/registration']);

  }
}
