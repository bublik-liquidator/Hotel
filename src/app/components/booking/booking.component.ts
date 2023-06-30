import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, matDialogAnimations } from '@angular/material/dialog';
import { SharedService } from '../SharedService';
import { RoomBooking } from '../room-booking';
import { SharedServiceRoomBooking } from '../SharedServiceRoomBooking';
import { HotelRoom } from '../hotel-room';
import { SharedServiceShowInfo } from '../SharedServiceShowInfo';
import { ShowInfoComponent } from '../show-info/show-info.component';
import { Router } from '@angular/router';
import { UsersData } from '../users-data';
import { HttpClient } from '@angular/common/http';
import { SharedServiceUsers } from '../SharedServiceUsers';
// FormsModule
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  constructor(private SharedServiceUsers: SharedServiceUsers, private http: HttpClient, private router: Router, private sharedServiceInfo: SharedServiceShowInfo, private SharedServiceRoomBooking: SharedServiceRoomBooking, public matdialog: MatDialog) { }

  today: string;
  leaveDay: string;

  room = new HotelRoom();
  editedRoom = new HotelRoom();
  roomBoking = new RoomBooking();
  editedRoomBoking = new RoomBooking();

  user = new UsersData;

  ngOnInit(): void {
    this.room = this.SharedServiceRoomBooking.getRoom();
    this.roomBoking = this.SharedServiceRoomBooking.getRoomBooking();
    this.roomBoking.number = ""
    RoomBooking.copyFieldsValuesTo(this.roomBoking, this.editedRoomBoking);
    HotelRoom.copyFieldsValuesTo(this.room, this.editedRoom);

    this.today = this.date_time();
    this.editedRoomBoking.date_from = this.today;
    this.editedRoomBoking.date_to = this.today;
    this.http.get(`http://localhost:3000/api/user/${JSON.parse(localStorage.getItem('activleUser') || '[]').id}`).subscribe((answer: any) => {
      this.user = (answer)
    });

  }


  savehotelsToStorage() {

    if (this.editedRoomBoking.payed == false) {
      this.sharedServiceInfo.initErrorInformation("Вы не оплатили номер")
      this.matdialog.open(ShowInfoComponent);
    } else if (+this.user.many < +this.room.price) {
      this.sharedServiceInfo.initErrorInformation("У вас мало денег")
      this.matdialog.open(ShowInfoComponent);
    }
    else {     
      if (this.editedRoomBoking.date_from == this.editedRoomBoking.date_to) {
        this.sharedServiceInfo.initErrorInformation("Вы выбрали сегоднящний день как день выезда, к сожалению мы не можем предоставить бронь на промежуток меньше чем один день, но мы работаем над этим")
        this.matdialog.open(ShowInfoComponent);
      }
      else {
        if (this.editedRoomBoking.number > this.room.number) {
          this.sharedServiceInfo.initErrorInformation("Вы выбрали количество людей, заезжающих в номер:" + this.editedRoomBoking.number + ".Но в этом номере ограничени в:" + this.room.number + " человек")
          this.matdialog.open(ShowInfoComponent);
        }
        else {
          if (+this.editedRoomBoking.number <= 0) {
            this.sharedServiceInfo.initErrorInformation("Количество заезжающих людей должно быть больше 0 человек и не больше чем :" + this.room.number + " человек")
            this.matdialog.open(ShowInfoComponent);
          } else {
            if (this.editedRoomBoking.number == undefined) {
              this.sharedServiceInfo.initErrorInformation("Вы выбрали некорректное значение относительно количество людей, въезжающих в номер")
              this.matdialog.open(ShowInfoComponent);
            } else {
              if (this.editedRoomBoking.date_to == undefined) {
                this.sharedServiceInfo.initErrorInformation("Вы не выбрабли день отъезда из номера")
                this.matdialog.open(ShowInfoComponent);
              } else {
                this.sharedServiceInfo.initErrorInformation("Номер забронирован на вас)")
                this.matdialog.closeAll();
                this.matdialog.open(ShowInfoComponent);
                this.SharedServiceRoomBooking.post(this.editedRoomBoking);
                this.user.many=(+this.user.many-(this.room.price)*+this.editedRoomBoking.number).toString();
                this.SharedServiceUsers.save(this.user)
                this.router.navigate(['/account']);

              }
            }

          }

        }

      }

    }


  }
  //  else{
  //   RoomBooking.copyFieldsValuesTo(this.editedRoomBoking, this.roomBoking);
  //   HotelRoom.copyFieldsValuesTo(this.room, this.editedRoom);

  //   this.sharedService.initRoomBooking(this.editedRoomBoking);
  //   this.sharedService.initRoom(this.editedRoom);
  //   ////я думаю это лучше///this.sharedService.put(this.roomBoking);

  //   /////////////////this.sharedService.post(this.roomBoking);
  //   this.matdialog.closeAll();
  //   return true;
  //   }
  // }
  Cancel() {
    this.editedRoomBoking.room_id = this.roomBoking.room_id;
    this.editedRoomBoking.booked_by_user_id = this.roomBoking.booked_by_user_id;
    this.editedRoomBoking.date_from = this.roomBoking.date_from;
    this.editedRoomBoking.date_from = this.roomBoking.date_to;
    this.editedRoomBoking.payed = this.roomBoking.payed;
    this.editedRoomBoking.number = this.roomBoking.number;
    this.matdialog.closeAll();
    //!this.editedHotel= this.hotel;
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

}
