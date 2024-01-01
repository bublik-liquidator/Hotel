import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharedServiceUsers } from '../SharedServiceUsers';
import { UsersData } from '../users-data';
import { Router } from '@angular/router';
import { RegistrationComponent } from '../registration/registration.component';
import { HeaderComponent } from '../header/header.component';
import jwt_decode from 'jwt-decode';

@Component( {
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ],
} )
export class LoginComponent implements OnInit {
  constructor( private sharedService: SharedServiceUsers, private router: Router, private header: HeaderComponent, public matdialog: MatDialog
  ) { }

  informationError: string = 'Sign in please)';
  user = new UsersData();
  test: UsersData;
  users: UsersData[] = [ new UsersData() ];
  Data: string;


  ngOnInit(): void {
    this.GetUsers();
    this.user.login = 'admin';
    this.user.password = 'admin';
  }

  GetUsers() {
    this.sharedService.getAll().subscribe( ( data: any ) => {
      this.users = data;
    } );
  }

  Loginnn( user: UsersData ) {
    this.GetUsers();
    const dialogRef = this.sharedService.getdialogRef();
    this.sharedService.puttTokenUser( this.user ).subscribe( ( data: any ) => {
      this.Data = JSON.stringify( data );
      localStorage.setItem( 'activleUser', ( this.Data ) );
      const token = data.token;

      try {
        const decodedToken = jwt_decode( token ) as { [ key: string ]: any };
        const role = decodedToken[ "role" ];

        if ( this.Data == null ) {
          this.informationError = 'You are not registered';
        }
        if ( this.Data != null ) {
          dialogRef.close( role );
          this.router.navigate( [ '/account' ] );
        }
      } catch ( err ) {
        console.log( err );
        this.informationError = "Invalid credentials";
      }
    },
      error => {
        console.log( error );
        this.informationError = "Invalid credentials";
      } );
  }


  Registration() {
    this.matdialog.closeAll();
    this.matdialog.open( RegistrationComponent );//   this._router.navigate(['/registration']);

  }
}
