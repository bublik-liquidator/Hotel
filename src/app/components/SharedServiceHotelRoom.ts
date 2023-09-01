import { Injectable } from '@angular/core';
import { HotelRoom } from './hotel-room';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable( {
  providedIn: 'root'
} )
export class SharedServiceHotelRoom {
  rooms: HotelRoom[] = [];
  room = new HotelRoom()
  constructor( private http: HttpClient ) { }
  initRoom( room: HotelRoom ) {
    this.room = room;
  }

  getRoom(): HotelRoom {
    return this.room;
  }

  editRoom( room: HotelRoom ) {
    HotelRoom.copyFieldsValuesTo( room, this.room );
  }

  getAll(): Observable<any> {
    return this.http.get( 'http://localhost:3000/api/hotel_room' );
  }

  getById( id: string ) {
    return this.http.get( `http://localhost:3000/api/hotel_room/${ id }` );
  }

  create( room: HotelRoom ) {
    return this.http.post( 'http://localhost:3000/api/hotel_room', room )
  }

  delete( id: bigint ) {
    return this.http.delete( `http://localhost:3000/api/hotel_room/${ id }` )
  }

  save( room: HotelRoom ) {
    return this.http.put( `http://localhost:3000/api/hotel_room/${ room.id }`, room ).subscribe( data => console.log( data ) );
  }
}
