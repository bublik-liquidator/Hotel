import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RoomBooking } from './room-booking';
import { HotelRoom } from './hotel-room';
import { Subscription } from 'rxjs';

@Injectable()
export class SharedServiceRoomBooking {
  room = new HotelRoom();
  roomBooking = new RoomBooking();
  roomBookings: RoomBooking[] = [];
  ChekButton: string;
  editeduser = new RoomBooking();
  checkBooking: boolean;
  res: object
  deleteSubscription: Subscription;

  constructor(private http: HttpClient, private router: Router) {
  }
  initRoomBooking(room: RoomBooking) {
    this.roomBooking = room
  }
  initRoom(room: HotelRoom) {
    this.room = room
  }

  initBookingRooms(id: number) {
    return this.http.get(`http://localhost:3000/api/room_booking/account/${id}`);
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
    console.log(roomBooking)
    this.http.post('http://localhost:3000/api/room_booking', roomBooking).subscribe((answer: Object) => {
    });

  }
  // async postReactiveForm(roomBooking: FormGroup) {
  //   const formValue = roomBooking.value;
  //   await this.http.post('http://localhost:3000/api/room_booking', formValue).toPromise();
  // }
  delete(id: bigint) {
    console.log("ID"+id)
    return this.http.delete('http://localhost:3000/api/room_booking/' + id)
}


}
