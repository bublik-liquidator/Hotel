import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CarData } from '../car-data';
import { User } from '../user/user';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {


  isEdit: boolean = false;

  cars: CarData[] = [];
  newCar = new CarData();
  constructor(private http: HttpClient) { }
  vhodhtml: string;
  aaa: string = "user.json";
  user: User;

  ngOnInit(): void {
    this.cars = JSON.parse(localStorage.getItem('cars') || '[]');
    for (let i = 0; i < this.cars.length; i++) {
      this.newCar = this.cars[i];
    }
    this.aaa = this.newCar.path_json;
   
     if (this.aaa == undefined || this.aaa == null) {
       this.aaa = "user.json";
     }
    this.http.get(this.aaa).subscribe({ next: (data: any) => this.user = new User(data.specification) });

  }

  carSelect(carName: string) {
    for (let i = 0; i < this.cars.length; i++) {
      if (carName == this.cars[i].name) {
        this.newCar = this.cars[i]
      }
    }

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

