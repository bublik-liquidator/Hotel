import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RoomBooking } from './room-booking';
import { Observable } from 'rxjs/internal/Observable';
import { HotelRoom } from './hotel-room';

@Injectable()
export class SharedServiceRoomBooking {
  room = new HotelRoom();
  roomBooking = new RoomBooking();
  roomBookings: RoomBooking[] = [];
  ChekButton: string;
  editeduser = new RoomBooking();
  checkBooking: boolean;
  res: object
  constructor(private http: HttpClient, private router: Router) {
  }
  initRoomBooking(room: RoomBooking) {
    this.roomBooking = room
  }
  initRoom(room: HotelRoom) {
    this.room = room
  }
  getRoom() {
    return this.room
  }
  getRoomBooking() {
    return this.roomBooking
  }

  getById(room: HotelRoom) {
    return this.http.post('http://localhost:3000/api/room_booking/check', room)
  }
  getAll() {
    return this.http.get('http://localhost:3000/api/room_booking/')
  }
  async post(roomBooking: RoomBooking) {
    this.http.post('http://localhost:3000/api/room_booking', roomBooking).subscribe((answer: Object) => {
    });

  }

  delete(id: bigint) {
    this.http.delete('http://localhost:3000/api/room_booking/' + id).subscribe((data: Object) => {
    });
  }



  initBookingRooms(user: object) {
    return this.http.post('http://localhost:3000/api/room_booking/account', user)

  }
  getBookingRooms() {
    return this.roomBookings
  }

}