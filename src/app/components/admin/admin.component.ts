
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HotelData } from '../hotel-data';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { SharedService } from '../SharedService';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  hotels: HotelData[] = [];
  newHotel = new HotelData();
  isEdit: boolean = false;
  person: { id: string; age?: number };
  constructor(private matdialog: MatDialog, private sharedService: SharedService, private http: HttpClient) {
  }

  isResultLoaded = false;
  StudentArray: string[] = [];

  Edithotel(hotel: HotelData) {
    this.matdialog.open(PopUpComponent);
    this.sharedService.inithotel(hotel);
  }

  ngOnInit(): void {
    this.hotels = this.sharedService.getAll();
  }


  AddButtonhotel() {
    this.isEdit = !this.isEdit;
  }

  Addhotel() {
    this.sharedService.create(this.newHotel);
    this.hotels.push(this.newHotel);      
  }

  deletehotel(id: bigint) {
    this.sharedService.delete(id);
    this.hotels = this.sharedService.getAll();

  }

 
}
