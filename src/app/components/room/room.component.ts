import { Component, OnInit } from '@angular/core';
import { Hotel } from '../hotel';
import { HotelRoom } from '../hotel-room';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { SharedServiceUsers } from '../SharedServiceUsers';
import { UsersData } from '../users-data';
import { SharedServiceRoomBooking } from '../SharedServiceRoomBooking';
import { RoomBooking } from '../room-booking';
import { ShowInfoComponent } from '../show-info/show-info.component';
import { SharedServiceShowInfo } from '../SharedServiceShowInfo';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  constructor(private sharedServiceInfo: SharedServiceShowInfo, private sharedService: SharedServiceUsers, private SharedServiceRoomBooking: SharedServiceRoomBooking, private SharedServiceUsers: SharedServiceUsers, private http: HttpClient, private router: Router, public matdialog: MatDialog) { }
  hotel: Hotel
  room = new HotelRoom();
  rooms: HotelRoom[] = [new HotelRoom()];
  info: string = "";
  Data: object;
  checkLogin: boolean;
  today: string;
  leaveDay: string;
  inf_err: string = "";
  roomBooking = new RoomBooking()
  roomBookings: RoomBooking[] = [new RoomBooking()];
  user = new UsersData()
  error: string = "";
  ansver = new Object();
  checkBookingBoolean: boolean;
  booking: boolean
  ngOnInit(): void {
    this.today = this.date_time();
    this.getRooms();
    this.checLogin();
    //this.getRoomBooking();


  }
  checLogin() {
    this.Data = JSON.parse(localStorage.getItem('activleUser') || '[]');
    if (localStorage.getItem('activleUser') == null) {
      this.checkLogin = false;
      this.info = "Выполните вход чтобы забронировать номер";
    }
    if (localStorage.getItem('activleUser') != null) {
      this.checkLogin = true;
      this.user = JSON.parse(localStorage.getItem('activleUser') || '[]')
      this.info = "Забронировать";
    }
  }
  converData(str: string) {
    const date = new Date(str);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    return `${hours}:${minutes} ${day}.${month}.${year}`;
  }
  getRoomBooking(roomID: bigint) {
    this.SharedServiceRoomBooking.getAll().subscribe((data: any) => {
      if (data != null) {
        this.roomBookings = data;
        this.roomBooking = data[0]
      }
      if (roomID) {
        this.roomBookings = this.roomBookings.filter(function (item) {
          return item.room_id == roomID;
        });
      }

      this.roomBooking = this.roomBookings[0]
      this.roomBooking.date_from=this.converData(this.roomBooking.date_from)
     this.roomBooking.date_to=this.converData(this.roomBooking.date_to)
    });

  }
  getRooms() {
    var hotelID = JSON.parse(localStorage.getItem('hotel') || '[]').id;
    this.http.get('http://localhost:3000/api/hotel_room').subscribe((data: any) => {
      if (data != null) {
        this.rooms = data;
        this.room = data[0]
      }
      if (hotelID) {
        this.rooms = this.rooms.filter(function (item) {
          return item.hotel_id == hotelID;
        });
      }
      this.room = this.rooms[0]
      this.checkBooking(this.room)
    });


  }

  checkBooking(room: HotelRoom) {    
    this.SharedServiceRoomBooking.getById(room).subscribe((value: object) => {
      if (value != null) {
        var str = JSON.stringify(value).replace(/"/g, '');
        if (str == "true") {
          this.checkBookingBoolean = true;
          this.getRoomBooking(room.id)
          this.error = "ЗАНЯТ"
          console.log("ЗАНЯТ");
        }
        if (str == "false") {
          console.log("Свободен");
          this.checkBookingBoolean = false;
        }
      }
    });
  }


  toBook(room: HotelRoom) {
    this.roomBooking.room_id = room.id;
    this.roomBooking.booked_by_user_id = this.user.id;
    this.roomBooking.date_from = "2031-10-11T21:00:00.000Z "
    this.roomBooking.date_to = "2033-10-11T21:00:00.000Z "
    this.roomBooking.payed = false;

    if (this.checkLogin == true) {
      this.user = JSON.parse(localStorage.getItem('hotel') || '[]')
      localStorage.setItem('room', JSON.stringify(room));
      this.checkBooking(room);
      if (!this.checkBookingBoolean) {
        this.SharedServiceRoomBooking.post(this.roomBooking)
      }
      else {
        this.sharedServiceInfo.initErrorInformation("Этот номер занят пожалуйста выберете другой")
        this.matdialog.open(ShowInfoComponent);
      }
    }
    else {
      this.sharedServiceInfo.initErrorInformation("Пожалуйста, выполните вход")
      this.matdialog.open(ShowInfoComponent);

    }

  }
  Roomselect(lol: string) {
    for (let i = 0; i < this.rooms.length; i++) {
      if (lol == this.rooms[i].name) {
        this.room = this.rooms[i];
        this.checkBooking(this.room);
      }
    }

  }




  Come(Indey: any, leaveDay2: any, room: HotelRoom) {
    if (leaveDay2 == undefined) {
      //leaveDay2[3] + leaveDay2[4] <= Indey[3] + Indey[4] || (leaveDay2[3] + leaveDay2[4] <= Indey[3] + Indey[4] && leaveDay2[0] + leaveDay2[1] <= Indey[0] + Indey[1])
      this.inf_err = "Ввод некорректных данных!";
      console.log("ЧЕЛ что ты творищь");

    }
    // else {
    //   this.inf_err = "ok"
    //   this.user.bronirovhotel_id = newHotel.id
    //   console.log(this.user.bronirovhotel_id)
    //   this.sharedServiceUsers.save(this.user)
    // }
    console.log(this.today + this.leaveDay);
    console.log(typeof this.today);
    console.log(typeof this.leaveDay);
  }



  date_time() {
    var current_datetime = new Date();
    var day = this.zero_first_format(current_datetime.getDate());
    var month = this.zero_first_format(current_datetime.getMonth() + 1);
    var year = current_datetime.getFullYear();

    return year + "-" + month + "-" + day;
  }
  zero_first_format(value: string | number) {
    if (+value < 10) {
      value = '0' + value;
    }
    return value;
  }
  sesion: any;

}
