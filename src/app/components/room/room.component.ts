import { Component, OnInit } from '@angular/core';
import { Hotel } from '../hotel';
import { HotelRoom } from '../hotel-room';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BookingComponent } from '../booking/booking.component';
import { SharedServiceUsers } from '../SharedServiceUsers';
import { UsersData } from '../users-data';
import { SharedServiceRoomBooking } from '../SharedServiceRoomBooking';
import { RoomBooking } from '../room-booking';
import { ShowInfoComponent } from '../show-info/show-info.component';
import { SharedServiceShowInfo } from '../SharedServiceShowInfo';

@Component( {
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: [ './room.component.css' ]
} )
export class RoomComponent implements OnInit {

  constructor( private sharedServiceInfo: SharedServiceShowInfo, private sharedService: SharedServiceUsers, private SharedServiceRoomBooking: SharedServiceRoomBooking, private SharedServiceUsers: SharedServiceUsers, private http: HttpClient, private router: Router, public matdialog: MatDialog ) { }
  hotel: Hotel
  room = new HotelRoom();
  rooms: HotelRoom[] = [ new HotelRoom() ];
  info: string = "";
  Data: object;
  checkLogin: boolean;
  today: string;
  leaveDay: string;
  inf_err: string = "";
  roomBooking = new RoomBooking()
  NewRoomBooking= new RoomBooking()
  roomBookings: RoomBooking[] = [ new RoomBooking() ];
  user = new UsersData()
  ansver = new Object();
  checkBookingBoolean: boolean;
  booking: boolean
  ngOnInit(): void {
    this.getRooms();
    this.checLogin();
    this.getRoomBooking()
  }

  checLogin() {
    this.Data = JSON.parse( localStorage.getItem( 'activleUser' ) || '[]' );
    if ( localStorage.getItem( 'activleUser' ) == null ) {
      this.checkLogin = false;
      this.info = "Log in to book a room";
    }
    if ( localStorage.getItem( 'activleUser' ) != null ) {
      this.checkLogin = true;
      this.user = JSON.parse( localStorage.getItem( 'activleUser' ) || '[]' )
      this.info = "Book";
    }
  }

  getRoomBooking(   ) {
    this.SharedServiceRoomBooking.getAll().subscribe( ( data: any ) => {
      if ( data != null ) {
        this.roomBookings = data;
        this.roomBooking = data[ 0 ]
      }
    } );

  }
  getRooms() {
    var hotelID = JSON.parse( localStorage.getItem( 'hotel' ) || '[]' ).id;
    this.http.get( 'http://localhost:3000/api/hotel_room' ).subscribe( ( data: any ) => {
      if ( data != null ) {
        this.rooms = data;
        this.room = data[ 0 ]
        this.checkBooking(this.room)
      }
      if ( hotelID ) {
        this.rooms = this.rooms.filter( function ( item ) {
          return item.hotel_id == hotelID;
        } );
      }
    } );
   
  }

  checkBooking( room: HotelRoom ) {
    this.SharedServiceRoomBooking.getById( room ).subscribe( ( value: object ) => {
      if ( value ) {
        room.isBooked = true;
        //this.getRoomBooking( room.id )
      } else {
        room.isBooked = false;
      }
    } );
  }

  toBook( room: HotelRoom ) {
    this.NewRoomBooking.room_id = room.id;
    this.NewRoomBooking.booked_by_user_id = this.user.id;
    this.NewRoomBooking.payed = false;
    this.NewRoomBooking.name = room.name;

    if ( this.checkLogin == true ) {
      this.user = JSON.parse( localStorage.getItem( 'hotel' ) || '[]' )
      localStorage.setItem( 'room', JSON.stringify( room ) );
      if ( !this.checkBookingBoolean ) {
        //+calling the service
        this.SharedServiceRoomBooking.initRoom( this.room );
        this.SharedServiceRoomBooking.initRoomBooking( this.NewRoomBooking );
        this.matdialog.open( BookingComponent );
        //this.SharedServiceRoomBooking.post(this.roomBooking)
      }
      else {
        this.sharedServiceInfo.initErrorInformation( "This number is busy, please choose another one" )
        this.matdialog.open( ShowInfoComponent );
      }
    }
    else {
      this.sharedServiceInfo.initErrorInformation( "Please log in" )
      this.matdialog.open( ShowInfoComponent );

    }

  }


}
