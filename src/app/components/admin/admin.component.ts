
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
  constructor(private matdialog:MatDialog,private sharedService: SharedService,private http: HttpClient) {    
  }

  isResultLoaded = false;
  StudentArray : string[] = [];
 
  Edithotel(hotel:HotelData){
    this.matdialog.open(PopUpComponent);
    this.sharedService.inithotel(hotel);
  }
  
  ngOnInit(): void {
    // this.inithotels();
    this.hotels = this.sharedService.getAll();
 
  }

  // inithotels() {
  //   this.hotels = JSON.parse(localStorage.getItem('hotels') || '[]');
  // }


  AddButtonhotel() {
    this.isEdit = !this.isEdit;
  }

  Addhotel() {
    this.addnewHotel(this.newHotel);
  } 
  
   deletehotel(id: string) {
    this.sharedService.delete(id);
    this.hotels = this.sharedService.getAll();
    // console.log(id+" ID");
  //   this.hotels = this.hotels.filter((obj) => obj.id != id);
  //   console.log('deleted hotel with id=' + id);
  //   this.savehotelsToStorage();
  }

  savehotelsToStorage() {
    localStorage.setItem('hotels', JSON.stringify(this.hotels));
  }

  addnewHotel(hotel: HotelData) {
    this.sharedService.create(hotel);
    this.newHotel = new HotelData();
    // hotel.id = Math.floor(Math.random() * 100).toString();
    // this.hotels.push(hotel);
    // console.log('new hotel saved');
    // this.newHotel = new HotelData();
    // this.savehotelsToStorage();
  }
  getAllStudent()
  {
    this.http.get("http://localhost:3000/hotel")
    .subscribe((resultData: any)=>
    {
        console.log(resultData[0])
        this.hotels =resultData;
    });

    
  }
}
