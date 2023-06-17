import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RoomBooking } from './room-booking';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class SharedServiceRoomBooking {
  user = new RoomBooking();
  users: RoomBooking[] = [];
  ChekButton: string;
  editeduser = new RoomBooking();
  checkBooking: boolean;
  constructor(private http: HttpClient, private router: Router) {
  }
  getById(id: bigint) {
    this.http.get(`http://localhost:3000/api/room_booking/${id}`).subscribe((data: any) => {

      if (data.room_id == id) {
        console.log(data)
        this.checkBooking = true;
      }
      else {
        this.checkBooking = false;
      }
    
    }, error => {
      if (error.status === 404) {
        this.checkBooking = false;
      }
    });
    return this.checkBooking
  }

  post(roomBooking: RoomBooking) {
    this.http.post('http://localhost:3000/api/room_booking', roomBooking).subscribe((answer: Object) => {
    });

  }

}
