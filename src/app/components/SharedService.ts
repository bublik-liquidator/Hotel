import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { CarData } from './car-data';

@Injectable()
export class SharedService {
  car = new CarData();
  cars: CarData[] = [];
  editedCar = new CarData(); 
  
  initCar(car: CarData) {
    this.car = car;
  }
  getCar(): CarData {
    return this.car;
  }
  editCar(car: CarData) {
    CarData.copyFieldsValuesTo(car, this.car);
  }

  getAll() {
    this.cars = JSON.parse(localStorage.getItem('cars') || '[]');
    return this.cars;
  }
  getById(id: string) {
    if (localStorage.getItem('cars') !== null) {
      this.getAll();
      // this.getAll().find(this.car -> this.car.id == id);
      // this.NewCar = this.cars.find(({ id }) => id === id);]
      console.log('ALLL ' + this.getAll().find(({ id }) => id === id));
      return this.getAll().find(({ id }) => id === id);
    }
    return 0;
  }
  create(Car: CarData) {
    //сделать проверку на существующий IDn
    Car.id = Math.floor(Math.random() * 100).toString();
    if (this.cars.find(({ id }) => id === Car.id)){
      while(this.cars.find(({ id }) => id === Car.id)){
      Car.id = String(+Math.floor(Math.random() * 100).toString()+ +Math.floor(Math.random() * 100).toString()); 
      }        
    }   

    if(+Car.speed <=0||+Car.speed >400||Car.speed==null|| /[qwertyuiopasdfghjklzxcvbnm]/.test(Car.speed)||/[йцукенгшщзхъфывапролджэячсмитьбю]/.test(this.editedCar.speed)||Car.name==null||Car.path_picturs==null){
      alert("Некоректный ввод данны");
      return 0;
     } 
    else{
    this.cars.push(Car);
    console.log('new car saved' + Car);
    this.save();
    return Car;
    }
    
    
  }
  save() {
    localStorage.setItem('cars', JSON.stringify(this.cars));
  }
  // checkKorictDanni(Car:CarData){
  //   if(+Car.speed <=0||+Car.speed >400||Car.speed==null||Car.name==null||Car.path_picturs==null){
  //     alert("Некоректный ввод данны");
  //     return 0;
  //    } 
  //    else return 
  // }

 
  // update(car: CarData) {
  //   localStorage.setItem('cars', JSON.stringify(this.cars));
  // не понял что сюда пихать 
  // есть метод Cancel и Save в pop-up component, их?
  // }
  delete(id: string) {
    this.cars = this.cars.filter((obj) => obj.id != id);
    console.log('deleted car with id=' + id);
    this.save();
  }
}
