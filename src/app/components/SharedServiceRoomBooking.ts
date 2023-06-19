import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RoomBooking } from './room-booking';
import { Observable } from 'rxjs/internal/Observable';
import { HotelRoom } from './hotel-room';

@Injectable()
export class SharedServiceRoomBooking {
  user = new RoomBooking();
  users: RoomBooking[] = [];
  ChekButton: string;
  editeduser = new RoomBooking();
  checkBooking: boolean;
  res: object
  constructor(private http: HttpClient, private router: Router) {
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

}
