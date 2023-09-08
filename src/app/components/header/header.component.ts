import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { SharedServiceUsers } from '../SharedServiceUsers';
import { Router } from '@angular/router';
import { UsersData } from '../users-data';


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
  authorizationButtonText: string = " ";
  loggedInButtonText: string = "Exit";
  notLoggedInButtonText: string = "Login";
  user: UsersData
  Data: object;
  hotelLink: string;
  roomLink: string;


  ngOnInit(): void {
    this.checLogin();

  }


  checLogin() {
    this.Data = JSON.parse( localStorage.getItem( 'activleUser' ) || '[]' );
    if ( localStorage.getItem( 'activleUser' ) == null ) {
      this.userLoggedOut();
    }
    if ( localStorage.getItem( 'activleUser' ) != null ) {
      this.isEdit = true;

      if ( JSON.parse( localStorage.getItem( 'activleUser' ) || '[]' ).login == "admin" ) {
        this.isEditAdmin = true;
        this.isEditManager = true;

      }
      if ( JSON.parse( localStorage.getItem( 'activleUser' ) || '[]' ).login == "manager" ) {
        this.isEditManager = true;
      }
      if ( JSON.parse( localStorage.getItem( 'activleUser' ) || '[]' ).login == "user" ) {
        this.isEdit = true;
      }
      this.userLoggedIn();
    }

  }


  ButtonText() {

    if ( localStorage.getItem( 'activleUser' ) == null ) {
      const dialogRef = this.matdialog.open( LoginComponent );
      this.sharedService.initdialogRef( dialogRef )
      const subscription = dialogRef.afterClosed().subscribe( result => {
        if ( result ) {

          this.checLogin();

          console.log( 'Dialog was closed with result:', result );
        } else {
          console.log( 'Dialog was closed with no result.' );
        }
        // Unsubscribe from Observable
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
