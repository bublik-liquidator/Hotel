import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CarData } from '../car-data';
import { SharedService } from '../SharedService';
import { User } from '../user/user';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent {

  constructor(private http: HttpClient, private sharedService: SharedService) { }
  aaa: string = "/assets/text/1.json";
  user: User;

  today: string;
  maxDay: string;

  
  ngOnInit(): void {

    this.car = this.sharedService.getCar();
    CarData.copyFieldsValuesTo(this.car, this.editedCar);

    this.today = this.date_time();
    this.maxDay = "2023-12-31";
    this.http.get(this.aaa).subscribe({ next: (data: any) => this.user = new User(data.specification) });

  }
  car = new CarData(); // оригинальная машина
  editedCar = new CarData(); // это редактируем

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

}
