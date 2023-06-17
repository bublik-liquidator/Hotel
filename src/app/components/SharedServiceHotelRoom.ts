import { Injectable } from '@angular/core';
import { HotelRoom } from './hotel-room';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceHotelRoom {
  rooms: HotelRoom[] = [];

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get('http://localhost:3000/api/hotel_room');
  }
  getById(id: string)  {
    return this.http.get(`http://localhost:3000/api/hotel_room/${id}`);
  }
}
