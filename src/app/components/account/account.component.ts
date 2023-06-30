import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SharedServiceUsers } from '../SharedServiceUsers';
import { UsersData } from '../users-data';
import { RoomBooking } from '../room-booking';
import { SharedServiceRoomBooking } from '../SharedServiceRoomBooking';
import { ShowInfoComponent } from '../show-info/show-info.component';
import { SharedServiceShowInfo } from '../SharedServiceShowInfo';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  constructor(public matdialog: MatDialog, private sharedServiceInfo: SharedServiceShowInfo, private SharedServiceRoomBooking: SharedServiceRoomBooking, private http: HttpClient, private sharedService: SharedServiceUsers) { }

  user = new UsersData(); // оригинальная пользователь
  users: UsersData[] = [];
  editedUser = new UsersData(); // это редактируем
  roomBookings: RoomBooking[] = [new RoomBooking()];
  roomBooking = new RoomBooking();
  isEdit: boolean = false;

  ngOnInit() {
    this.getInfo();
    this.SharedServiceRoomBooking.initBookingRooms(this.user).subscribe((data: any) => {
      if (data != null) {
        this.roomBookings = data;
        this.roomBooking = this.roomBookings[0]

      }
    });
    //this.checDate();

    //добавляеет ся на одлин день меньше некоректное отображение даты  
  }

  checDate() {
    const date1: any = new Date(this.roomBooking.date_to);
    const date2: any = new Date();
    const diffTime = Math.abs(date2 - date1);
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

console.log(diffDays);
    if (date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear()) {
      this.sharedServiceInfo.initErrorInformation("Срок вашей аренды подошёл к концу")
      this.matdialog.open(ShowInfoComponent);
    } else {
      this.sharedServiceInfo.initErrorInformation("Вы можете прибывать в номере"+diffDays)
      this.matdialog.open(ShowInfoComponent);

    }

  }


  getInfo() {
    this.user.id = JSON.parse(localStorage.getItem('activleUser') || '[]').id;
    this.sharedService.getById(this.user.id).subscribe((data: UsersData) => {
      this.user = data;
    });

  }
  EditButtonInfo() {
    this.isEdit = !this.isEdit;
  }

  Save() {
    this.users = this.users.filter((obj) => this.user.login != this.user.login);
    this.sharedService.save(this.user);
    this.isEdit = !this.isEdit;
    return true;

  }
  Roomselect(lol: string) {
    for (let i = 0; i < this.roomBookings.length; i++) {
      if (lol == this.roomBookings[i].name) {
        this.roomBooking = this.roomBookings[i];
      //  this.checDate();

        // this.roomBooking.date_from = this.converData(this.roomBooking.date_from)
        // this.roomBooking.date_to = this.converData(this.roomBooking.date_to)
      }
    }

  }

  Departure(id: bigint) {
    this.SharedServiceRoomBooking.delete(id);
    window.location.reload()
  }
  converData(str: string) {
    const date = new Date(str);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const day = date.getUTCDate() + 1;
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    return `${hours}:${minutes} ${day}.${month}.${year}`;
  }
}
