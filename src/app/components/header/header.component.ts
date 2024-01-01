import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { SharedServiceUsers } from '../SharedServiceUsers';
import { Router } from '@angular/router';
import { UsersData } from '../users-data';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component( {
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.css' ]
} )
export class HeaderComponent implements OnInit {

  constructor( private sharedService: SharedServiceUsers, public matdialog: MatDialog, private router: Router, private cdRef: ChangeDetectorRef ) { }
  isEdit: boolean = false;
  isEditAdmin: boolean = false;
  isEditManager: boolean = false;
  authorizationButtonText: string = " x";
  loggedInButtonText: string = "Exit";
  notLoggedInButtonText: string = "Login";
  user!: UsersData
  Data: object;
  hotelLink: string;
  roomLink: string;


  ngOnInit(): void {
    this.checLogin();

  }


  checLogin() {
    const activeUser = localStorage.getItem('activleUser');
    if (activeUser) {
      this.isEdit = true;
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(activeUser);
      this.sharedService.getById(decodedToken.id).subscribe((data: UsersData) => {
        this.user = data;
        if (this.user.role === "admin") {
          this.isEditAdmin = true;
          this.isEditManager = true;
        }
        if (this.user.role === "manager") {
          this.isEditManager = true;
        }
        if (this.user.login == "user") {
          this.isEdit = true;
        }
      });
      this.userLoggedIn();
    } else {
      console.log('No active user found in local storage.');
      this.userLoggedOut();
    }
  }
  

  ButtonText() {

    if ( localStorage.getItem( 'activleUser' ) == null ) {
      const dialogRef = this.matdialog.open( LoginComponent );
      this.sharedService.initdialogRef( dialogRef )
      const subscription = dialogRef.afterClosed().subscribe( result => {
        if ( result ) {
          this.checLogin();
         // console.log( 'Dialog was closed with result:', result );
        } else {
         // console.log( 'Dialog was closed with no result.' );
        }
        subscription.unsubscribe();
      } );
    }
    else {
      this.router.navigate( [ '/' ] );
      localStorage.removeItem( 'activleUser' );
      localStorage.removeItem( 'room' );
      localStorage.removeItem( 'hotel' );
      this.isEditManager = false;
      this.isEditAdmin = false;
      this.isEdit = false;

      this.checLogin();
    }
  }

  userLoggedIn() {
    this.authorizationButtonText = this.loggedInButtonText;
    // console.log("loggedIn");
  }

  userLoggedOut() {
    this.authorizationButtonText = this.notLoggedInButtonText;
    // console.log("loggedOut");

  }


}
