
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HotelData } from '../hotel-data';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { SharedService } from '../SharedService';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Hotel } from '../hotel';
import { ShowInfoComponent } from '../show-info/show-info.component';
import { SharedServiceShowInfo } from '../SharedServiceShowInfo';
import { HotelRoom } from '../hotel-room';
import { SharedServiceRoomBooking } from '../SharedServiceRoomBooking';
import { RoomBooking } from '../room-booking';
import { SharedServiceHotelRoom } from '../SharedServiceHotelRoom';
import { EditInfoRoomComponent } from '../edit-info-room/edit-info-room.component';
@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})
export class EditRoomComponent implements OnInit {
  hotels: Hotel[] = [];
  newRoom = new HotelRoom();
  isEdit: boolean = false;
  hotel: Hotel
  room = new HotelRoom();
  rooms: HotelRoom[] = [new HotelRoom()];
  person: { id: string; age?: number };
  constructor(private SharedServiceHotelRoom:SharedServiceHotelRoom,private SharedServiceRoomBooking: SharedServiceRoomBooking, private sharedServiceInfo: SharedServiceShowInfo, private matdialog: MatDialog, private sharedService: SharedService, private http: HttpClient, private router: Router) {
  }

  isResultLoaded = false;
  StudentArray: string[] = [];


  infoRoom: string = "";//!!!!!

  roomBooking = new RoomBooking()
  roomBookings: RoomBooking[] = [new RoomBooking()];
  checkBookingBoolean: boolean;
  ngOnInit(): void {
    this.getRooms();
    //  this.hotels=this.sharedService.getAll();
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
          this.infoRoom = "ЗАНЯТ"
          //console.log("ЗАНЯТ");
        }
        if (str == "false") {
          this.infoRoom = "Свободен"

          //console.log("Свободен");
          this.checkBookingBoolean = false;
        }
      }
    });
  }
  Edithotel(room: HotelRoom) {
    this.matdialog.open(EditInfoRoomComponent);
    this.SharedServiceHotelRoom.initRoom(room);
  }
  // EditRoom(room: HotelRoom) {
  //   this.matdialog.open(EditInfoRoomComponent);
  //   localStorage.setItem('hotel', JSON.stringify(room));
  // }
  AddButtonhotel() {
    this.isEdit = !this.isEdit;
  }

  Addhotel(newRoom: HotelRoom) {
    if (newRoom.name == undefined) {
      this.sharedServiceInfo.initErrorInformation("Вы не ввели имя номера")
      this.matdialog.open(ShowInfoComponent);
    }
    else {
      if (newRoom.hotel_id == undefined) {
        this.sharedServiceInfo.initErrorInformation("Вы не ввели hotel_id")
        this.matdialog.open(ShowInfoComponent);
      }
      else {
        if (newRoom.number == undefined) {
          this.sharedServiceInfo.initErrorInformation("Вы не ввели number")
          this.matdialog.open(ShowInfoComponent);
        }
        else {
          if (newRoom.description == undefined) {
            this.sharedServiceInfo.initErrorInformation("Вы не ввели description")
            this.matdialog.open(ShowInfoComponent);
          }
          else {
            if (newRoom.path_picture == undefined) {
              this.sharedServiceInfo.initErrorInformation("Вы не ввели path_picture")
              this.matdialog.open(ShowInfoComponent);
            } else {
              if (newRoom.price == undefined) {
                this.sharedServiceInfo.initErrorInformation("Вы не ввели price")
                this.matdialog.open(ShowInfoComponent);
              } 
              else{
                this.SharedServiceHotelRoom.create(newRoom).subscribe(() => {
                  this.getRooms();
                  this.newRoom=new HotelRoom();
                });
              }
            }
          }

          //this.sharedService.create(newHotel);

        }
      }
    }


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
      this.roomBooking.date_from = this.converData(this.roomBooking.date_from)
      this.roomBooking.date_to = this.converData(this.roomBooking.date_to)
    });

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
  deletehotel(id: bigint) {
    this.SharedServiceHotelRoom.delete(id).subscribe(() => {
      this.getRooms();
    });

  }


}
