import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { HotelData } from './hotel-data';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable()
export class SharedService {
  hotel = new HotelData();
  hotels: HotelData[] = [];

  editedHotel = new HotelData();
  constructor(private http: HttpClient, private router: Router) {
  }
  inithotel(hotel: HotelData) {
    this.hotel = hotel;
  }
  gethotel(): HotelData {
    return this.hotel;
  }
  edithotel(hotel: HotelData) {
    HotelData.copyFieldsValuesTo(hotel, this.hotel);
  }

  //{ getAll(): Observable<HotelData[]> {
  //   return async function getData(this: any) {
  //     this.http.get('http://localhost:3000/hotel').subscribe((data: Object) => {
  //       this.hotels = data as HotelData[];
  //       console.log(this.hotels);
  //     });
  //   }
  // } }

  getAll(): Observable<any> {
    return this.http.get('http://localhost:3003/user');
  }
  getById(id: string) {
    return this.http.get(`http://localhost:3003/user/${id}`);
  }

  create(hotel: HotelData) {
    const subscription =this.http.post('http://localhost:3000/user', hotel).subscribe((hotel: Object) => {
      subscription.unsubscribe();
    });

  }

  save(hotel: HotelData) {
    return this.http.put('http://localhost:3000/user/' + hotel.id, hotel).subscribe(data=>console.log(data));
  }
  delete(id: bigint) {
    const subscription =this.http.delete('http://localhost:3000/user/' + id).subscribe((data: Object) => {
      subscription.unsubscribe();
    });
  }

  session(sesiy: any) {
    localStorage.setItem('session', JSON.stringify(sesiy));
  }
}
