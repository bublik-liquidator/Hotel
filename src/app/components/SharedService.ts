import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { HotelData } from './hotel-data';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

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

  getAll(): Observable<any> {
    return this.http.get('http://localhost:3000/hotel');
  }

  getById(id: string) {
    return this.http.get(`http://localhost:3000/hotel/${id}`);
  }
 
  create(hotel: HotelData) {
    this.http.post('http://localhost:3000/hotel', hotel).subscribe((hotel: Object) => {
      console.log(hotel);
    });

  }

  save(id: bigint) {
    return this.http.put('http://localhost:3000/hotel/', id).subscribe((hotel: Object) => {
      console.log(hotel);
    });
  }

  delete(id: bigint) {
    this.http.delete('http://localhost:3000/hotel/' + id).subscribe((data: Object) => {
      console.log(data);
    });
  }

  session(sesiy: any) {
    localStorage.setItem('session', JSON.stringify(sesiy));
  }
}
