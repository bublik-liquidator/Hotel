import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { HotelData } from './hotel-data';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
import { Hotel } from './hotel';

@Injectable()
export class SharedService {
  hotel = new Hotel();
  hotels: Hotel[] = [];

  editedHotel = new Hotel();
  constructor(private http: HttpClient, private router: Router) {
  }
  inithotel(hotel: Hotel) {
    this.hotel = hotel;
  }
  gethotel(): Hotel {
    return this.hotel;
  }
  edithotel(hotel: Hotel) {
    Hotel.copyFieldsValuesTo(hotel, this.hotel);
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
    return this.http.get('http://localhost:3000/api/hotel');
  }
  getById(id: string) {
    console.log(id+"getByIdgetByIdgetByIdgetByIdgetByIdgetByIdgetByIdgetByIdgetById")
    return this.http.get(`http://localhost:3000/api/hotel/${id}`);
  }

  create(hotel: Hotel) {
    this.http.post('http://localhost:3000/api/hotel', hotel).subscribe((hotel: Object) => {
    });

  }

  save(hotel: Hotel) {
    return this.http.put('http://localhost:3000/api/hotel/' + hotel.id, hotel).subscribe(data=>console.log(data));
  }
  delete(id: bigint) {
    this.http.delete(`http://localhost:3000/api/hotel/${id}`).subscribe((data: Object) => {
    });
  }

  session(sesiy: any) {
    localStorage.setItem('session', JSON.stringify(sesiy));
  }
}
