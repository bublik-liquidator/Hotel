import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HotelData } from '../hotel-data';
import { SharedService } from '../SharedService';
import { User } from '../user/user';


@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {


  isEdit: boolean = false;
  isEditNomer: boolean = true;
  deistveSnomerom: string = "Забронировать";
  hotels: HotelData[] = [];
  newHotel = new HotelData();
  constructor(private http: HttpClient, private sharedService: SharedService) { }
  vhodhtml: string;

  path_json_with_opisaniem: string = "/assets/text/1.json";
  user: User;

  today: string;
  leaveDay: string;
  inf_err: string = "";
  ngOnInit(): void {
    this.today = this.date_time();
    this.leaveDay;

    this.hotels = JSON.parse(localStorage.getItem('hotels') || '[]');
    for (let i = 0; i < this.hotels.length; i++) {
      this.newHotel = this.hotels[i];
    }

    this.http.get(this.path_json_with_opisaniem).subscribe({ next: (data: any) => this.user = new User(data.specification) });
    console.log(this.path_json_with_opisaniem);

  }

  hotelselect(hotelName: string) {
    for (let i = 0; i < this.hotels.length; i++) {
      if (hotelName == this.hotels[i].name) {
        this.newHotel = this.hotels[i];

        this.http.get(this.newHotel.path_json).subscribe({ next: (data: any) => this.user = new User(data.specification) });

      }
    }

  }
  toBook(hotel: HotelData) {

    this.isEdit = !this.isEdit;
    this.isEditNomer = !this.isEditNomer;
    this.deistveSnomerom = "Отменить бронь";
    if (this.deistveSnomerom == "Отменить бронь" && this.isEditNomer == true) {
      this.deistveSnomerom = "Забронировать";
    }

  }

  Come(Indey: any, leaveDay2: any) {
    if (leaveDay2 == undefined || leaveDay2[3] + leaveDay2[4] <= Indey[3] + Indey[4] || (leaveDay2[3] + leaveDay2[4] <= Indey[3] + Indey[4] && leaveDay2[0] + leaveDay2[1] <= Indey[0] + Indey[1])) {
      this.inf_err = "Ввод некорректных данных!";
      console.log("ЧЕЛ что ты творищь");

    }
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
    if (value < 10) {
      value = '0' + value;
    }
    return value;
  }
  sesion: any;


}

