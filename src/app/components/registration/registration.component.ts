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
    this.user.username= "admin";
    this.user.photo= "";
    this.user.birthday= "";
    this.user.phonenomber= "123-123-4565";
    this.user.email= "admin@test.com";
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

  Registration( user:UsersData ) {
    if (!user.login) {
      this.informationError='Please enter a login.';
      return;
    }
    if (!this.validateEmail(user.email)) {
      this.informationError='Please enter a valid email.';
      return;
    }
    if (!this.validatePhoneNumber(user.phonenomber)) {
      this.informationError='Please enter a valid phone number';
      return;
    }
    if (!this.validateName(user.username)) {
      this.informationError='Please enter a valid name.';
      return;
    }

    this.sharedService.create( user ).subscribe(
      response => {
        // console.log(response);
        this.matdialog.closeAll();
        this.matdialog.open( LoginComponent );
      },
      error => {
        console.error(error);
        this.informationError = error.error.error; 
      }
    );
    }
  validateEmail(email: string) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validatePhoneNumber(phoneNumber: string) {
    var re = /^\d{3}-\d{3}-\d{4}$/;
    return re.test(String(phoneNumber));
}

  validateName(name: string) {
    var re = /^[a-zA-Z ]{2,30}$/;
    return re.test(String(name));
  }
}
