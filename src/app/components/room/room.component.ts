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

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  constructor(private SharedServiceRoomBooking: SharedServiceRoomBooking, private SharedServiceUsers: SharedServiceUsers, private http: HttpClient, private router: Router, public matdialog: MatDialog) { }
  hotel: Hotel
  room = new HotelRoom();
  rooms: HotelRoom[] = [new HotelRoom()];
  info: string = "";
  Data: object;
  checkLogin: boolean;
  today: string;
  leaveDay: string;
  inf_err: string = "";
  checkBooking:boolean=false;
  roomBooking=new RoomBooking()
  user = new UsersData() 
  ngOnInit(): void {
    this.today = this.date_time();
    this.getRooms();
    this.checLogin()
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
    });


  }
  toBook(room: HotelRoom) {
    this.roomBooking.room_id=room.id;
    this.roomBooking.booked_by_user_id=this.user.id;
    this.roomBooking.date_from="10.12.2031"
    this.roomBooking.date_to="10.12.2032"
    this.roomBooking.payed=false;

    if (this.checkLogin == true) {
      this.user = JSON.parse(localStorage.getItem('hotel') || '[]')
      localStorage.setItem('room', JSON.stringify(room));
      //this.user.bronirovhotel_id=room.id
      //this.SharedServiceUsers.putUser(this.user)
   
      if(!this.SharedServiceRoomBooking.getById(room.id)){
        console.log("ЭТОТ номер занят")
      }
      else{
        console.log("Всё ок")
        this.SharedServiceRoomBooking.post(this.roomBooking)
        //this.router.navigate(['/account']);

        this.SharedServiceRoomBooking.getById
        //this.SharedServiceUsers.putUser(this.user)
      //  записать в табличку к рооб бокинг инфу
      }
      

    }
    else {
      this.matdialog.open(LoginComponent);
    }

  }
  Roomselect(lol: string) {
    for (let i = 0; i < this.rooms.length; i++) {
      if (lol == this.rooms[i].name) {
        this.room = this.rooms[i];
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
