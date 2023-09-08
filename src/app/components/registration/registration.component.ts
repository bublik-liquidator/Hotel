import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { UsersData } from '../users-data';
import { SharedServiceUsers } from '../SharedServiceUsers';

@Component( {
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: [ './registration.component.css' ]
} )
export class RegistrationComponent implements OnInit {
  informationError: string = 'Register, please)';
  user = new UsersData();
  users: UsersData[] = [];

  constructor( private sharedService: SharedServiceUsers, public matdialog: MatDialog ) { }

  ngOnInit(): void {
    this.GetUsers()
    this.user.login = "";
    this.user.password = "";
    //this.user.rol="";
  }

  GetUsers() {
    this.sharedService.getAll().subscribe( ( data: any ) => {
      this.users = data;
    } );
  }

  Cancel() {
    this.matdialog.closeAll();
    this.matdialog.open( LoginComponent );

  }
  Registration( userLogin: string, userPassword: string ) {
    if ( userLogin != "" && userPassword != "" ) {
      this.GetUsers()
      if ( this.users.find( ( { login } ) => login === userLogin ) ) {
        if ( this.users.find( ( { password } ) => password === userPassword ) ) {
          this.informationError = "You have already registered in the system";
        }
      }
      else {
        this.user.login = userLogin;
        this.user.password = userPassword;
        //!!this.user.rol=userRol;

        this.sharedService.create( this.user );

        //localStorage.setItem('users', JSON.stringify(this.users));
        this.matdialog.closeAll();
        this.matdialog.open( LoginComponent );
      }
    } else {
      this.informationError = "You have entered an incorrect username and password";
    }
  }
}
