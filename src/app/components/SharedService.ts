import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { HotelData } from './hotel-data';

@Injectable()
export class SharedService {
  hotel = new HotelData();
  hotels: HotelData[] = [];
  editedHotel = new HotelData();

  inithotel(hotel: HotelData) {
    this.hotel = hotel;
  }
  gethotel(): HotelData {
    return this.hotel;
  }
  edithotel(hotel: HotelData) {
    HotelData.copyFieldsValuesTo(hotel, this.hotel);
  }

  getAll() {
    this.hotels = JSON.parse(localStorage.getItem('hotels') || '[]');
    return this.hotels;
  }
  getById(id: string) {
    if (localStorage.getItem('hotels') !== null) {
      this.getAll();
      // this.getAll().find(this.hotel -> this.hotel.id == id);
      // this.newHotel = this.hotels.find(({ id }) => id === id);]
      console.log('ALLL ' + this.getAll().find(({ id }) => id === id));
      return this.getAll().find(({ id }) => id === id);
    }
    return 0;
  }
  create(hotel: HotelData) {
    //сделать проверку на существующий IDn
    hotel.id = Math.floor(Math.random() * 100).toString();
    if (this.hotels.find(({ id }) => id === hotel.id)) {
      while (this.hotels.find(({ id }) => id === hotel.id)) {
        hotel.id = String(+Math.floor(Math.random() * 100).toString() + +Math.floor(Math.random() * 100).toString());
      }
    }

    if (+hotel.speed <= 0 || +hotel.speed > 400 || hotel.speed == null || /[qwertyuiopasdfghjklzxcvbnm]/.test(hotel.speed) || /[йцукенгшщзхъфывапролджэячсмитьбю]/.test(this.editedHotel.speed) || hotel.name == null || hotel.path_picturs == null) {
      alert("Некоректный ввод данны");
      return 0;
    }
    else {
      this.hotels.push(hotel);
      console.log('new hotel saved' + hotel);
      this.save();
      return hotel;
    }


  }
  save() {
    localStorage.setItem('hotels', JSON.stringify(this.hotels));
  }
  // checkKorictDanni(hotel:HotelData){
  //   if(+hotel.speed <=0||+hotel.speed >400||hotel.speed==null||hotel.name==null||hotel.path_picturs==null){
  //     alert("Некоректный ввод данны");
  //     return 0;
  //    } 
  //    else return 
  // }


  // update(hotel: HotelData) {
  //   localStorage.setItem('hotels', JSON.stringify(this.hotels));
  // не понял что сюда пихать 
  // есть метод Cancel и Save в pop-up component, их?
  // }
  delete(id: string) {
    this.hotels = this.hotels.filter((obj) => obj.id != id);
    console.log('deleted hotel with id=' + id);
    this.save();
  }
  session(sesiy: any){
    localStorage.setItem('session', JSON.stringify(sesiy));
  }
}
