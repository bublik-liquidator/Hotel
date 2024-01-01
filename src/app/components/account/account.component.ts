import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SharedServiceUsers } from '../SharedServiceUsers';
import { UsersData } from '../users-data';
import { RoomBooking } from '../room-booking';
import { SharedServiceRoomBooking } from '../SharedServiceRoomBooking';
import { ShowInfoComponent } from '../show-info/show-info.component';
import { SharedServiceShowInfo } from '../SharedServiceShowInfo';
import { MatDialog } from '@angular/material/dialog';
import jwt_decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component( {
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: [ './account.component.css' ]
} )
export class AccountComponent {

  constructor( public matdialog: MatDialog, private sharedServiceInfo: SharedServiceShowInfo, private SharedServiceRoomBooking: SharedServiceRoomBooking, private http: HttpClient, private sharedService: SharedServiceUsers ) { }

  user = new UsersData();
  users: UsersData[] = [];
  editedUser = new UsersData();
  roomBookings: RoomBooking[] = [ new RoomBooking() ];
  roomBooking = new RoomBooking();
  isEdit: boolean = false;

  ngOnInit() {
    const helper = new JwtHelperService();
    const activeUser = localStorage.getItem( 'activleUser' );
    if ( activeUser ) {
      const decodedToken = helper.decodeToken( activeUser );
      this.user.id = decodedToken.id;
      this.sharedService.getById( this.user.id ).subscribe( ( data: UsersData ) => {
        this.user = data;
      } ); 
    } else {
      console.log( 'No active user found in local storage.' );
    }
    
    this.initRooms();
    //this.checDate();
    ////added one day less incorrect date display
  }
  initRooms() {
    this.SharedServiceRoomBooking.initBookingRooms( Number( this.user.id ) ).subscribe( ( data: any ) => {
      if ( data != null ) {
        this.roomBookings = data;
        this.roomBooking = this.roomBookings[ 0 ]
      }
    } );
  }
  checDate() {
    const date1: any = new Date( this.roomBooking.date_to );
    const date2: any = new Date();
    const diffTime = Math.abs( date2 - date1 );
    const diffDays = Math.ceil( diffTime / ( 1000 * 60 * 60 * 24 ) );

    console.log( diffDays );
    if ( date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear() ) {
      this.sharedServiceInfo.initErrorInformation( "Your lease has come to an end" )
      this.matdialog.open( ShowInfoComponent );
    } else {
      this.sharedServiceInfo.initErrorInformation( "You can stay in the room" + diffDays )
      this.matdialog.open( ShowInfoComponent );
    }

  }


  EditButtonInfo() {
    this.isEdit = !this.isEdit;
  }

  Save() {
    let userCopy = JSON.parse(JSON.stringify(this.user));
    delete userCopy.password; 
    console.log(userCopy)
    this.sharedService.save( userCopy ).subscribe( response => {
      console.log(response)
    } );
    this.isEdit = !this.isEdit;
    return true;

  }


  Departure( id: bigint ) {
    this.SharedServiceRoomBooking.delete( id ).subscribe( () => {
      this.initRooms();
    } );
  }

  converData( str: string ) {
    const date = new Date( str );
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().padStart( 2, '0' );
    const day = date.getUTCDate() + 1;
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    return `${ hours }:${ minutes } ${ day }.${ month }.${ year }`;
  }
}
