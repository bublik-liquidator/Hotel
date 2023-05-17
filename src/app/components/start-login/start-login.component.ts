import { Component, OnInit } from '@angular/core';
import { RegistrationComponent } from '../registration/registration.component';
import { UsersData } from '../users-data';
import { SharedServiceUsers } from '../SharedServiceUsers';
import { HeaderComponent } from '../header/header.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-login',
  templateUrl: './start-login.component.html',
  styleUrls: ['./start-login.component.css']
})
export class StartLoginComponent implements OnInit {

  constructor(private sharedService: SharedServiceUsers, private header: HeaderComponent, public matdialog: MatDialog, private _router: Router
    ) { }
  
    informationError: string = 'Войдите в систему, пожалуйста)';
    user = new UsersData();
    users: UsersData[] = [];
    isEdit: boolean;
    ngOnInit(): void {
      // this.users = this.sharedService.getAll();
      this.user.login = "";
      this.user.password = "";
      this.GetUsers();
      this.isEdit= JSON.parse(localStorage.getItem('Esidit') || '[]');
    }
  
    GetUsers() {
      this.sharedService.getAll().subscribe((data: any) => {
        this.users = data;
      });
    }
  
    Loginnn(user: UsersData) {
      //this.log = this.users[0].login
      console.log(this.users.find(({ login }) => login == user.login));
      if (this.users.find(({ login }) => login === user.login)) {
        if (this.users.find(({ password }) => password === user.password)) {
          //this.sharedService.session(userLogin);       
          user = this.users.find(({ login }) => login === user.login)!;
          if(user.rol=="admin"){
            localStorage.setItem('isEditAdmin', JSON.stringify(true));
          }
          localStorage.setItem('Activleusers', JSON.stringify(user));      
  
          this.header.ChekButton();
          this.isEdit = !this.isEdit;
          localStorage.setItem('Esidit', JSON.stringify(this.isEdit));      
          this.sharedService.initUser(user);
          /////////////////////////localStorage.setItem('Activleusers', JSON.stringify(user));
  
          //////////////////////////////////////////this.sharedService.inituser(user);
          this.matdialog.closeAll();
          this._router.navigate(['/account']);
          
  
  
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
  


