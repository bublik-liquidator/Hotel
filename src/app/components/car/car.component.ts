import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CarData } from '../car-data';
import { SharedService } from '../SharedService';
import { User } from '../user/user';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {


  isEdit: boolean = false;
  isEditNomer: boolean = true;
  deistveSnomerom: string ="Забронировать";
  cars: CarData[] = [];
  newCar = new CarData();
  constructor(private http: HttpClient,private sharedService: SharedService) { }
  vhodhtml: string;
 
  aaa: string = "/assets/text/1.json";
  user: User;

  today: string;
  leaveDay: string;

  ngOnInit(): void {
    this.today = this.date_time();
    this.leaveDay ;

    this.cars = JSON.parse(localStorage.getItem('cars') || '[]');
    for (let i = 0; i < this.cars.length; i++) {
      this.newCar = this.cars[i];
    }
    
    this.http.get(this.aaa).subscribe({ next: (data: any) => this.user = new User(data.specification) });
    console.log(this.aaa);
  }

  carSelect(carName: string) {
    for (let i = 0; i < this.cars.length; i++) {
      if (carName == this.cars[i].name) {
        this.newCar = this.cars[i];

        this.http.get(this.newCar.path_json).subscribe({ next: (data: any) => this.user = new User(data.specification) });

      }
    }

  }
  toBook(car:CarData){
    // console.log(car);
    // this.sharedService.initCar(car);
    this.isEdit = !this.isEdit;   
    this.isEditNomer = !this.isEditNomer; 
    this.deistveSnomerom="Отменить бронь";
    if( this.deistveSnomerom=="Отменить бронь"&&this.isEditNomer==true){
      this.deistveSnomerom="Забронировать";
    }   
  
  }

  Come(Indey: any,leaveDay2: any){
console.log(Indey + leaveDay2 );
console.log(this.today + this.leaveDay );
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
  SaveData() {
    // localStorage.setItem('bmw', JSON.stringify(this.options)); //сохраняет в localStorage
    // localStorage.getItem('bmw'); // забирает из localStorage
    // console.log('this.options ', this.options);

  }

  Look() {
    // this.string_key.push(JSON.parse(localStorage.getItem('string_key') || '{}'));
    // console.log('string_key '+this.string_key);

  }





}

interface Colors {
  car: string;
  salon: string;
  wheels: string;
}

