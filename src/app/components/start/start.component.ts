import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HotelData } from '../hotel-data';
import { SharedService } from '../SharedService';
import { SharedServiceUsers } from '../SharedServiceUsers';
import { UsersData } from '../users-data';


@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {


  isEdit: boolean = false;
  isEditNomer: boolean = true;
  deistveSnomerom: string = "Забронировать";
  hotels: HotelData[] = [];
  hotels2: HotelData[] = [];

  newHotel = new HotelData();
  constructor(private sharedServiceUsers: SharedServiceUsers, private sharedService: SharedService) { }

  today: string;
  leaveDay: string;
  inf_err: string = "";
  user: UsersData
  checkLogin: boolean=true;
  ngOnInit(): void {
    this.today = this.date_time();
    this.GetHotel();
   // this.GetInfo()
   

  }
  // GetInfo() {
  //   this.sharedServiceUsers.getSpecialUser().subscribe((data: any) => {
  //     this.user = data;
  //     if (this.user.vhod == "Выход") {
  //       this.checkLogin = true;
  //     }
  //     else{
  //       this.checkLogin = false;
  //     }
  //     if(this.checkLogin == false){
  //       this.deistveSnomerom = "Выполните вход чтобы забронировать номер";
  //     }
  //     else{
  //       this.deistveSnomerom = "Забронироватьссс";
  //     }
  //   });
  // }
  GetHotel() {
    this.sharedService.getAll().subscribe((data: any) => {
      this.hotels = data;
      this.newHotel = this.hotels[0];
    });
  }

  hotelselect(hotelName: string) {
    for (let i = 0; i < this.hotels.length; i++) {
      if (hotelName == this.hotels[i].name) {
        this.newHotel = this.hotels[i];
        // this.http.get(this.newHotel.path_json).subscribe({ next: (data: any) => this.user = new User(data.specification) });

      }
    }

  }
  toBook(hotel: HotelData) {
    if (this.checkLogin == true) {
      this.isEdit = !this.isEdit;
      this.isEditNomer = !this.isEditNomer;
      this.deistveSnomerom = "Отменить бронь";
      if (this.deistveSnomerom == "Отменить бронь" && this.isEditNomer == true) {
        this.deistveSnomerom = "Забронировать";
      }
    }
    else {
      this.deistveSnomerom = "Выполните вход чтобы забронировать номер";
    }


  }

  Come(Indey: any, leaveDay2: any,newHotel:HotelData) {
    if (leaveDay2 == undefined ) {
      //leaveDay2[3] + leaveDay2[4] <= Indey[3] + Indey[4] || (leaveDay2[3] + leaveDay2[4] <= Indey[3] + Indey[4] && leaveDay2[0] + leaveDay2[1] <= Indey[0] + Indey[1])
      this.inf_err = "Ввод некорректных данных!";
      console.log("ЧЕЛ что ты творищь");

    }
    else {
      this.inf_err = "ok"
     // this.user.bronirovhotel_id=newHotel.id
     // console.log(this.user.bronirovhotel_id)
      this.sharedServiceUsers.save(this.user)
    }
    console.log(this.today + this.leaveDay);
    console.log(typeof this.today);
    console.log(typeof this.leaveDay);
    //if(user)
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

