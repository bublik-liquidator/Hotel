import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
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
    return this.http.get(`http://localhost:3000/api/hotel/${id}`);
  }

  create(hotel: Hotel) {
    return this.http.post('http://localhost:3000/api/hotel', hotel)

  }

  save(hotel: Hotel) {
    return this.http.put('http://localhost:3000/api/hotel/' + hotel.id, hotel).subscribe(data=>console.log(data));
    
  }
  delete(id: bigint) {
    return this.http.delete(`http://localhost:3000/api/hotel/${id}`)
  }

  session(sesiy: any) {
    localStorage.setItem('session', JSON.stringify(sesiy));
  }
}
