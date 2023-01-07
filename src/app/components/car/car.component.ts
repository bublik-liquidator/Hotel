import { Component, OnInit } from '@angular/core';
import { CarData } from '../car-data';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {

 
  isEdit: boolean = false;

  cars: CarData[] = [];
  newCar = new CarData(); 
  constructor() {}

  ngOnInit(): void {
    this.cars = JSON.parse(localStorage.getItem('cars') || '[]');
    for(let i=0;i<this.cars.length;i++){
    this.newCar=this.cars[i];}

  //   //убрать это тк по умолчанию можно запускать др функцию
  //   this.name = 'Audi';
  //   this.carName_for = 'Audi';
  //   this.speed = 235;
  //   this.model = 'RS8';
  //   this.colors = {
  //     car: 'Белый',
  //     salon: 'Чёрный',
  //     wheels: 'Серебристый',
  //   };
  //   this.options = ['Крутая музыка', 'Климат контроль', 'Экологичность'];
  //   this.options = JSON.parse(localStorage.getItem(this.carName_for) || '{}'); // забирает из localStorage

  //   this.path_picturs = '/assets/img/1.png';
  // }

  // showEdit() {
  //   this.isEdit = !this.isEdit;
  // }



  // deleteOpt(option: string) {
  //   for (let i = 0; i < this.options.length; i++) {
  //     if (this.options[i] == option) {
  //       this.options.splice(i, 1);
  //       localStorage.setItem(this.carName_for, JSON.stringify(this.options)); //сохраняет в localStorage
  //       // console.log("DEL ",this.carName_for);
  //       break;
  //     }
  //   }
  }

  carSelect(carName: string) {
    for(let i=0;i<this.cars.length;i++){
    if(carName==this.cars[i].name){
      this.newCar=this.cars[i]
    }
  }
    // if (carName == 'bmw') {
    //   this.carName_for = 'bmw';
    //   this.name = 'BMW';
    //   this.speed = 280;
    //   this.model = 'M5';
    //   this.colors = {
    //     car: 'Синий',
    //     salon: 'Белый',
    //     wheels: 'Серебристый',
    //   };

    //   this.options = ['Спорт режим', 'Круиз контроль', 'Выдвежные зеркала'];

    //   this.options = JSON.parse(localStorage.getItem(this.carName_for) || '{}'); // забирает из localStorage

    //   this.path_picturs = '/assets/img/2.png';
    // } else if (carName == 'audi') {
    //   this.name = 'Audi';
    //   this.carName_for = 'Audi';
    //   this.speed = 235;
    //   this.model = 'RS8';
    //   this.colors = {
    //     car: 'Белый',
    //     salon: 'Чёрный',
    //     wheels: 'Серебристый',
    //   };
    //   this.options = ['Крутая музыка', 'Климат контроль', 'Экологичность'];

    //   this.options = JSON.parse(localStorage.getItem(this.carName_for) || '{}'); // забирает из localStorage

    //   this.path_picturs = '/assets/img/1.png';
    // } else {
    //   this.name = 'Mercedes';
    //   this.carName_for = 'Mercedes';
    //   this.speed = 180;
    //   this.model = 'C180';
    //   this.colors = {
    //     car: 'Белый',
    //     salon: 'Чёрный',
    //     wheels: 'Серебристый',
    //   };

    //   this.options = ['ABSD', 'Автопилот', 'Автопаркинг'];

    //   this.options = JSON.parse(localStorage.getItem(this.carName_for) || '{}'); // забирает из localStorage
    //   console.log('this.options', this.options);
    //   this.path_picturs = '/assets/img/3.png';
    // }
  }
  sesion: any;
  SaveData() {
    // localStorage.setItem('bmw', JSON.stringify(this.options)); //сохраняет в localStorage
    // localStorage.getItem('bmw'); // забирает из localStorage
    // console.log('this.options ', this.options);
    
  }
  Look(){
    // this.string_key.push(JSON.parse(localStorage.getItem('string_key') || '{}'));
    // console.log('string_key '+this.string_key);
  
   }




}

interface Colors {
  car: string;
  salon: string;
  wheels: string;
}

